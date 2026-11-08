import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { motion } from '../lib/store'
import { noiseGLSL } from './shared'

/**
 * Bakes the expensive nebula noise (two 5-octave fbm fields + a star field)
 * into an equirectangular texture once, so the per-frame sky costs a single
 * texture lookup instead of 11 simplex evaluations per pixel.
 */
function useBakedNebula() {
  const gl = useThree((s) => s.gl)
  const target = useMemo(() => {
    const rt = new THREE.WebGLRenderTarget(2048, 1024, {
      generateMipmaps: false,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.RepeatWrapping,
      depthBuffer: false,
    })
    const mat = new THREE.ShaderMaterial({
      vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: /* glsl */ `
        varying vec2 vUv;
        ${noiseGLSL}
        void main(){
          float lon = vUv.x * 6.2831853 - 3.1415927;
          float lat = (vUv.y - 0.5) * 3.1415927;
          vec3 d = vec3(cos(lat) * sin(lon), sin(lat), cos(lat) * cos(lon));
          float n = fbm(d * 2.2);
          float n2 = fbm(d * 4.0 + 7.0);
          float star = pow(max(snoise(d * 160.0), 0.0), 14.0) * 3.0;
          gl_FragColor = vec4(smoothstep(0.0, 0.8, n), smoothstep(0.1, 0.9, n2), clamp(star, 0.0, 1.0), 1.0);
        }
      `,
    })
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat)
    const scene = new THREE.Scene()
    scene.add(quad)
    const prev = gl.getRenderTarget()
    gl.setRenderTarget(rt)
    gl.render(scene, new THREE.OrthographicCamera())
    gl.setRenderTarget(prev)
    mat.dispose()
    quad.geometry.dispose()
    return rt
  }, [gl])
  useEffect(() => () => target.dispose(), [target])
  return target.texture
}

/** A camera-following nebula sphere: vivid aurora clouds in both themes. */
export function SkyDome() {
  const mesh = useRef<THREE.Mesh>(null)
  const map = useBakedNebula()
  const uniforms = useMemo(
    () => ({ uMap: { value: map }, uTime: { value: 0 }, uLight: { value: 0 }, uStation: { value: 0 } }),
    [map],
  )

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uLight.value = motion.themeMix
    uniforms.uStation.value = motion.station
    mesh.current?.position.copy(state.camera.position)
  })

  return (
    <mesh ref={mesh} renderOrder={-10} frustumCulled={false}>
      <sphereGeometry args={[180, 48, 32]} />
      <shaderMaterial
        side={THREE.BackSide}
        depthWrite={false}
        fog={false}
        args={[{ uniforms: uniforms }]}
        vertexShader={/* glsl */ `
          varying vec3 vDir;
          void main(){
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          uniform sampler2D uMap; uniform float uTime; uniform float uLight; uniform float uStation;
          varying vec3 vDir;
          void main(){
            vec3 d = normalize(vDir);
            vec2 uv = vec2(atan(d.x, d.z) / 6.2831853 + 0.5 + uTime * 0.0015 + uStation * 0.012,
                           asin(clamp(d.y, -1.0, 1.0)) / 3.1415927 + 0.5);
            vec3 s = texture2D(uMap, uv).rgb;
            float c1 = s.r; float c2 = s.g; float star = s.b;
            // Hue drifts as you travel through the stations.
            float h = uStation / 9.0;
            vec3 darkA = mix(vec3(0.20,0.05,0.45), vec3(0.02,0.25,0.40), h);
            vec3 darkB = mix(vec3(0.55,0.05,0.35), vec3(0.45,0.20,0.05), h);
            vec3 lightA = mix(vec3(0.62,0.80,1.00), vec3(1.00,0.80,0.90), h);
            vec3 lightB = mix(vec3(1.00,0.78,0.92), vec3(0.75,0.95,0.90), h);
            vec3 dark = vec3(0.012,0.014,0.04) + darkA*c1*0.5 + darkB*c2*0.32;
            dark += vec3(star) * (0.6 + 0.4*sin(uTime*2.0 + d.x*90.0));
            vec3 light = mix(vec3(0.933,0.941,0.969), lightA, c1*0.45);
            light = mix(light, lightB, c2*0.35);
            gl_FragColor = vec4(mix(dark, light, uLight), 1.0);
          }
        `}
      />
    </mesh>
  )
}
