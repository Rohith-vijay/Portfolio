import Lenis from 'lenis'
import { sections } from '../data/content'
import { motion } from './store'

let lenis: Lenis | null = null
let anchors: number[] = []

/** Scroll positions at which the camera should sit exactly on each station. */
export function measureAnchors() {
  const vh = window.innerHeight
  const max = document.documentElement.scrollHeight - vh
  anchors = sections.map((s, i) => {
    if (i === 0) return 0
    const el = document.getElementById(s.id)
    if (!el) return max
    const top = el.getBoundingClientRect().top + window.scrollY
    return Math.min(max, Math.max(0, top - vh * 0.12))
  })
  anchors[anchors.length - 1] = Math.max(anchors[anchors.length - 1], max)
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/**
 * Maps scrollY → fractional station index. The camera "parks" at a station
 * for the first part of its section, then flies to the next one, so long
 * sections keep their 3D scene in frame while being read.
 */
export function stationFor(y: number) {
  if (!anchors.length) return 0
  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i]
    const b = anchors[i + 1]
    if (y < b) {
      const f = b > a ? (y - a) / (b - a) : 1
      const travel = Math.min(1, Math.max(0, (f - 0.42) / 0.58))
      return i + ease(travel)
    }
  }
  return anchors.length - 1
}

export function initScroll() {
  measureAnchors()
  lenis = new Lenis({
    duration: motion.reduced ? 0 : 1.15,
    smoothWheel: !motion.reduced,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
  lenis.on('scroll', (l: Lenis) => {
    motion.y = l.scroll
    motion.velocity = l.velocity
    motion.station = stationFor(l.scroll)
  })
  let raf = 0
  const loop = (time: number) => {
    lenis?.raf(time)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  const ro = new ResizeObserver(() => {
    measureAnchors()
    motion.station = stationFor(window.scrollY)
  })
  ro.observe(document.body)

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: motion.reduced ? 0 : 1.8 })
  else el.scrollIntoView()
}

export function stopScroll(stop: boolean) {
  if (!lenis) return
  if (stop) lenis.stop()
  else lenis.start()
}
