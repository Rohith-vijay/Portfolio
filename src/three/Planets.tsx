import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { motion } from '../lib/store'
import { noiseGLSL, SPACING, themed } from './shared'
import { useLayout } from './useLayout'
import { ray } from './Ray'

/**
 * Our solar system laid out along the journey: one planet between each pair of
 * stations, in order from the Sun. Each waits in darkness beside the ray's path
 * and lights up the moment the ray reaches it.
 */
type Kind = 0 | 1 | 2 // rocky · banded gas giant · earth
interface Body {
  name: string
  size: number
  x: number
  y: number
  kind: Kind
  a: string
  b: string
  c: string
  ring?: { inner: number; outer: number; tilt: number; color: string; opacity: number }
  moon?: boolean
  spin: number
}

const BODIES: Body[] = [
  { name: 'Mercury', size: 0.45, x: 4.6, y: -0.9, kind: 0, a: '#8d847c', b: '#c9c0b6', c: '#5e5853', spin: 0.05 },
  { name: 'Venus', size: 0.85, x: -5.2, y: -0.6, kind: 1, a: '#d9b77a', b: '#f3dfae', c: '#b88f4f', spin: 0.03 },
  { name: 'Earth', size: 0.9, x: 5.4, y: -0.5, kind: 2, a: '#1f5fd6', b: '#3f9a4a', c: '#ffffff', moon: true, spin: 0.12 },
  { name: 'Mars', size: 0.62, x: -5.0, y: -0.8, kind: 0, a: '#b4472a', b: '#e07a4f', c: '#7a2c1a', spin: 0.11 },
  { name: 'Jupiter', size: 2.4, x: 8.6, y: 0.6, kind: 1, a: '#c99a6b', b: '#f0dcc0', c: '#9a5a3a', spin: 0.22 },
  {
    name: 'Saturn',
    size: 2.0,
    x: -8.8,
    y: 0.5,
    kind: 1,
    a: '#d8bd86',
    b: '#f4e6c2',
    c: '#a98a52',
    spin: 0.2,
    ring: { inner: 1.35, outer: 2.25, tilt: 0.45, color: '#e6d3a3', opacity: 0.8 },
  },
  {
    name: 'Uranus',
    size: 1.4,
    x: 6.6,
    y: 0.2,
    kind: 1,
    a: '#86d8e4',
    b: '#b9eef4',
    c: '#6fbccc',
    spin: 0.15,
    ring: { inner: 1.5, outer: 1.75, tilt: 1.45, color: '#bfe8ef', opacity: 0.35 },
  },
  { name: 'Neptune', size: 1.35, x: -6.6, y: 0.1, kind: 1, a: '#2f4fd8', b: '#5b7cff', c: '#1b2e8f', spin: 0.16 },
]

const vert = /* glsl */ `
  varying vec3 vN; varying vec3 vP; varying vec3 vView;
  void main(){
    vN = normalize(mat3(modelMatrix) * normal);
    vP = position;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vView = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const frag = /* glsl */ `
  uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform vec3 uBg;
  uniform float uKind; uniform float uLit; uniform float uFlash; uniform float uTime; uniform float uSeed;
  varying vec3 vN; varying vec3 vP; varying vec3 vView;
  ${noiseGLSL}
  void main(){
    vec3 p = normalize(vP);
    vec3 col;
    if (uKind < 0.5) {
      // Rocky: mottled surface + craters
      float n = fbm(p * 3.0 + uSeed);
      float cr = smoothstep(0.55, 0.62, snoise(p * 9.0 + uSeed));
      col = mix(uA, uB, smoothstep(-0.4, 0.6, n));
      col = mix(col, uC, cr * 0.6);
    } else if (uKind < 1.5) {
      // Gas giant: latitude bands warped by turbulence
      float n = fbm(p * 2.2 + vec3(0.0, 0.0, uTime * 0.02) + uSeed);
      float bands = sin(p.y * 14.0 + n * 2.6);
      col = mix(uA, uB, smoothstep(-0.7, 0.8, bands));
      col = mix(col, uC, smoothstep(0.35, 0.9, fbm(p * 5.0 + uSeed + 2.0)) * 0.5);
    } else {
      // Earth: oceans, continents, ice caps, clouds
      float land = smoothstep(0.02, 0.08, fbm(p * 2.4 + 4.0));
      col = mix(uA, uB, land);
      col = mix(col, vec3(0.95), smoothstep(0.82, 0.9, abs(p.y)));
      float clouds = smoothstep(0.15, 0.6, fbm(p * 3.5 + vec3(uTime * 0.03, 0.0, 0.0)));
      col = mix(col, uC, clouds * 0.65);
    }
    // Sunlight arrives from the core behind the visitor.
    vec3 L = normalize(vec3(0.35, 0.4, 1.0));
    float diff = max(dot(normalize(vN), L), 0.0);
    float rim = pow(1.0 - max(dot(normalize(vN), normalize(vView)), 0.0), 3.0);
    vec3 lit = col * (0.12 + diff * 1.05) + mix(uB, vec3(1.0, 0.8, 0.5), 0.4) * rim * (0.45 + uFlash * 1.6);
    // Unreached: a faint, see-through silhouette with a thin atmospheric rim.
    vec3 dark = mix(uBg, col, 0.18) + uB * rim * 0.35;
    vec3 c = mix(dark, lit, uLit);
    float alpha = mix(0.32 + rim * 0.4, 1.0, uLit);
    gl_FragColor = vec4(c, alpha);
  }
