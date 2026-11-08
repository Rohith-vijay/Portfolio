import { useFrame } from '@react-three/fiber'
import { Edges } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { easing } from 'maath'
import { motion } from '../lib/store'
import { premulBlend, rng } from './shared'
import { useLayout } from './useLayout'

/**
 * Experience: a holographic production server for the trust platform —
 * stacked rack units, a scanning security ring, data streaming upward, all
 * standing on an infinite neon grid.
 */
export function CyberCore() {
  const { side, scale } = useLayout()
  const root = useRef<THREE.Group>(null)
  const units = useRef<THREE.Group>(null)
  const scan = useRef<THREE.Mesh>(null)
  const shield = useRef<THREE.Mesh>(null)

  const gridU = useMemo(() => ({ uTime: { value: 0 }, uLight: { value: 0 } }), [])
  const dataU = useMemo(
    () => ({ uTime: { value: 0 }, uLight: { value: 0 }, uPR: { value: Math.min(2, window.devicePixelRatio) } }),
    [],
  )

  const stream = useMemo(() => {
    const r = rng(11)
    const n = 900
    const p = new Float32Array(n * 3)
    const s = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      const a = r() * Math.PI * 2
      const rad = 1.4 + r() * 1.6
      p[i * 3] = Math.cos(a) * rad
      p[i * 3 + 1] = r() * 8
      p[i * 3 + 2] = Math.sin(a) * rad
      s[i] = 0.5 + r()
    }
    return { p, s }
  }, [])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    gridU.uTime.value = dataU.uTime.value = t
    gridU.uLight.value = dataU.uLight.value = motion.themeMix
    units.current?.children.forEach((u, i) => {
      u.position.y = i * 0.95 + Math.sin(t * 1.4 + i * 0.7) * 0.06
      u.rotation.y = Math.sin(t * 0.3 + i) * 0.08
    })
    if (scan.current) scan.current.position.y = 2.1 + Math.sin(t * 1.1) * 2.3
    if (shield.current) {
      shield.current.rotation.y = t * 0.25
      shield.current.rotation.x = t * 0.12
    }
    if (root.current) easing.dampE(root.current.rotation, [0, -0.5 + motion.mouse.x * 0.35, 0], 0.5, dt)
  })

  return (
    <group>
      {/* Neon grid floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -3.2, -4]}>
        <planeGeometry args={[90, 90, 1, 1]} />
        <shaderMaterial
          {...premulBlend}
          args={[{ uniforms: gridU }]}
          vertexShader={/* glsl */ `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `}
          fragmentShader={/* glsl */ `
            uniform float uTime; uniform float uLight; varying vec2 vUv;
            float line(vec2 uv, float n){
              vec2 g = abs(fract(uv*n - 0.5) - 0.5) / fwidth(uv*n);
              return 1.0 - min(min(g.x, g.y), 1.0);
            }
            void main(){
              vec2 uv = vUv; uv.y += uTime*0.012;
              float l = line(uv, 60.0) * 0.6 + line(uv, 12.0) * 0.9;
              float d = distance(vUv, vec2(0.5));
              float fade = smoothstep(0.5, 0.05, d);
              float pulse = smoothstep(0.02, 0.0, abs(fract(d*3.0 - uTime*0.25) - 0.5) - 0.48);
              vec3 c = mix(vec3(0.3,0.95,1.0), vec3(1.0,0.25,0.75), smoothstep(0.1,0.45,d));
              c = mix(c, vec3(0.2,0.15,0.6), uLight);
              float a = (l*0.55 + pulse*0.45) * fade * mix(0.42, 0.5, uLight);
              gl_FragColor = vec4(c*a, a*uLight);
            }
          `}
        />
      </mesh>

      <group ref={root} position={[-5.6 * side, -2.6, -2]} scale={scale}>
        {/* Rack units */}
        <group ref={units}>
          {Array.from({ length: 5 }).map((_, i) => (
            <group key={i}>
              <mesh>
                <boxGeometry args={[2.4, 0.7, 1.6]} />
                <meshStandardMaterial color="#0b0f24" metalness={0.8} roughness={0.25} transparent opacity={0.9} />
                <Edges color={i % 2 ? '#ff3dbb' : '#4cf2ff'} threshold={15} />
              </mesh>
              {/* LED strip */}
              <mesh position={[0, 0, 0.81]}>
                <planeGeometry args={[1.9, 0.08]} />
                <meshBasicMaterial color={i % 2 ? [3, 0.6, 2] : [0.6, 3, 3.4]} toneMapped={false} />
              </mesh>
              {Array.from({ length: 6 }).map((__, k) => (
                <mesh key={k} position={[-0.95 + k * 0.12, -0.18, 0.81]}>
                  <circleGeometry args={[0.03, 12]} />
                  <meshBasicMaterial color={k % 3 === 0 ? [3, 2.4, 0.4] : [0.4, 3, 1]} toneMapped={false} />
                </mesh>
              ))}
            </group>
          ))}
        </group>
        {/* Scanning ring */}
        <mesh ref={scan} rotation-x={Math.PI / 2}>
          <torusGeometry args={[1.9, 0.025, 8, 96]} />
          <meshBasicMaterial color={[0.5, 3, 3.5]} toneMapped={false} />
        </mesh>
        {/* Security shield (RBAC / JWT) */}
        <mesh ref={shield} position={[0, 2.1, 0]}>
          <icosahedronGeometry args={[3.1, 1]} />
          <meshBasicMaterial color="#8b5cff" wireframe transparent opacity={0.18} />
        </mesh>
        {/* Data stream */}
        <points position={[0, -0.5, 0]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[stream.p, 3]} />
            <bufferAttribute attach="attributes-aScale" args={[stream.s, 1]} />
          </bufferGeometry>
          <shaderMaterial
            {...premulBlend}
            args={[{ uniforms: dataU }]}
            vertexShader={/* glsl */ `
              uniform float uTime; uniform float uPR; attribute float aScale; varying float vT;
              void main(){
                vec3 p = position;
                p.y = mod(p.y + uTime*(0.6 + aScale*0.8), 8.0);
                vT = p.y/8.0;
                vec4 mv = modelViewMatrix*vec4(p,1.0);
                gl_Position = projectionMatrix*mv;
                gl_PointSize = aScale*26.0*uPR / -mv.z;
              }
            `}
            fragmentShader={/* glsl */ `
              uniform float uLight; varying float vT;
              void main(){
                vec2 c = gl_PointCoord-0.5;
                float a = smoothstep(0.5,0.0,length(c)) * sin(vT*3.1416);
                vec3 col = mix(vec3(0.4,1.0,1.0), vec3(1.0,0.3,0.8), vT);
                col = mix(col, vec3(0.25,0.2,0.7), uLight);
                gl_FragColor = vec4(col*a, a*uLight);
              }
            `}
          />
        </points>
        <pointLight position={[0, 2, 2]} color="#4cf2ff" intensity={12} distance={9} />
      </group>
    </group>
  )
}
