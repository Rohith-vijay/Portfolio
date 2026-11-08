import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import * as THREE from 'three'
import { easing } from 'maath'
import { motion, useUI, type DeskItem } from '../lib/store'
import { useLayout } from './useLayout'

export const deskLabels: Record<DeskItem, string> = {
  laptop: 'Open projects',
  books: 'Read academics',
  trophy: 'See achievements',
  plant: 'Experience',
  mug: 'Say hello',
}

const interactive = () => Math.abs(motion.station - 5) < 0.45

/** Wraps a desk object with hover lift, glow halo and click-to-open behaviour. */
function Pickable({ id, position, children }: { id: DeskItem; position: [number, number, number]; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  const halo = useRef<THREE.Mesh>(null)
  const [hover, setHover] = useState(false)
  const setCursorLabel = useUI((s) => s.setCursorLabel)
  const setDesk = useUI((s) => s.setDesk)

  useEffect(() => {
    if (!hover) return
    return () => setCursorLabel(null)
  }, [hover, setCursorLabel])

  useFrame((state, dt) => {
    if (!ref.current) return
    const lift = hover ? 0.22 : 0
    easing.damp(ref.current.position, 'y', position[1] + lift + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.02, 0.15, dt)
    easing.damp3(ref.current.scale, hover ? 1.08 : 1, 0.15, dt)
    if (halo.current) {
      const m = halo.current.material as THREE.MeshBasicMaterial
      m.opacity = THREE.MathUtils.damp(m.opacity, hover ? 0.9 : 0.12, 8, dt)
      halo.current.rotation.z += dt * 0.6
    }
    // Leaving the station while hovering should reset state.
    if (hover && !interactive()) setHover(false)
  })

  const over = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive()) return
    e.stopPropagation()
    setHover(true)
    setCursorLabel(deskLabels[id])
  }
  const out = () => {
    setHover(false)
    setCursorLabel(null)
  }
  const click = (e: ThreeEvent<MouseEvent>) => {
    if (!interactive()) return
    e.stopPropagation()
    setHover(false)
    setCursorLabel(null)
    setDesk(id)
  }

  return (
    <group>
      <mesh ref={halo} position={[position[0], -0.1, position[2]]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.62, 0.7, 48]} />
        <meshBasicMaterial color={[0.6, 3, 3.4]} transparent opacity={0.12} toneMapped={false} />
      </mesh>
      <group ref={ref} position={position} onPointerOver={over} onPointerOut={out} onClick={click}>
        {children}
      </group>
    </group>
  )
}

function useCodeTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 320
    const g = c.getContext('2d')!
    const grad = g.createLinearGradient(0, 0, 512, 320)
    grad.addColorStop(0, '#0b1030')
    grad.addColorStop(1, '#1a0b2e')
    g.fillStyle = grad
    g.fillRect(0, 0, 512, 320)
    g.fillStyle = '#ffffff22'
    g.fillRect(0, 0, 512, 26)
    ;['#ff5f57', '#febc2e', '#28c840'].forEach((col, i) => {
      g.fillStyle = col
      g.beginPath()
      g.arc(16 + i * 18, 13, 5, 0, Math.PI * 2)
      g.fill()
    })
    g.font = '600 14px JetBrains Mono, monospace'
    g.fillStyle = '#ffffffaa'
    g.fillText('ByteVault — OrderService.java', 80, 18)
    const palette = ['#4cf2ff', '#ff3dbb', '#ffc857', '#8b5cff', '#9aa5ff', '#7dffb2']
    let y = 48
    let seed = 3
    const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)
    for (let line = 0; line < 15; line++) {
      let x = 20 + (line % 4 === 0 ? 0 : 24 * Math.floor(rand() * 3))
      g.fillStyle = '#ffffff33'
      g.fillText(String(line + 1).padStart(2, '0'), 2, y + 8)
      const tokens = 2 + Math.floor(rand() * 5)
      for (let k = 0; k < tokens; k++) {
        const w = 18 + rand() * 70
        g.fillStyle = palette[Math.floor(rand() * palette.length)]
        g.globalAlpha = 0.85
        g.fillRect(x, y, w, 8)
        x += w + 8
      }
      g.globalAlpha = 1
      y += 17
    }
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 4
    return tex
  }, [])
}

