import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'
import { motion } from '../lib/store'
import { premulBlend } from './shared'

/** Contact: a wormhole tunnel pulling the visitor toward "let's talk". */
export function Wormhole() {
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uLight: { value: 0 } }), [])
  useFrame((s) => {
    uniforms.uTime.value = s.clock.elapsedTime
    uniforms.uLight.value = motion.themeMix
  })
  return (
    <group position={[0, 0, -8]}>
      <mesh rotation-x={Math.PI / 2} position={[0, 0, -28]}>
        <cylinderGeometry args={[5.5, 1.2, 60, 96, 40, true]} />
        <shaderMaterial
          {...premulBlend}
          side={THREE.BackSide}
          fog={false}
          args={[{ uniforms: uniforms }]}
          vertexShader={/* glsl */ `
            varying vec2 vUv; uniform float uTime;
            void main(){
              vUv = uv;
              vec3 p = position;
              float tw = sin(p.y*0.15 + uTime*0.8)*0.6;
              p.x += tw; p.z += cos(p.y*0.12 + uTime*0.6)*0.6;
              gl_Position = projectionMatrix*modelViewMatrix*vec4(p,1.0);
            }
          `}
          fragmentShader={/* glsl */ `
            uniform float uTime; uniform float uLight; varying vec2 vUv;
            void main(){
              float rings = pow(0.5+0.5*sin((vUv.y*60.0) + uTime*4.0), 6.0);
              float spiral = pow(0.5+0.5*sin(vUv.x*6.2832*6.0 + vUv.y*30.0 - uTime*2.0), 8.0);
              float depth = smoothstep(0.0, 0.9, vUv.y);
              vec3 c1 = vec3(0.3,0.95,1.0); vec3 c2 = vec3(1.0,0.25,0.75); vec3 c3 = vec3(0.55,0.35,1.0);
              vec3 col = mix(c1, c2, vUv.y);
              col = mix(col, c3, spiral);
              col = mix(col, col*0.55 + vec3(0.05,0.0,0.25), uLight);
              float a = (rings*0.55 + spiral*0.75) * depth;
              gl_FragColor = vec4(col*a, a*uLight*0.85);
            }
          `}
        />
      </mesh>
      {/* Event horizon */}
      <mesh position={[0, 0, -56]}>
        <circleGeometry args={[2.2, 64]} />
        <meshBasicMaterial color={[3, 2.6, 3.4]} toneMapped={false} fog={false} />
      </mesh>
    </group>
  )
}
