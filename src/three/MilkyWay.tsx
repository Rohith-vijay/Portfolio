import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { easing } from 'maath'
import { motion } from '../lib/store'
import { premulBlend, rng } from './shared'
import { useLayout } from './useLayout'

const RADIUS = 9
const SPIN = 1.05
const BRANCHES = 4
// Where our Sun sits: out on a minor arm, about halfway to the edge.
const SUN_R = 5.0
const SUN_BRANCH = 1

/** Same differential rotation the vertex shader applies, so the marker stays on its arm. */
function orbitAngle(d: number, time: number) {
  return (1 / Math.max(d, 0.6)) * time * 0.22
}

/**
 * Inspirations: the Milky Way, a barred spiral of ~45k GPU-animated stars,
 * with a pulsing ring marking our Sun on its arm.
 */
export function MilkyWay() {
  const { mobile, side } = useLayout()
  const count = mobile ? 22000 : 45000
  const group = useRef<THREE.Group>(null)
  const marker = useRef<THREE.Group>(null)

  const { positions, colors, scales, randomness } = useMemo(() => {
    const r = rng(42)
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const randomness = new Float32Array(count * 3)
    const inside = new THREE.Color('#fff0c4')
    const mid = new THREE.Color('#ffa86b')
    const outside = new THREE.Color('#7fb2ff')
    const c = new THREE.Color()
    for (let i = 0; i < count; i++) {
      const bar = i % 9 === 0 // a central bar of old, warm stars
      const rad = bar ? r() * 2.4 : Math.pow(r(), 1.5) * RADIUS
      const branch = ((i % BRANCHES) / BRANCHES) * Math.PI * 2
      const spinAngle = rad * SPIN
      if (bar) {
        const s = r() < 0.5 ? 1 : -1
        positions[i * 3] = s * rad
        positions[i * 3 + 1] = 0
        positions[i * 3 + 2] = (r() - 0.5) * 0.7
      } else {
        positions[i * 3] = Math.cos(branch + spinAngle) * rad
        positions[i * 3 + 1] = 0
        positions[i * 3 + 2] = Math.sin(branch + spinAngle) * rad
      }
      const spread = 0.17 * rad + 0.15
      randomness[i * 3] = Math.pow(r(), 2.6) * (r() < 0.5 ? 1 : -1) * spread
      randomness[i * 3 + 1] = Math.pow(r(), 2.6) * (r() < 0.5 ? 1 : -1) * spread * 0.3
      randomness[i * 3 + 2] = Math.pow(r(), 2.6) * (r() < 0.5 ? 1 : -1) * spread
      const t = rad / RADIUS
      if (bar || t < 0.3) c.copy(inside).lerp(mid, Math.min(1, t / 0.3))
      else c.copy(mid).lerp(outside, (t - 0.3) / 0.7)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
      scales[i] = r()
    }
    return { positions, colors, scales, randomness }
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 62 * Math.min(2, window.devicePixelRatio) },
      uLight: { value: 0 },
    }),
    [],
  )

  useFrame((state, dt) => {
    const time = state.clock.elapsedTime + 40
    uniforms.uTime.value = time
    uniforms.uLight.value = motion.themeMix
    if (group.current) {
      easing.dampE(group.current.rotation, [1.15 + motion.mouse.y * 0.12, 0.25, 0.3 + motion.mouse.x * 0.15], 0.5, dt)
    }
    if (marker.current) {
      const base = (SUN_BRANCH / BRANCHES) * Math.PI * 2 + SUN_R * SPIN
      // Mirror the shader: angle = atan(x, z) + differential rotation.
      const a0 = Math.atan2(Math.cos(base), Math.sin(base)) + orbitAngle(SUN_R, time)
      marker.current.position.set(Math.cos(a0) * SUN_R, 0, Math.sin(a0) * SUN_R)
      marker.current.scale.setScalar(1 + Math.sin(time * 3) * 0.15)
    }
  })

  return (
    <group>
      <group ref={group} position={[7.5 * side, 0.6, -16]} scale={mobile ? 0.55 : 0.8}>
        <points frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
            <bufferAttribute attach="attributes-aRandomness" args={[randomness, 3]} />
          </bufferGeometry>
          <shaderMaterial
            {...premulBlend}
            vertexColors
            args={[{ uniforms }]}
            vertexShader={/* glsl */ `
              uniform float uTime; uniform float uSize;
              attribute float aScale; attribute vec3 aRandomness;
              varying vec3 vColor; varying float vCore;
              void main(){
                vec3 p = position;
                float angle = atan(p.x, p.z);
                float d = length(p.xz);
                angle += (1.0 / max(d, 0.6)) * uTime * 0.22;
                p.x = cos(angle) * d;
                p.z = sin(angle) * d;
                p += aRandomness;
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                gl_Position = projectionMatrix * mv;
                gl_PointSize = uSize * (0.25 + aScale) / -mv.z;
                vColor = color;
                vCore = 1.0 - smoothstep(0.0, 2.6, d);
              }
            `}
            fragmentShader={/* glsl */ `
              uniform float uLight; varying vec3 vColor; varying float vCore;
              void main(){
                float d = distance(gl_PointCoord, vec2(0.5));
                float glowDark = pow(1.0 - min(d*2.0, 1.0), 3.0);
                float glowLight = smoothstep(0.5, 0.12, d);
                vec3 dark = vColor * (1.0 + vCore*1.4);
                vec3 ink = mix(vColor*vec3(0.75,0.5,0.9), vec3(0.25,0.1,0.55), 0.3);
                vec3 col = mix(dark, ink, uLight);
                float a = mix(glowDark, glowLight * 0.95, uLight);
                gl_FragColor = vec4(col * a, a * uLight);
              }
            `}
          />
        </points>
        {/* Galactic core */}
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshBasicMaterial color={[4, 3.2, 2.2]} toneMapped={false} />
        </mesh>
        {/* "You are here": our Sun */}
        <group ref={marker}>
          <mesh>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshBasicMaterial color={[4, 2.6, 1]} toneMapped={false} />
          </mesh>
          <mesh rotation-x={Math.PI / 2}>
            <torusGeometry args={[0.38, 0.02, 8, 64]} />
            <meshBasicMaterial color={[3, 1.8, 0.6]} toneMapped={false} transparent opacity={0.9} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

/** Interests: a Voyager-style probe drifting through space. */
export function Voyager() {
  const { mobile, side } = useLayout()
  const probe = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!probe.current) return
    const t = state.clock.elapsedTime
    probe.current.rotation.set(0.3 + Math.sin(t * 0.3) * 0.1, t * 0.15, 0.2)
    probe.current.position.y = 2.6 + Math.sin(t * 0.5) * 0.2
  })
  return <Probe ref={probe} position={[6.2 * Math.max(side, 0.5), 2.6, -6]} scale={mobile ? 0.4 : 0.6} />
}