function Laptop() {
  const tex = useCodeTexture()
  return (
    <group rotation-y={-0.25}>
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[2.2, 0.08, 1.5]} />
        <meshStandardMaterial color="#b9bfd3" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.085, 0.2]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1.9, 0.8]} />
        <meshStandardMaterial color="#2a2f45" roughness={0.6} />
      </mesh>
      <group position={[0, 0.08, -0.74]} rotation-x={-0.28}>
        <mesh position={[0, 0.72, 0]}>
          <boxGeometry args={[2.2, 1.44, 0.06]} />
          <meshStandardMaterial color="#b9bfd3" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.72, 0.032]}>
          <planeGeometry args={[2.04, 1.28]} />
          <meshBasicMaterial map={tex} toneMapped={false} color={[1.6, 1.6, 1.6]} />
        </mesh>
      </group>
    </group>
  )
}

function Books() {
  const books = [
    { c: '#5b3df5', w: 1.5, h: 0.26, r: 0.05 },
    { c: '#ff3dbb', w: 1.35, h: 0.22, r: -0.12 },
    { c: '#0aa5c0', w: 1.42, h: 0.3, r: 0.18 },
    { c: '#ffc857', w: 1.2, h: 0.2, r: -0.05 },
  ]
  let y = 0
  return (
    <group>
      {books.map((b, i) => {
        const yy = y + b.h / 2
        y += b.h
        return (
          <group key={i} position={[0, yy, 0]} rotation-y={b.r}>
            <mesh>
              <boxGeometry args={[b.w, b.h, 1.0]} />
              <meshStandardMaterial color={b.c} roughness={0.55} />
            </mesh>
            <mesh position={[0.02, 0, 0]}>
              <boxGeometry args={[b.w - 0.06, b.h - 0.05, 1.02]} />
              <meshStandardMaterial color="#f4efe2" roughness={0.9} />
            </mesh>
          </group>
        )
      })}
      {/* graduation cap on top */}
      <group position={[0, y + 0.12, 0]} rotation-y={0.5}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.34, 0.2, 24]} />
          <meshStandardMaterial color="#111426" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.95, 0.04, 0.95]} />
          <meshStandardMaterial color="#111426" roughness={0.6} />
        </mesh>
        <mesh position={[0.4, 0.02, 0.1]}>
          <cylinderGeometry args={[0.012, 0.012, 0.22, 8]} />
          <meshBasicMaterial color={[3, 2.3, 0.6]} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

