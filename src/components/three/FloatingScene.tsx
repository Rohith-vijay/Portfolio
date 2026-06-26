import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReduced } from "../../hooks/usePrefersReduced";

function RotatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Slow automated rotation backup
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 3]} />
        <MeshDistortMaterial
          color="#F97316"
          distort={0.35}
          speed={2.2}
          roughness={0.1}
          metalness={0.7}
          clearcoat={1}
        />
      </mesh>
    </Float>
  );
}

export function FloatingScene() {
  const prefersReduced = usePrefersReduced();

  // If user disables animations for performance/motion, render a high-quality CSS gradient orb alternative
  if (prefersReduced) {
    return (
      <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-accent-crimson via-accent-orange to-accent-gold filter blur-[32px] opacity-40 animate-pulse-slow mx-auto" />
    );
  }

  return (
    <div className="w-full h-[320px] md:h-[450px] relative select-none">
      {/* Subtle ambient light back-sheen */}
      <div className="absolute inset-0 bg-accent-crimson/10 rounded-full filter blur-[100px] w-[60%] h-[60%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 3, 2]} intensity={1.5} color="#EAB308" />
        <pointLight position={[-3, -3, -3]} intensity={1} color="#EF4444" />
        <Suspense fallback={null}>
          <RotatingOrb />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
