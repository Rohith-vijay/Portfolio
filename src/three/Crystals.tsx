import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { easing } from 'maath'
import { achievements } from '../data/content'
import { motion } from '../lib/store'
import { rng } from './shared'
import { useLayout } from './useLayout'

/**
 * Achievements: a data-driven crystal. The orbiting shards are literally the
 * LeetCode record — one shard per solved problem, coloured by difficulty.
 */
export function Crystals() {
  const { side, scale } = useLayout()
  const root = useRef<THREE.Group>(null)
  const core = useRef<THREE.Group>(null)
  const shards = useRef<THREE.InstancedMesh>(null)
  const { solved, medium, hard } = achievements.leetcode
  const easy = solved - medium - hard
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const data = useMemo(() => {
    const r = rng(155)
    return Array.from({ length: solved }).map((_, i) => ({
      kind: i < hard ? 'hard' : i < hard + medium ? 'medium' : 'easy',
      radius: 3 + r() * 1.8 + (i < hard ? -0.4 : 0),
      angle: r() * Math.PI * 2,
      y: (r() - 0.5) * 1.6,
      speed: 0.12 + r() * 0.2,
      spin: r() * 3,
      size: i < hard ? 0.14 : 0.07 + r() * 0.05,
    }))
  }, [solved, medium, hard])

  useLayoutEffect(() => {
    const m = shards.current
    if (!m) return
    const cHard = new THREE.Color(3.2, 0.5, 2.0)
    const cMed = new THREE.Color(3.0, 2.0, 0.5)
    const cEasy = new THREE.Color(0.5, 2.6, 3.0)
    data.forEach((d, i) => m.setColorAt(i, d.kind === 'hard' ? cHard : d.kind === 'medium' ? cMed : cEasy))
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  }, [data])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    if (shards.current) {
      data.forEach((d, i) => {
        const a = d.angle + t * d.speed
        dummy.position.set(Math.cos(a) * d.radius, d.y + Math.sin(t + i) * 0.1, Math.sin(a) * d.radius)
        dummy.rotation.set(t * d.spin, t * d.spin * 0.7, 0)
        dummy.scale.setScalar(d.size)
        dummy.updateMatrix()
        shards.current!.setMatrixAt(i, dummy.matrix)
      })
      shards.current.instanceMatrix.needsUpdate = true
    }
    if (core.current) {
      core.current.rotation.y = t * 0.4
      core.current.rotation.x = Math.sin(t * 0.5) * 0.2
    }
    if (root.current) easing.dampE(root.current.rotation, [0.35 + motion.mouse.y * 0.2, motion.mouse.x * 0.3, 0.1], 0.5, dt)
  })

  return (
    <group position={[5.4 * side, 0.3, -2.5]} scale={scale}>
      <group ref={root}>
        <group ref={core}>
          <mesh>
            <octahedronGeometry args={[1.5, 0]} />
            <meshPhysicalMaterial
              color="#c9b6ff"
              transmission={0.9}
              thickness={2}
              roughness={0.05}
              iridescence={1}
              clearcoat={1}
              envMapIntensity={2}
              flatShading
            />
          </mesh>
          <mesh scale={0.55}>
            <octahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color={[3, 1.2, 2.6]} toneMapped={false} />
          </mesh>
          <mesh scale={1.9}>
            <octahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color="#ffc857" wireframe transparent opacity={0.35} />
          </mesh>
        </group>
        <instancedMesh ref={shards} args={[undefined, undefined, solved]} frustumCulled={false}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[3.9, 0.008, 6, 200]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
        </mesh>
      </group>
      <pointLight color="#ff3dbb" intensity={14} distance={10} />
      {/* expose counts for debugging in devtools */}
      <group userData={{ easy, medium, hard }} />
    </group>
  )
}