/** A small Voyager-style probe: high-gain dish, bus, magnetometer boom and RTG arm. */
function Probe({ ref, position, scale }: { ref: React.Ref<THREE.Group>; position: [number, number, number]; scale: number }) {
  const gold = <meshStandardMaterial color="#e2b04a" metalness={0.9} roughness={0.3} />
  const white = <meshStandardMaterial color="#e9ecf5" metalness={0.3} roughness={0.5} />
  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Dish */}
      <mesh position={[0, 0.55, 0]} rotation-x={Math.PI}>
        <cylinderGeometry args={[1.1, 0.12, 0.28, 40, 1, true]} />
        <meshStandardMaterial color="#f2f4fb" metalness={0.2} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
        {white}
      </mesh>
      {/* Bus */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.4, 10]} />
        {gold}
      </mesh>
      {/* Magnetometer boom */}
      <mesh position={[1.9, -0.05, 0]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.018, 0.018, 3.2, 6]} />
        {white}
      </mesh>
      {/* RTG arm */}
      <mesh position={[-1.0, -0.15, 0.3]} rotation={[0, 0.3, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 1.4, 6]} />
        {white}
      </mesh>
      <mesh position={[-1.75, -0.15, 0.55]} rotation={[0, 0.3, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.55, 10]} />
        <meshStandardMaterial color="#555b66" metalness={0.7} roughness={0.5} />
      </mesh>
      <pointLight position={[1.5, 1.5, 2]} intensity={4} distance={6} color="#ffffff" />
    </group>
  )
}
