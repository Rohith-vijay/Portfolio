import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { sections } from '../data/content'
import { motion, useUI } from '../lib/store'
import { premulBlend, SPACING } from './shared'
import { CORE } from './Galaxy'

/**
 * A ray of light born in the galaxy's sun-like core once the intro finishes.
 * It runs beneath the camera through every station, past each planet of the
 * solar system (Planets.tsx lights them as it arrives) and into the wormhole.
 * Its glowing head always flies just ahead of the visitor, leading the way.
 */
const LAST = sections.length - 1

/** Shared state other scenes read: where the ray's head is, and how far it has "risen". */
export const ray = { headZ: CORE.z, dawn: 0 }

function buildCurve() {
  const pts: THREE.Vector3[] = [CORE.clone(), new THREE.Vector3(0.6, -2.4, -12)]
  for (let i = 1; i < LAST; i++) {
    const z = -i * SPACING
    // Dip under the desk at the workspace station.
    const y = i === 5 ? -4.6 : -3.1 + Math.sin(i * 2.1) * 0.35
    pts.push(new THREE.Vector3(Math.sin(i * 1.7) * 0.9, y, z + 6))
    pts.push(new THREE.Vector3(Math.sin(i * 1.7 + 0.8) * 1.1, y - 0.2, z - 14))
  }
  const zEnd = -LAST * SPACING
  pts.push(new THREE.Vector3(0, -2.6, zEnd + 4), new THREE.Vector3(0, -1.2, zEnd - 24), new THREE.Vector3(0, 0, zEnd - 64))
  return new THREE.CatmullRomCurve3(pts, false, 'centripetal')
}

export function Ray() {
  const curve = useMemo(buildCurve, [])
  const head = useRef<THREE.Group>(null)
  const readyAt = useRef<number | null>(null)
  // Lookup table: curve samples, so we can find the point at a given depth.
  const table = useMemo(() => curve.getSpacedPoints(1200), [curve])
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uHeadZ: { value: CORE.z }, uLight: { value: 0 } }), [])
  const tmp = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    uniforms.uTime.value = t
    uniforms.uLight.value = motion.themeMix
    // Wait for the hero intro (loader + name reveal) to finish, then release the ray.
    if (useUI.getState().ready && readyAt.current == null) readyAt.current = t
    const released = readyAt.current != null && t - readyAt.current > (motion.reduced ? 0 : 1.8)
    ray.dawn = THREE.MathUtils.damp(ray.dawn, released ? 1 : 0, motion.reduced ? 20 : 0.9, dt)
    // Head flies ~26 units ahead of the camera.
    const target = -motion.station * SPACING - 15
    const z = THREE.MathUtils.lerp(CORE.z, target, ray.dawn)
    uniforms.uHeadZ.value = THREE.MathUtils.damp(uniforms.uHeadZ.value, z, 4, dt)
    ray.headZ = uniforms.uHeadZ.value
    if (!head.current) return
    const hz = uniforms.uHeadZ.value
    let lo = 0
    let hi = table.length - 1
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1
      if (table[mid].z > hz) lo = mid
      else hi = mid
    }
    const a = table[lo]
    const b = table[hi]
    const f = a.z === b.z ? 0 : (hz - a.z) / (b.z - a.z)
    tmp.copy(a).lerp(b, THREE.MathUtils.clamp(f, 0, 1))
    head.current.position.copy(tmp)
    const pulse = 1 + Math.sin(t * 4) * 0.12
    head.current.scale.setScalar(pulse * Math.min(1, ray.dawn * 3) + 0.0001)
  })

  const shader = (halo: boolean) => ({
    ...premulBlend,
    toneMapped: false,
    fog: false,
    args: [{ uniforms }] as [THREE.ShaderMaterialParameters],
    vertexShader: /* glsl */ `
      varying vec2 vUv; varying float vZ; varying float vDist; varying float vFacing;
      void main(){
        vUv = uv;
        vZ = position.z;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vDist = -mv.z;
        vec3 n = normalize(normalMatrix * normal);
        vFacing = abs(dot(n, normalize(-mv.xyz)));
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime; uniform float uHeadZ; uniform float uLight;
      varying vec2 vUv; varying float vZ; varying float vDist; varying float vFacing;
      void main(){
        float lit = smoothstep(uHeadZ - 0.5, uHeadZ + 6.0, vZ);          // behind the head = lit
        if (lit < 0.002) discard;                                           // nothing ahead of the light yet
        float pulses = pow(fract(vUv.x * 60.0 - uTime * 0.9), 6.0);       // photons streaming forward
        float core = ${halo ? 'pow(vFacing, 3.0) * 0.28' : '0.6 + 0.4 * pow(vFacing, 2.0)'};
        float i = lit * (0.75 + pulses * 1.4) * core;
        i *= smoothstep(0.0, 0.004, vUv.x);                                 // soft start at the core
        i *= 1.0 - smoothstep(55.0, 95.0, vDist);                           // fade far away
        i *= 1.0 - smoothstep(14.0, 2.0, vDist) * 0.65;                    // don't blind the camera
        vec3 hot = vec3(1.0, 0.86, 0.55) * 1.8;
        vec3 warm = vec3(1.0, 0.5, 0.15) * 1.3;
        vec3 col = mix(warm, hot, pulses * lit);
        col = mix(col, vec3(0.9, 0.42, 0.0), uLight);
        float a = clamp(i, 0.0, 1.0);
        gl_FragColor = vec4(col * a, a * uLight);
      }
    `,
  })

  return (
    <group>
      <mesh frustumCulled={false} renderOrder={2}>
        <tubeGeometry args={[curve, 1400, 0.035, 8, false]} />
        <shaderMaterial {...shader(false)} />
      </mesh>
      <mesh frustumCulled={false} renderOrder={1}>
        <tubeGeometry args={[curve, 1400, 0.32, 12, false]} />
        <shaderMaterial {...shader(true)} />
      </mesh>
      {/* The photon at the front of the ray */}
      <group ref={head} scale={0.0001}>
        <mesh>
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshBasicMaterial color={[4, 3.2, 2]} toneMapped={false} fog={false} />
        </mesh>
        <pointLight color="#ffc070" intensity={6} distance={8} />
      </group>
    </group>
  )
}
