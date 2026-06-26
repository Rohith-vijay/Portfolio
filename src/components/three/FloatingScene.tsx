import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReduced } from "../../hooks/usePrefersReduced";

// Custom Sun Core Shader Material
const SunCoreMaterial = {
  uniforms: {
    uTime: { value: 0 },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      
      // Subtly deform the sphere to simulate turbulent solar flares
      vec3 pos = position;
      float wave = sin(pos.x * 4.0 + uTime * 1.5) * cos(pos.y * 4.0 + uTime * 1.5) * 0.05;
      pos += normal * wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    // 3D Simplex-like noise helper functions
    float hash(vec3 p) {
      p = fract(p * 0.3183099 + .1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    float noise(in vec3 x) {
      vec3 i = floor(x);
      vec3 f = fract(x);
      f = f*f*(3.0-2.0*f);
      return mix(mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)),f.x),
                     mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)),f.x),
                 mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)),f.x),f.y),f.z);
    }

    void main() {
      // 1. Fresnel volumetric glow mapping
      float fresnel = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 3.0);
      
      // 2. Multi-layered moving noise to represent turbulent solar plasma flow
      vec3 noisePos1 = vPosition * 2.5 + vec3(0.0, uTime * 0.3, uTime * 0.1);
      vec3 noisePos2 = vPosition * 5.0 - vec3(uTime * 0.1, uTime * 0.2, 0.0);
      float n1 = noise(noisePos1);
      float n2 = noise(noisePos2);
      float plasma = (n1 + n2 * 0.5) / 1.5;
      
      // 3. Define solar color profiles
      vec3 colorCrimson = vec3(0.93, 0.26, 0.26); // Crimson base (#ef4444)
      vec3 colorOrange = vec3(0.97, 0.45, 0.08);  // Ember orange (#f97316)
      vec3 colorGold = vec3(0.91, 0.70, 0.03);    // Solar gold (#eab308)
      
      vec3 surface = mix(colorCrimson, colorOrange, plasma);
      surface = mix(surface, colorGold, pow(plasma, 2.0));
      
      // 4. Combine surface and volumetric corona glow
      vec3 finalColor = surface + colorOrange * fresnel * 2.0;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

// Custom Volumetric Corona Glow Shader Material
const SunCoronaMaterial = {
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 5.0);
      vec3 glowColor = vec3(0.97, 0.45, 0.08); // Fiery orange glow
      gl_FragColor = vec4(glowColor * intensity * 3.0, intensity);
    }
  `
};

function RotatingSun() {
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const coronaMeshRef = useRef<THREE.Mesh>(null);
  
  // Custom memoized Shader Materials
  const coreMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(SunCoreMaterial.uniforms),
      vertexShader: SunCoreMaterial.vertexShader,
      fragmentShader: SunCoreMaterial.fragmentShader,
    });
  }, []);

  const coronaMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: SunCoronaMaterial.vertexShader,
      fragmentShader: SunCoronaMaterial.fragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
  }, []);

  // Update uniforms and rotation every frame
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y = time * 0.05;
      const mat = coreMeshRef.current.material as THREE.ShaderMaterial;
      if (mat.uniforms && mat.uniforms.uTime) {
        mat.uniforms.uTime.value = time;
      }
    }
    if (coronaMeshRef.current) {
      coronaMeshRef.current.rotation.y = -time * 0.02;
    }
  });

  return (
    <group>
      {/* 1. Volumetric Outer Corona Glow (Backside rendering) */}
      <mesh ref={coronaMeshRef}>
        <sphereGeometry args={[1.72, 32, 32]} />
        <primitive object={coronaMaterial} attach="material" />
      </mesh>

      {/* 2. Plasma Core Mesh with Simplex Noise Shader */}
      <mesh ref={coreMeshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <primitive object={coreMaterial} attach="material" />
      </mesh>
    </group>
  );
}

function SolarFlares() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 180;
  
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 1.5 + Math.random() * 0.3;
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      spd[i] = 0.15 + Math.random() * 0.45;
    }
    return [pos, spd];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    
    for (let i = 0; i < count; i++) {
      let x = posAttr.getX(i);
      let y = posAttr.getY(i);
      let z = posAttr.getZ(i);
      
      const length = Math.sqrt(x*x + y*y + z*z);
      const nx = x / length;
      const ny = y / length;
      const nz = z / length;
      
      const speed = speeds[i];
      let newLength = length + speed * 0.008;
      
      // Reset particles when they escape the outer limits of the Corona
      if (newLength > 2.6) {
        newLength = 1.5 + Math.random() * 0.1;
      }
      
      posAttr.setXYZ(i, nx * newLength, ny * newLength, nz * newLength);
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#F97316"
        size={0.065}
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function FloatingScene() {
  const prefersReduced = usePrefersReduced();

  if (prefersReduced) {
    return (
      <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-accent-crimson via-accent-orange to-accent-gold filter blur-[32px] opacity-40 animate-pulse-slow mx-auto" />
    );
  }

  return (
    <div className="w-full h-[320px] md:h-[450px] relative select-none">
      {/* Background radial halo glow */}
      <div className="absolute inset-0 bg-accent-orange/10 rounded-full filter blur-[120px] w-[70%] h-[70%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 3, 2]} intensity={1} color="#FFE082" />
        <Suspense fallback={null}>
          <Float speed={2.0} rotationIntensity={0.6} floatIntensity={1.2}>
            <RotatingSun />
            <SolarFlares />
          </Float>
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
