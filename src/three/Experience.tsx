import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei'
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction, type BloomEffect, type ChromaticAberrationEffect } from 'postprocessing'
import { Suspense, useMemo, useRef, useState, type ReactNode } from 'react'
import * as THREE from 'three'
import { easing } from 'maath'
import { motion, useUI } from '../lib/store'
import { CAM_DIST, SPACING, themed } from './shared'
import { SkyDome } from './SkyDome'
import { Dust } from './Dust'
import { Galaxy } from './Galaxy'
import { MilkyWay, Voyager } from './MilkyWay'
import { Ray } from './Ray'
import { Planets } from './Planets'
import { Planet } from './Planet'
import { CyberCore } from './CyberCore'
import { Constellation } from './Constellation'
import { GlassField } from './GlassField'
import { Workspace } from './Workspace'
import { Crystals } from './Crystals'
import { Wormhole } from './Wormhole'

/**
 * Positions a scene at its station. Scenes "materialise" (scale up from
 * nothing) as the camera approaches and are skipped entirely when far away.
 */
function Station({ index, children }: { index: number; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    if (!ref.current) return
    const d = Math.abs(motion.station - index)
    const s = THREE.MathUtils.smoothstep(1 - d, 0, 0.55)
    ref.current.visible = s > 0.002
    ref.current.scale.setScalar(Math.max(0.0001, 0.35 + 0.65 * s) * (s > 0.002 ? 1 : 0.0001))
  })
  return (
    <group ref={ref} position={[0, 0, -index * SPACING]}>
      {children}
    </group>
  )
}

function Rig() {
  const { camera, scene, size } = useThree()
  const look = useMemo(() => new THREE.Vector3(0, 0, -6), [])
  const target = useMemo(() => new THREE.Vector3(), [])
  const lookTarget = useMemo(() => new THREE.Vector3(), [])
  const theme = useUI((s) => s.theme)

  useMemo(() => {
    scene.fog = new THREE.Fog('#05060f', 16, 62)
    scene.background = new THREE.Color('#05060f')
  }, [scene])

  useFrame((state, dt) => {
    if (import.meta.env.DEV) (window as unknown as { __r3f: unknown }).__r3f = state
    // Theme crossfade shared by every shader.
    motion.themeMix = THREE.MathUtils.damp(motion.themeMix, theme === 'light' ? 1 : 0, 3.2, dt)
    const bg = themed('bg', motion.themeMix)
    ;(scene.background as THREE.Color).copy(bg)
    scene.fog!.color.copy(bg)

    const s = motion.station
    const z = -s * SPACING
    const narrow = size.width < 760 ? 1.35 : 1
    const mx = motion.reduced ? 0 : motion.mouse.x
    const my = motion.reduced ? 0 : motion.mouse.y
    const t = state.clock.elapsedTime
    target.set(
      Math.sin(s * 1.7) * 1.3 + mx * 0.9,
      Math.cos(s * 1.3) * 0.5 + my * 0.55 + Math.sin(t * 0.3) * 0.08,
      z + CAM_DIST * narrow,
    )
    // Workspace station: look down at the desk.
    const deskFocus = Math.max(0, 1 - Math.abs(s - 5) * 1.5)
    target.y += deskFocus * 1.6
    lookTarget.set(mx * 0.4, my * 0.25 - deskFocus * 1.2, z - 6)
    easing.damp3(camera.position, target, motion.reduced ? 0.05 : 0.28, dt)
    easing.damp3(look, lookTarget, 0.3, dt)
    camera.lookAt(look)
    // Slight banking while flying fast.
    camera.rotateZ(THREE.MathUtils.clamp(motion.velocity * -0.0025, -0.06, 0.06))
  })
  return null
}

function Effects() {
  const bloom = useRef<BloomEffect>(null)
  const ca = useRef<ChromaticAberrationEffect>(null)
  const offset = useMemo(() => new THREE.Vector2(0.0004, 0.0004), [])
  useFrame((_, dt) => {
    const m = motion.themeMix
    if (bloom.current) {
      bloom.current.intensity = THREE.MathUtils.lerp(1.25, 0.25, m)
      bloom.current.luminanceMaterial.threshold = THREE.MathUtils.lerp(0.42, 0.97, m)
    }
    if (ca.current) {
      const v = Math.min(Math.abs(motion.velocity) * 0.00012, 0.004)
      const cur = ca.current.offset.x
      const next = THREE.MathUtils.damp(cur, 0.0004 + v, 6, dt)
      ca.current.offset.set(next, next)
    }
  })
  return (
    <EffectComposer multisampling={0}>
      <Bloom ref={bloom} mipmapBlur intensity={1.2} luminanceThreshold={0.42} luminanceSmoothing={0.25} radius={0.75} />
      <ChromaticAberration ref={ca} offset={offset} radialModulation modulationOffset={0.35} />
      <Noise opacity={0.035} premultiply blendFunction={BlendFunction.SCREEN} />
      <Vignette offset={0.25} darkness={0.55} />
    </EffectComposer>
  )
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 6]} intensity={1.4} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={4} color="#ffffff" position={[0, 5, -6]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={3} color="#4cf2ff" position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={3} color="#ff3dbb" position={[6, 1, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="ring" intensity={2} color="#8b5cff" position={[0, -4, 4]} scale={4} />
      </Environment>
    </>
  )
}

export default function Experience() {
  const [dpr, setDpr] = useState(() => Math.min(1.5, window.devicePixelRatio))
  const lowPower = useUI((s) => s.lowPower)
  const setLowPower = useUI((s) => s.setLowPower)

  return (
    <Canvas
      className="webgl"
      aria-hidden
      flat
      dpr={dpr}
      eventSource={document.getElementById('root')!}
      eventPrefix="client"
      camera={{ position: [0, 0, CAM_DIST], fov: 50, near: 0.1, far: 400 }}
      gl={{ antialias: false, powerPreference: 'high-performance', stencil: false }}
      onCreated={() => {
        // Wait two frames so shaders are compiled before the loader lifts.
        requestAnimationFrame(() => requestAnimationFrame(() => (motion.canvasReady = true)))
      }}
    >
      <PerformanceMonitor
        onIncline={() => {
          setDpr(Math.min(2, window.devicePixelRatio))
          setLowPower(false)
        }}
        onDecline={() => {
          setDpr(1)
          setLowPower(true)
        }}
        flipflops={3}
        onFallback={() => setLowPower(true)}
      />
      <Rig />
      <Lighting />
      <SkyDome />
      <Dust />
      <Suspense fallback={null}>
        <Ray />
        <Planets />
        <Station index={0}>
          <Galaxy />
        </Station>
        <Station index={1}>
          <Planet />
        </Station>
        <Station index={2}>
          <CyberCore />
        </Station>
        <Station index={3}>
          <Constellation />
        </Station>
        <Station index={4}>
          <GlassField />
        </Station>
        <Station index={5}>
          <Workspace />
        </Station>
        <Station index={6}>
          <Crystals />
        </Station>
        <Station index={7}>
          <Voyager />
        </Station>
        <Station index={8}>
          <MilkyWay />
        </Station>
        <Station index={9}>
          <Wormhole />
        </Station>
      </Suspense>
      {!lowPower && <Effects />}
    </Canvas>
  )
}
