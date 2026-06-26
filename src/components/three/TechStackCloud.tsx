import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReduced } from "../../hooks/usePrefersReduced";

interface WordProps {
  children: string;
  position: THREE.Vector3;
}

function Word({ children, position }: WordProps) {
  const fontProps = {
    font: "https://fonts.gstatic.com/s/spacegrotesk/v15/V8mDoQDjQ1sspdq1ODG5EO92Cw3S.woff", // space grotesk font woff
    fontSize: 0.28,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-type": "MeshBasicMaterial",
  };

  const ref = useRef<any>(null);

  // Billboarding effect: face the camera at all times
  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <Text
      ref={ref}
      position={position}
      {...fontProps}
      color="#38BDF8"
      onPointerOver={() => {
        if (ref.current) ref.current.material.color.set("#7C3AED");
      }}
      onPointerOut={() => {
        if (ref.current) ref.current.material.color.set("#38BDF8");
      }}
    >
      {children}
    </Text>
  );
}

function Cloud() {
  const words = useMemo(() => {
    const list = [
      "Java", "Spring Boot", "React", "TypeScript", "PostgreSQL",
      "Docker", "AWS", "Node.js", "Python", "SQL",
      "Git", "Tailwind v4", "Hibernate", "REST APIs", "C++",
      "Security", "Redis", "MongoDB", "Express", "JPA"
    ];
    
    const temp: [THREE.Vector3, string][] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    const radius = 2.2;

    for (let i = 0; i < list.length; i++) {
      const y = 1 - (i / (list.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      const pos = new THREE.Vector3(x * radius, y * radius, z * radius);
      temp.push([pos, list[i]]);
    }
    return temp;
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {words.map(([pos, word], idx) => (
        <Word key={idx} position={pos}>
          {word}
        </Word>
      ))}
    </group>
  );
}

export function TechStackCloud() {
  const prefersReduced = usePrefersReduced();

  if (prefersReduced) {
    return (
      <div className="flex flex-wrap gap-2.5 p-6 justify-center items-center h-full max-w-md mx-auto">
        {[
          "Java", "Spring Boot", "React", "TypeScript", "PostgreSQL",
          "Docker", "AWS", "Node.js", "Python", "SQL",
          "Git", "Tailwind", "Hibernate", "REST APIs", "C++",
          "Security", "Redis"
        ].map((tag) => (
          <span key={tag} className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-accent-cyan font-mono">
            {tag}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full h-[320px] md:h-[420px] relative select-none">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }}>
        <Suspense fallback={null}>
          <Cloud />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
