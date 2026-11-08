import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { easing } from 'maath'
import { motion } from '../lib/store'
import { useLayout } from './useLayout'

const SERVICES = 14

/**
 * Projects: ByteVault's architecture as a living constellation — an API
 * gateway core, 13 services on a fibonacci sphere, a message broker, and
 * packets travelling along every edge (request → service → outbox → broker).
 */
export function Constellation() {
  const { side, scale } = useLayout()
  const root = useRef<THREE.Group>(null)
  const pulses = useRef<THREE.InstancedMesh>(null)
  const nodesRef = useRef<THREE.Group>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const { nodes, edges, linePositions } = useMemo(() => {
    const nodes: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0)] // gateway
    const n = SERVICES - 1
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const th = golden * i
      nodes.push(new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r).multiplyScalar(3.4))
    }
    const broker = new THREE.Vector3(0, -4.6, 0)
    nodes.push(broker)
    const brokerIdx = nodes.length - 1
    const edges: [number, number][] = []
    for (let i = 1; i <= n; i++) edges.push([0, i])
    for (let i = 1; i <= n; i += 2) edges.push([i, brokerIdx])
    for (let i = 1; i < n; i += 3) edges.push([i, i + 1])
    const linePositions = new Float32Array(edges.length * 6)
    edges.forEach(([a, b], k) => {
      nodes[a].toArray(linePositions, k * 6)
      nodes[b].toArray(linePositions, k * 6 + 3)
    })
    return { nodes, edges, linePositions }
  }, [])

  const pulseCount = edges.length * 2
  useLayoutEffect(() => {
    const mesh = pulses.current
    if (!mesh) return
    const a = new THREE.Color(0.6, 3, 3.4)
    const b = new THREE.Color(3.2, 0.6, 2.2)
    for (let i = 0; i < pulseCount; i++) mesh.setColorAt(i, i % 3 === 0 ? b : a)
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [pulseCount])

  const tmp = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    if (root.current) {
      root.current.rotation.y += dt * 0.12
      easing.damp(root.current.rotation, 'x', 0.2 + motion.mouse.y * 0.25, 0.5, dt)
    }
    if (pulses.current) {
      for (let i = 0; i < pulseCount; i++) {
        const [a, b] = edges[i % edges.length]
        const speed = 0.25 + ((i * 37) % 10) / 25
        let f = (t * speed + i * 0.137) % 1
        if (i >= edges.length) f = 1 - f // return traffic
        tmp.copy(nodes[a]).lerp(nodes[b], f)
        dummy.position.copy(tmp)
        dummy.scale.setScalar(0.06 + Math.sin(f * Math.PI) * 0.05)
        dummy.updateMatrix()
        pulses.current.setMatrixAt(i, dummy.matrix)
      }
      pulses.current.instanceMatrix.needsUpdate = true
    }
    nodesRef.current?.children.forEach((m, i) => {
      const s = 1 + Math.sin(t * 2 + i) * 0.08
      m.scale.setScalar(s)
    })
  })

  return (
    <group position={[5.6 * side, 0.6, -3]} scale={scale * 0.95}>
      <group ref={root}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#7f8cff" transparent opacity={0.35} />
        </lineSegments>
        <group ref={nodesRef}>
          {nodes.map((p, i) => {
            const isGateway = i === 0
            const isBroker = i === nodes.length - 1
            const color = isGateway ? '#4cf2ff' : isBroker ? '#ff3dbb' : i % 4 === 0 ? '#ffc857' : '#9aa5ff'
            return (
              <mesh key={i} position={p}>
                {isGateway ? (
                  <octahedronGeometry args={[0.55, 0]} />
                ) : isBroker ? (
                  <boxGeometry args={[0.7, 0.7, 0.7]} />
                ) : (
                  <icosahedronGeometry args={[0.22, 1]} />
                )}
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={isGateway || isBroker ? 2.2 : 1.2}
                  metalness={0.3}
                  roughness={0.3}
                  flatShading
                />
              </mesh>
            )
          })}
        </group>
        <instancedMesh ref={pulses} args={[undefined, undefined, pulseCount]} frustumCulled={false}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
        {/* Outer service mesh */}
        <mesh>
          <icosahedronGeometry args={[5.2, 2]} />
          <meshBasicMaterial color="#4cf2ff" wireframe transparent opacity={0.05} />
        </mesh>
      </group>
    </group>
  )
}
