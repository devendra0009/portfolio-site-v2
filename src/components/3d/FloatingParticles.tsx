import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type FloatingParticlesProps = {
  count?: number;
  spread?: number;
  /** World-space radius of the cursor's repulsion field. */
  interactionRadius?: number;
  /** Peak shove applied when a particle sits on the cursor. */
  repelStrength?: number;
};

/**
 * GPU-instanced dust that idle-floats, then scatters away from the cursor.
 *
 * Why instancing + typed arrays:
 *   Updating 400+ separate meshes would mean 400+ draw calls / scene-graph nodes.
 *   One InstancedMesh = one draw call. Particle state lives in Float32Arrays
 *   (structure-of-arrays) so the animation loop reads contiguous memory instead
 *   of chasing 400 Particle objects and 1200 Vector3s. That keeps GC quiet and
 *   the frame budget free for the fox model.
 */
export default function FloatingParticles({
  count = 450,
  spread = 14,
  interactionRadius = 6.5,
  repelStrength = 0.28,
}: FloatingParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  /*
   * Cursor in Normalized Device Coordinates (NDC).
   * x: -1 left → +1 right,  y: -1 bottom → +1 top.
   * (999, 999) is a sentinel meaning "no pointer" so we skip repulsion.
   */
  const mouseNdc = useRef(new THREE.Vector2(999, 999));
  const mouseActive = useRef(false);

  /*
   * Scratch objects allocated once and reused every frame.
   * Creating Vector3 / Object3D inside useFrame() would allocate ~400 objects
   * at 60fps → GC spikes and stutter. Reusing them is the main CPU win.
   */
  const scratch = useMemo(
    () => ({
      ndc: new THREE.Vector3(),
      dir: new THREE.Vector3(),
      mouseWorld: new THREE.Vector3(),
    }),
    [],
  );

  /*
   * Structure-of-arrays particle state.
   *
   * positions  — current xyz (written into the instance matrix each frame)
   * velocities — leftover shove from previous frames (lets particles coast)
   * bases      — home xyz they spring back to after the cursor leaves
   * sizes      — per-particle scale so the field doesn't look uniform
   * phases     — unique sin/cos offset so idle motion isn't synchronized
   * speeds     — unique idle-float rate
   *
   * Generated once. Recreated only if count/spread change.
   */
  const buffers = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const bases = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread;

      positions[i3] = bases[i3] = x;
      positions[i3 + 1] = bases[i3 + 1] = y;
      positions[i3 + 2] = bases[i3 + 2] = z;

      sizes[i] = 0.018 + Math.random() * 0.05;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.25 + Math.random() * 0.75;
    }

    return { positions, velocities, bases, sizes, phases, speeds };
  }, [count, spread]);

  /*
   * Pointer tracking on `window`, not the canvas.
   *
   * The Canvas wrapper is pointer-events-none so page UI stays clickable.
   * We therefore listen globally. `pointermove` covers mouse + touch + pen
   * with one handler. `passive: true` tells the browser we won't preventDefault,
   * so scrolling stays smooth.
   */
  useEffect(() => {
    const toNdc = (clientX: number, clientY: number) => {
      mouseNdc.current.x = (clientX / window.innerWidth) * 2 - 1;
      mouseNdc.current.y = -(clientY / window.innerHeight) * 2 + 1;
      mouseActive.current = true;
    };

    const onPointerMove = (event: PointerEvent) => {
      toNdc(event.clientX, event.clientY);
    };

    /*
     * When the pointer leaves the document, disable repulsion.
     * Particles then lerp back to their idle float instead of fleeing
     * toward a stale off-screen coordinate.
     */
    const onPointerLeave = () => {
      mouseActive.current = false;
      mouseNdc.current.set(999, 999);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  /*
   * Skip GPU raycasts on 450 instances — we never click particles.
   * Helps: R3F's default raycaster would test every instance on pointermove.
   */
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.raycast = () => {};
  }, []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { ndc, dir, mouseWorld } = scratch;
    const { positions, velocities, bases, sizes, phases, speeds } = buffers;
    const time = state.clock.elapsedTime;
    const camera = state.camera;

    /*
     * Soft spring back to the idle orbit. Small enough that repulsion wins
     * while the cursor is near, large enough that the field settles quickly
     * after the cursor leaves. 0.04 ≈ 4% of the remaining gap per frame.
     */
    const returnLerp = 0.04;

    /*
     * Velocity damping. Without it, a shove would send particles flying
     * forever. 0.86 keeps a short "coast" so the scatter feels physical
     * instead of snapping.
     */
    const friction = 0.86;

    const radius = interactionRadius;
    const radiusSq = radius * radius;

    /*
     * Project the 2D cursor onto the z = 0 world plane (where the particle
     * cloud lives).
     *
     * Why a plane unproject: NDC is 2D; particles are 3D. Casting a ray
     * from the camera through the cursor and intersecting z = 0 gives a
     * world point we can measure distance against. Done once per frame,
     * not once per particle.
     */
    if (mouseActive.current) {
      ndc.set(mouseNdc.current.x, mouseNdc.current.y, 0.5);
      ndc.unproject(camera);
      dir.copy(ndc).sub(camera.position);

      // If the ray is parallel to the plane, skip rather than divide by 0.
      if (Math.abs(dir.z) > 1e-6) {
        const t = -camera.position.z / dir.z;
        mouseWorld.copy(camera.position).addScaledVector(dir, t);
      }
    }

    /*
     * Write instance matrices directly into the backing Float32Array.
     * Why not Object3D.updateMatrix() per particle: that does extra
     * quaternion/scale work we don't need (uniform scale + no rotation).
     * A column-major scale+translate matrix is 7 writes.
     */
    const matrixArray = mesh.instanceMatrix.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const phase = phases[i];
      const speed = speeds[i];

      /*
       * Idle float: unique phase + speed so the cloud breathes instead of
       * pulsing as one. Cheap trig, no extra vectors.
       */
      const targetX = bases[i3] + Math.sin(time * speed + phase) * 0.18;
      const targetY = bases[i3 + 1] + Math.cos(time * speed * 0.8 + phase) * 0.18;
      const targetZ = bases[i3 + 2] + Math.sin(time * speed * 0.6 + phase) * 0.12;

      let x = positions[i3];
      let y = positions[i3 + 1];
      let z = positions[i3 + 2];
      let vx = velocities[i3];
      let vy = velocities[i3 + 1];
      let vz = velocities[i3 + 2];

      // Spring toward the idle target (always on — repulsion adds on top).
      x += (targetX - x) * returnLerp;
      y += (targetY - y) * returnLerp;
      z += (targetZ - z) * returnLerp;

      /*
       * Cursor repulsion — applied to every particle inside the field.
       *
       * Force ∝ 1 / (dist² + softening):
       *   - closest particles get a hard shove (the "scatter" look)
       *   - farther ones still drift away, so the whole field reacts
       *   - softening stops the force exploding when dist ≈ 0
       *
       * We use dist² (no sqrt) for the radius test and the falloff.
       * Adding velocity (not setting position) lets particles coast,
       * which reads as a physical push instead of a teleport.
       */
      if (mouseActive.current) {
        const dx = x - mouseWorld.x;
        const dy = y - mouseWorld.y;
        const dz = z - mouseWorld.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < radiusSq) {
          const inv = 1 / (distSq + 0.28);
          const force = repelStrength * 6;
          vx += dx * inv * force;
          vy += dy * inv * force;
          vz += dz * inv * force;
        }
      }

      vx *= friction;
      vy *= friction;
      vz *= friction;

      x += vx;
      y += vy;
      z += vz;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      velocities[i3] = vx;
      velocities[i3 + 1] = vy;
      velocities[i3 + 2] = vz;

      /*
       * Column-major TRS with uniform scale, no rotation:
       *   [ s 0 0 0 ]
       *   [ 0 s 0 0 ]
       *   [ 0 0 s 0 ]
       *   [ x y z 1 ]  (stored column-major, so translation is 12,13,14)
       */
      const s = sizes[i];
      const mi = i * 16;
      matrixArray[mi] = s;
      matrixArray[mi + 5] = s;
      matrixArray[mi + 10] = s;
      matrixArray[mi + 12] = x;
      matrixArray[mi + 13] = y;
      matrixArray[mi + 14] = z;
      matrixArray[mi + 15] = 1;
    }

    // Tell Three the GPU buffer changed. Without this, instances freeze.
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      // Bounding sphere of an empty InstancedMesh is wrong until first
      // compute; disable frustum culling so the cloud never pops out.
      frustumCulled={false}
    >
      {/*
        Low-poly sphere (6×6) is plenty at this scale.
        Why not 8×8 or higher: each instance still stores that geometry
        in the GPU vertex buffer; 6×6 cuts triangles ~40% with no
        visible difference at 0.02–0.07 world units.
      */}
      <sphereGeometry args={[1, 6, 6]} />

      {/*
        meshBasicMaterial = unlit. Particles don't need lighting math,
        which saves a fragment-shader cost on every instance.
        depthWrite={false} stops transparent dots punching holes in each
        other and in the fox.
      */}
      <meshBasicMaterial
        color="#000080"
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