`

function Planet({ body, index, z }: { body: Body; index: number; z: number }) {
  const { side } = useLayout()
  const mesh = useRef<THREE.Mesh>(null)
  const moon = useRef<THREE.Group>(null)
  const ringMat = useRef<THREE.MeshBasicMaterial>(null)
  const state = useRef({ reached: false })
  const uniforms = useMemo(
    () => ({
      uA: { value: new THREE.Color(body.a) },
      uB: { value: new THREE.Color(body.b) },
      uC: { value: new THREE.Color(body.c) },
      uBg: { value: new THREE.Color() },
      uKind: { value: body.kind },
      uLit: { value: 0 },
      uFlash: { value: 0 },
      uTime: { value: 0 },
      uSeed: { value: index * 3.7 },
    }),
    [body, index],
  )

  useFrame((s, dt) => {
    uniforms.uTime.value = s.clock.elapsedTime
    uniforms.uBg.value.copy(themed('bg', motion.themeMix))
    const reached = ray.headZ < z + body.size
    if (reached && !state.current.reached) uniforms.uFlash.value = 1
    state.current.reached = reached
    uniforms.uLit.value = THREE.MathUtils.damp(uniforms.uLit.value, reached ? 1 : 0, 2.2, dt)
    uniforms.uFlash.value = THREE.MathUtils.damp(uniforms.uFlash.value, 0, 1.2, dt)
    if (ringMat.current && body.ring) ringMat.current.opacity = body.ring.opacity * (0.25 + 0.75 * uniforms.uLit.value)
    if (mesh.current) mesh.current.rotation.y += dt * body.spin
    if (moon.current) moon.current.rotation.y = s.clock.elapsedTime * 0.6
  })

  // Keep giants clear of the text column on narrow screens.
  const x = body.x * (side < 0.5 ? 0.75 : 1)
  return (
    <group position={[x, body.y, z]} rotation-z={index % 2 ? -0.18 : 0.18}>
      <mesh ref={mesh}>
        <sphereGeometry args={[body.size, 64, 64]} />
        <shaderMaterial transparent args={[{ uniforms, vertexShader: vert, fragmentShader: frag }]} />
      </mesh>
      {body.ring && (
        <mesh rotation-x={Math.PI / 2 - body.ring.tilt}>
          <ringGeometry args={[body.size * body.ring.inner, body.size * body.ring.outer, 128]} />
          <meshBasicMaterial ref={ringMat} color={body.ring.color} transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      )}
      {body.moon && (
        <group ref={moon} rotation-x={0.3}>
          <mesh position={[body.size * 2.2, 0, 0]}>
            <sphereGeometry args={[body.size * 0.27, 24, 24]} />
            <meshStandardMaterial color="#cfcfcf" roughness={1} />
          </mesh>
        </group>
      )}
    </group>
  )
}

export function Planets() {
  return (
    <group>
      {BODIES.map((b, i) => (
        <Planet key={b.name} body={b} index={i} z={-(i + 0.5) * SPACING - 4} />
      ))}
    </group>
  )
}
