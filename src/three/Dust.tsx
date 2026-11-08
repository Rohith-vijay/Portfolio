import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import { motion } from '../lib/store'
import { SPACING, premulBlend, rng } from './shared'

/** Space dust spanning the whole journey — gives a sense of speed while flying. */
export function Dust({ count = 3200 }: { count?: number }) {
  const { positions, scales } = useMemo(() => {
    const r = rng(7)
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const depth = SPACING * 8 + 40
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (r() - 0.5) * 60
      positions[i * 3 + 1] = (r() - 0.5) * 36
      positions[i * 3 + 2] = 20 - r() * depth
      scales[i] = 0.3 + r() * 1.2
    }
    return { positions, scales }
  }, [count])

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uLight: { value: 0 }, uPR: { value: Math.min(2, window.devicePixelRatio) } }),
    [],
  )
  useFrame((s) => {
    uniforms.uTime.value = s.clock.elapsedTime
    uniforms.uLight.value = motion.themeMix
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        {...premulBlend}
        args={[{ uniforms: uniforms }]}
        vertexShader={/* glsl */ `
          uniform float uTime; uniform float uPR; attribute float aScale; varying float vA;
          void main(){
            vec3 p = position;
            p.y += sin(uTime*0.2 + p.x*0.3)*0.4;
            p.x += cos(uTime*0.15 + p.z*0.2)*0.4;
            vec4 mv = modelViewMatrix * vec4(p,1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = aScale * 22.0 * uPR / -mv.z;
            vA = smoothstep(60.0, 8.0, -mv.z);
          }
        `}
        fragmentShader={/* glsl */ `
          uniform float uLight; varying float vA;
          void main(){
            float d = length(gl_PointCoord-0.5);
            float a = smoothstep(0.5,0.0,d) * vA;
            vec3 c = mix(vec3(0.8,0.9,1.0), vec3(0.25,0.22,0.45), uLight);
            a *= mix(0.9, 0.45, uLight);
            gl_FragColor = vec4(c*a, a*uLight);
          }
        `}
      />
    </points>
  )
}
