import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { easing } from 'maath'
import { motion } from '../lib/store'
import { premulBlend, rng } from './shared'
import { useLayout } from './useLayout'

/** World-space position of the galaxy's sun-like core: where the ray (Ray.tsx) is born. */
export const CORE = new THREE.Vector3(0, -0.6, -1)

/** Hero: a spiral galaxy of ~45k GPU-animated stars with differential rotation. */
export function Galaxy() {
  const { mobile } = useLayout()
  const count = mobile ? 22000 : 45000
  const group = useRef<THREE.Group>(null)

  const { positions, colors, scales, randomness } = useMemo(() => {
    const r = rng(42)
    const radius = 9
    const branches = 5
    const spin = 1.15
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const randomness = new Float32Array(count * 3)
    const inside = new THREE.Color('#ffd29a')
    const mid = new THREE.Color('#ff3dbb')
    const outside = new THREE.Color('#4cf2ff')
    const c = new THREE.Color()
    for (let i = 0; i < count; i++) {
      const rad = Math.pow(r(), 1.6) * radius
      const branch = ((i % branches) / branches) * Math.PI * 2
      const spinAngle = rad * spin
      positions[i * 3] = Math.cos(branch + spinAngle) * rad
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = Math.sin(branch + spinAngle) * rad
      const rp = 2.6
      const spread = 0.35 * rad + 0.15
      randomness[i * 3] = Math.pow(r(), rp) * (r() < 0.5 ? 1 : -1) * spread
      randomness[i * 3 + 1] = Math.pow(r(), rp) * (r() < 0.5 ? 1 : -1) * spread * 0.35
      randomness[i * 3 + 2] = Math.pow(r(), rp) * (r() < 0.5 ? 1 : -1) * spread
      const t = rad / radius
      if (t < 0.35) c.copy(inside).lerp(mid, t / 0.35)
      else c.copy(mid).lerp(outside, (t - 0.35) / 0.65)
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
      uSize: { value: 34 * Math.min(2, window.devicePixelRatio) },
      uLight: { value: 0 },
      uPulse: { value: 0 },
    }),
    [],
  )

  useFrame((state, dt) => {
    uniforms.uTime.value = state.clock.elapsedTime + 40
    uniforms.uLight.value = motion.themeMix
    if (!group.current) return
    // Pointer tilts the galaxy; scrolling away makes it rise and tilt toward the camera.
    const away = Math.min(1, motion.station)
    easing.dampE(
      group.current.rotation,
      [0.62 + motion.mouse.y * 0.18 - away * 0.4, 0, -0.18 + motion.mouse.x * 0.2],
      0.4,
      dt,
    )
    easing.damp3(group.current.position, [CORE.x, CORE.y + away * 3, CORE.z - away * 6], 0.3, dt)
  })

  return (
    <group ref={group}>
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
          args={[{ uniforms: uniforms }]}
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
              vCore = 1.0 - smoothstep(0.0, 2.2, d);
            }
          `}
          fragmentShader={/* glsl */ `
            uniform float uLight; varying vec3 vColor; varying float vCore;
            void main(){
              float d = distance(gl_PointCoord, vec2(0.5));
              float glowDark = pow(1.0 - min(d*2.0, 1.0), 3.0);
              float glowLight = smoothstep(0.5, 0.12, d);
              vec3 dark = vColor * (1.0 + vCore*1.5);
              // In light mode stars become saturated ink so they read on a pale sky.
              vec3 ink = mix(vColor*vec3(0.7,0.45,0.95), vec3(0.22,0.08,0.6), 0.3);
              vec3 col = mix(dark, ink, uLight);
              float a = mix(glowDark, glowLight * 0.95, uLight);
              gl_FragColor = vec4(col * a, a * uLight);
            }
          `}
        />
      </points>
      {/* Core glow — the sun the ray is born from */}
      <mesh>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshBasicMaterial color={[4, 3, 2.4]} toneMapped={false} />
      </mesh>
      <pointLight color="#ffb36b" intensity={30} distance={14} />
    </group>
  )
}