function Trophy() {
  const profile = useMemo(() => {
    const pts: THREE.Vector2[] = []
    pts.push(new THREE.Vector2(0, 0))
    pts.push(new THREE.Vector2(0.38, 0))
    pts.push(new THREE.Vector2(0.38, 0.1))
    pts.push(new THREE.Vector2(0.14, 0.16))
    pts.push(new THREE.Vector2(0.08, 0.5))
    pts.push(new THREE.Vector2(0.12, 0.62))
    for (let i = 0; i <= 12; i++) {
      const a = (i / 12) * (Math.PI / 2)
      pts.push(new THREE.Vector2(0.12 + Math.sin(a) * 0.36, 0.62 + (1 - Math.cos(a)) * 0.55))
    }
    pts.push(new THREE.Vector2(0.46, 1.25))
    return pts
  }, [])
  return (
    <group>
      <mesh>
        <latheGeometry args={[profile, 48]} />
        <meshStandardMaterial color="#ffc857" emissive="#8a5200" emissiveIntensity={0.55} metalness={0.85} roughness={0.22} side={THREE.DoubleSide} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.5, 0.95, 0]} rotation-z={s * 0.2}>
          <torusGeometry args={[0.16, 0.03, 12, 32, Math.PI * 1.2]} />
          <meshStandardMaterial color="#ffc857" metalness={1} roughness={0.2} />
        </mesh>
      ))}
      <mesh position={[0, 1.55, 0]}>
        <octahedronGeometry args={[0.14, 0]} />
        <meshBasicMaterial color={[3.2, 2.4, 0.7]} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Mug() {
  const steam = useRef<THREE.Group>(null)
  useFrame((s) => {
    steam.current?.children.forEach((c, i) => {
      const t = (s.clock.elapsedTime * 0.5 + i * 0.33) % 1
      c.position.y = 0.6 + t * 0.9
      c.position.x = Math.sin(t * 6 + i) * 0.08
      c.scale.setScalar(0.06 + t * 0.12)
      ;((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.35
    })
  })
  return (
    <group>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.28, 0.25, 0.6, 32, 1, true]} />
        <meshStandardMaterial color="#ff3dbb" roughness={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.04, 32]} />
        <meshStandardMaterial color="#ff3dbb" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.52, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.26, 32]} />
        <meshStandardMaterial color="#3b2014" roughness={0.3} />
      </mesh>
      <mesh position={[0.3, 0.32, 0]}>
        <torusGeometry args={[0.13, 0.035, 12, 24]} />
        <meshStandardMaterial color="#ff3dbb" roughness={0.35} />
      </mesh>
      <group ref={steam}>
        {[0, 1, 2].map((i) => (
          <mesh key={i}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function Plant() {
  const leaves = useMemo(
    () =>
      Array.from({ length: 9 }).map((_, i) => ({
        rot: (i / 9) * Math.PI * 2,
        tilt: 0.35 + (i % 3) * 0.18,
        len: 0.55 + (i % 4) * 0.12,
      })),
    [],
  )
  return (
    <group>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.3, 0.22, 0.5, 24]} />
        <meshStandardMaterial color="#e9e4da" roughness={0.8} />
      </mesh>
      {leaves.map((l, i) => (
        <group key={i} position={[0, 0.48, 0]} rotation={[0, l.rot, 0]}>
          <mesh rotation-z={l.tilt} position={[Math.sin(l.tilt) * l.len * 0.5, (Math.cos(l.tilt) * l.len) / 2, 0]}>
            <coneGeometry args={[0.07, l.len, 6]} />
            <meshStandardMaterial color={i % 2 ? '#22c55e' : '#16a34a'} roughness={0.6} flatShading />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/** Interactive 3D workspace: every object on the desk opens a part of the story. */
export function Workspace() {
  const { scale, mobile } = useLayout()
  const desk = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (!desk.current) return
    easing.dampE(desk.current.rotation, [0, motion.mouse.x * 0.22, 0], 0.4, dt)
  })
  return (
    <group position={[0, -2.7, -1.5]} scale={scale * (mobile ? 0.85 : 1.05)}>
      <group ref={desk}>
        {/* Desk */}
        <mesh position={[0, -0.14, 0]} receiveShadow>
          <boxGeometry args={[8, 0.24, 3.4]} />
          <meshStandardMaterial color="#2b2240" roughness={0.45} metalness={0.2} />
        </mesh>
        <mesh position={[0, -0.02, 1.71]}>
          <boxGeometry args={[8, 0.02, 0.02]} />
          <meshBasicMaterial color={[0.6, 3, 3.4]} toneMapped={false} />
        </mesh>
        {[-3.7, 3.7].map((x) =>
          [-1.4, 1.4].map((z) => (
            <mesh key={`${x}${z}`} position={[x, -1.6, z]}>
              <cylinderGeometry args={[0.07, 0.07, 2.8, 12]} />
              <meshStandardMaterial color="#9aa0b8" metalness={0.9} roughness={0.25} />
            </mesh>
          )),
        )}
        {/* Desk mat */}
        <mesh position={[-0.2, -0.015, 0.2]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[3.6, 2.2]} />
          <meshStandardMaterial color="#141a33" roughness={0.9} />
        </mesh>

        <Pickable id="laptop" position={[-0.3, 0, 0.1]}>
          <Laptop />
        </Pickable>
        <Pickable id="books" position={[-2.9, 0, 0.1]}>
          <Books />
        </Pickable>
        <Pickable id="trophy" position={[2.4, 0, -0.4]}>
          <Trophy />
        </Pickable>
        <Pickable id="mug" position={[1.6, 0, 0.9]}>
          <Mug />
        </Pickable>
        <Pickable id="plant" position={[3.4, 0, 0.6]}>
          <Plant />
        </Pickable>

        {/* Lamp light */}
        <pointLight position={[0, 3.2, 1.5]} intensity={18} distance={9} color="#ffe2b8" />
        <pointLight position={[-3, 1.5, 2]} intensity={6} distance={6} color="#4cf2ff" />
      </group>
    </group>
  )
}
