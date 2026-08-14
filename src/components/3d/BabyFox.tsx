// useGLTF = Drei helper that loads a .glb/.gltf file into a Three.js scene graph.
// Under the hood it uses THREE.GLTFLoader + Suspense (so the parent must wrap us in <Suspense>).
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BabyFox() {
  // Vite's `base` in vite.config.ts is "/portfolio-site-v2/", so a bare "/models/..."
  // would request http://localhost:5173/models/... (404).
  // import.meta.env.BASE_URL always matches that config → correct in both dev and GitHub Pages.
  const modelUrl = `${import.meta.env.BASE_URL}models/baby_fox.glb`;

  // scene = the root THREE.Group that contains all meshes, materials, and bones from the .glb.
  // useGLTF caches by URL so re-renders / remounts don't re-download the file.
  const { scene } = useGLTF(modelUrl);

  const targetRotation = useRef(0);
  const modelRef = useRef<THREE.Group>(null);

  const handleScroll = (e: WheelEvent) => {
    // if (e.deltaY > 0) {
    //   // clockwise
    //   targetRotation.current -= 0.15;
    // } else if (e.deltaY < 0) {
    //   // anticlockwise
    //   targetRotation.current += 0.15;
    // }
    targetRotation.current -= e.deltaY * 0.002;
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      if (child.material instanceof THREE.MeshStandardMaterial) {
        child.material = child.material.clone();

        child.material.color.set("#EAB308");
      }
    });
  }, [scene]);

  useFrame(() => {
    if (!modelRef.current) return;

    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetRotation.current,
      0.1,
    );
  });

  // <primitive> = R3F escape hatch: put an existing Three.js object into the React tree.
  // We use it because useGLTF already built the object graph; we don't rebuild meshes in JSX.
  // scale shrinks/grows the whole model; position is [x, y, z] in Three.js world units.
  return (
    <primitive ref={modelRef} object={scene} scale={2} position={[0, -1, 0]} />
  );
}

// Preload starts the network fetch as soon as this module is imported (before the Canvas mounts).
// Speeds up first paint of the model; safe to call at module scope.
useGLTF.preload(`${import.meta.env.BASE_URL}models/baby_fox.glb`);
