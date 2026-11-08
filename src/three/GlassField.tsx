import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { motion } from '../lib/store'
import { useLayout } from './useLayout'

/** Skills: premium floating glass forms refracting glowing cores (minimal / Apple-style). */
const shapes = [
  { pos: [-7.5, 2.4, -4], geo: 'knot', scale: 1.1, core: '#4cf2ff' },
  { pos: [7.8, 2.2, -5], geo: 'ico', scale: 1.5, core: '#ff3dbb' },
  { pos: [-6.5, -3, -2], geo: 'torus', scale: 1.2, core: '#ffc857' },
  { pos: [7, -3.2, -2.5], geo: 'oct', scale: 1.3, core: '#8b5cff' },
  { pos: [0, 4.6, -10], geo: 'capsule', scale: 1.4, core: '#4cf2ff' },
] as const

function Geo({ kind }: { kind: (typeof shapes)[number]['geo'] }) {
  switch (kind) {
    case 'knot':
      return <torusKnotGeometry args={[0.9, 0.3, 160, 24]} />
    case 'ico':
      return <icosahedronGeometry args={[1, 0]} />
    case 'torus':
      return <torusGeometry args={[0.9, 0.38, 48, 96]} />
    case 'oct':
      return <octahedronGeometry args={[1, 0]} />
    default:
      return <capsuleGeometry args={[0.55, 1.2, 12, 32]} />
  }
}

export function GlassField() {
  const { side, mobile } = useLayout()
  const group = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, motion.mouse.x * 0.15, 3, dt)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -motion.mouse.y * 0.1, 3, dt)
  })
  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <Float key={i} speed={1.4 + i * 0.2} rotationIntensity={1.4} floatIntensity={1.6}>
          <group
            position={[s.pos[0] * (mobile ? 0.45 : Math.max(0.75, side)), s.pos[1], s.pos[2]]}
            scale={s.scale * (mobile ? 0.6 : 1)}
          >
            <mesh>
              <Geo kind={s.geo} />
              <meshPhysicalMaterial
                transmission={1}
                thickness={1.4}
                roughness={0.06}
                ior={1.45}
                iridescence={1}
                iridescenceIOR={1.3}
                clearcoat={1}
                envMapIntensity={1.4}
                color="#ffffff"
                attenuationColor={s.core}
                attenuationDistance={2.5}
              />
            </mesh>
            <mesh scale={0.28}>
              <sphereGeometry args={[1, 24, 24]} />
              <meshBasicMaterial color={new THREE.Color(s.core).multiplyScalar(2.6)} toneMapped={false} />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  )
}
