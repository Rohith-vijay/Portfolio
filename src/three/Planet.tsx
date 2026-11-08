import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { easing } from 'maath'
import { motion } from '../lib/store'
import { noiseGLSL, premulBlend } from './shared'
import { useLayout } from './useLayout'

/**
 * Academics: a procedural gas-giant ("planet KLU") with a fresnel atmosphere,
 * banded rings and three moons — one per academic milestone (CGPA, XII, X).
 */
export function Planet() {
  const { side, scale } = useLayout()
  const root = useRef<THREE.Group>(null)
  const planet = useRef<THREE.Mesh>(null)
  const moons = useRef<THREE.Group>(null)

  const planetU = useMemo(() => ({ uTime: { value: 0 }, uLight: { value: 0 } }), [])
  const atmoU = useMemo(() => ({ uLight: { value: 0 } }), [])
  const ringU = useMemo(() => ({ uTime: { value: 0 }, uLight: { value: 0 } }), [])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    planetU.uTime.value = t
    ringU.uTime.value = t
    planetU.uLight.value = atmoU.uLight.value = ringU.uLight.value = motion.themeMix
    if (planet.current) planet.current.rotation.y += dt * 0.08
    if (moons.current) moons.current.rotation.y = t * 0.35
    if (root.current) {
      easing.dampE(root.current.rotation, [0.25 + motion.mouse.y * 0.12, motion.mouse.x * 0.25, -0.35], 0.5, dt)
    }
  })

  const moonData = [
    { r: 5.1, speed: 1, size: 0.34, color: '#4cf2ff', phase: 0, tilt: 0.2 },
    { r: 5.9, speed: 0.7, size: 0.26, color: '#ff3dbb', phase: 2.1, tilt: -0.35 },
    { r: 6.6, speed: 0.5, size: 0.22, color: '#ffc857', phase: 4.2, tilt: 0.5 },
  ]

  return (
    <group ref={root} position={[5.4 * side, 0.4, -2]} scale={scale}>
      <mesh ref={planet}>
        <sphereGeometry args={[2.3, 96, 96]} />
        <shaderMaterial
          args={[{ uniforms: planetU }]}
          vertexShader={/* glsl */ `
            varying vec3 vN; varying vec3 vP;
            void main(){ vN = normalize(normalMatrix*normal); vP = position;
              gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }
          `}
          fragmentShader={/* glsl */ `
            uniform float uTime; uniform float uLight; varying vec3 vN; varying vec3 vP;
            ${noiseGLSL}
            void main(){
              float n = fbm(vP*0.9 + vec3(0.0, 0.0, uTime*0.03));
              float bands = sin(vP.y*4.2 + n*3.5);
              vec3 a = mix(vec3(0.16,0.10,0.55), vec3(0.30,0.32,0.95), uLight*0.4);
              vec3 b = vec3(0.10,0.80,0.95);
              vec3 c = vec3(1.00,0.30,0.70);
              vec3 col = mix(a, b, smoothstep(-0.8, 0.9, bands));
              col = mix(col, c, smoothstep(0.25, 0.75, n));
              float storm = smoothstep(0.55, 0.62, fbm(vP*2.4 + 3.0));
              col = mix(col, vec3(1.0,0.85,0.55), storm*0.8);
              float l = max(dot(vN, normalize(vec3(-0.6,0.5,0.7))), 0.0);
              float fres = pow(1.0 - max(dot(vN, vec3(0.0,0.0,1.0)),0.0), 2.5);
              col = col*(0.18 + l*1.1) + vec3(0.3,0.9,1.0)*fres*0.9;
              gl_FragColor = vec4(col, 1.0);
            }
          `}
        />
      </mesh>
      {/* Atmosphere */}
      <mesh scale={1.18}>
        <sphereGeometry args={[2.3, 64, 64]} />
        <shaderMaterial
          {...premulBlend}
          side={THREE.BackSide}
          args={[{ uniforms: atmoU }]}
          vertexShader={/* glsl */ `
            varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal);
            gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }
          `}
          fragmentShader={/* glsl */ `
            uniform float uLight; varying vec3 vN;
            void main(){
              float i = pow(max(0.72 - dot(vN, vec3(0.0,0.0,1.0)), 0.0), 2.4);
              vec3 col = mix(vec3(0.3,0.85,1.0), vec3(0.35,0.3,0.95), uLight);
              float a = clamp(i*2.4, 0.0, 1.0);
              gl_FragColor = vec4(col*a, a*uLight*0.8);
            }
          `}
        />
      </mesh>
      {/* Rings */}
      <mesh rotation={[Math.PI / 2 - 0.25, 0, 0]}>
        <ringGeometry args={[3.0, 4.6, 160, 1]} />
        <shaderMaterial
          {...premulBlend}
          side={THREE.DoubleSide}
          args={[{ uniforms: ringU }]}
          vertexShader={/* glsl */ `
            varying float vR; varying float vA;
            void main(){ vR = length(position.xy); vA = atan(position.y, position.x);
              gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }
          `}
          fragmentShader={/* glsl */ `
            uniform float uTime; uniform float uLight; varying float vR; varying float vA;
            void main(){
              float t = (vR-3.0)/1.6;
              float stripes = 0.5 + 0.5*sin(vR*38.0) * sin(vR*9.0 + 1.3);
              float edge = smoothstep(0.0,0.08,t) * smoothstep(1.0,0.85,t);
              float gap = 1.0 - smoothstep(0.02,0.0,abs(t-0.62)) ;
              float sweep = 0.6 + 0.4*sin(vA*2.0 - uTime*0.6);
              vec3 col = mix(vec3(0.3,0.9,1.0), vec3(1.0,0.4,0.8), t);
              col = mix(col, col*0.6 + vec3(0.1,0.05,0.3), uLight);
              float a = stripes*edge*gap*sweep*0.75;
              gl_FragColor = vec4(col*a, a*uLight);
            }
          `}
        />
      </mesh>
      {/* Moons */}
      <group ref={moons}>
        {moonData.map((m, i) => (
          <group key={i} rotation={[m.tilt, m.phase, 0]}>
            <mesh position={[m.r, 0, 0]}>
              <sphereGeometry args={[m.size, 32, 32]} />
              <meshStandardMaterial color={m.color} emissive={m.color} emissiveIntensity={1.6} roughness={0.4} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[m.r, 0.006, 6, 160]} />
              <meshBasicMaterial color={m.color} transparent opacity={0.35} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}
