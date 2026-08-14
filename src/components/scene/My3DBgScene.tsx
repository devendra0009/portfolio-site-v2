// Suspense = React feature that lets async children (like useGLTF) "wait" while loading.
// Without it, useGLTF throws and the whole app crashes instead of showing a fallback.
import { Suspense } from "react";

// Canvas = R3F's WebGL root. It creates a Three.js renderer + scene + camera,
// and turns every JSX child into a live 3D object each frame.
import { Canvas } from "@react-three/fiber";

// OrbitControls = Drei camera helper: drag to orbit, scroll to zoom, right-drag to pan.
// ambientLight / directionalLight below are R3F wrappers around THREE lights (no extra import needed —
// R3F maps lowercase JSX tags like <ambientLight /> to new THREE.AmbientLight()).
// import { OrbitControls } from "@react-three/drei";

import BabyFox from "../3d/BabyFox";
import FloatingParticles from "../3d/FloatingParticles";

export default function BabyFoxScene() {
  return (
    // Outer div gives the Canvas a real CSS size. Canvas fills 100% of its parent —
    // if the parent has 0 height, you get a blank / invisible WebGL view.
    <div className="h-full w-full ">
      <Canvas
        // camera props set the default PerspectiveCamera: position is where the eye sits;
        // fov (field of view) in degrees — higher = more "wide angle".
        camera={{ position: [0, 0, 5], fov: 40 }}
        // dpr caps pixel ratio so high-DPI screens don't melt the GPU (1–2 is a good range).
        dpr={[1, 2]}
      >
        {/* ambientLight = soft fill from every direction; intensity is brightness (0–1+).
            Without any lights, MeshStandardMaterial models render pure black. */}
        <ambientLight intensity={0.6} />

        {/* directionalLight = sun-like parallel rays from `position`; adds shape and shadow cues. */}
        <directionalLight position={[5, 5, 5]} intensity={1.2} />

        {/* second fill from the opposite side so the back of the fox isn't a silhouette */}
        <directionalLight position={[-3, 2, -2]} intensity={0.4} />

        {/* Suspense pauses BabyFox until the .glb finishes downloading; fallback can be null or a spinner mesh */}
        <Suspense fallback={null}>
          <FloatingParticles count={150} spread={14} interactionRadius={6.5} />
          <BabyFox />
        </Suspense>

        {/* makeDefault registers these controls as the active camera controller for the Canvas */}
        {/* <OrbitControls
          makeDefault
          // enablePan=false keeps the fox centered so users don't drag it off-screen
          enablePan={false}
          // min/maxPolarAngle clamp vertical orbit so you can't flip under the floor
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        /> */}
      </Canvas>
    </div>
  );
}
