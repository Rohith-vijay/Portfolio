import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { motion } from '../lib/store'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ABCDEFXYZ'

/** Decodes text through random glyphs — the "cyber" signature of the site. */
export function Scramble({ text, className, trigger = 'mount', delay = 0 }: { text: string; className?: string; trigger?: 'mount' | 'hover' | 'view'; delay?: number }) {
  const [out, setOut] = useState(trigger === 'hover' ? text : '')
  const ref = useRef<HTMLSpanElement>(null)
  const raf = useRef(0)

  const run = () => {
    if (motion.reduced) return setOut(text)
    cancelAnimationFrame(raf.current)
    const start = performance.now()
    const dur = Math.min(1100, 300 + text.length * 35)
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      const reveal = Math.floor(p * text.length)
      let s = ''
      for (let i = 0; i < text.length; i++) {
        if (i < reveal || text[i] === ' ') s += text[i]
        else s += GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      setOut(s)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    if (trigger === 'mount') {
      const id = setTimeout(run, delay)
      return () => {
        clearTimeout(id)
        cancelAnimationFrame(raf.current)
      }
    }
    if (trigger === 'view' && ref.current) {
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setTimeout(run, delay)
            io.disconnect()
          }
        },
        { threshold: 0.6 },
      )
      io.observe(ref.current)
      return () => io.disconnect()
    }
    setOut(text)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  return (
    <span ref={ref} className={className} aria-label={text} onMouseEnter={trigger === 'hover' ? run : undefined}>
      <span aria-hidden>{out || ' '}</span>
    </span>
  )
}

/** Cycles through phrases with a scramble transition. */
export function Rotator({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])
  return <Scramble key={i} text={words[i]} className="rotator" />
}

/** Count-up number that starts when scrolled into view. */
export function Counter({ value, decimals = 0, prefix = '', suffix = '', duration = 1800 }: { value: number; decimals?: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        if (motion.reduced) return setV(value)
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
          setV(value * eased)
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])
  const formatted = v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return (
    <span ref={ref} className="counter" aria-label={`${prefix}${value.toLocaleString('en-IN')}${suffix}`}>
      <span aria-hidden>
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  )
}

/** Holographic 3D tilt card with a glare that follows the pointer. */
export function Tilt({ children, className = '', max = 10, style }: { children: ReactNode; className?: string; max?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || motion.reduced || e.pointerType === 'touch') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', `${(0.5 - y) * max}deg`)
    el.style.setProperty('--ry', `${(x - 0.5) * max}deg`)
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }
  return (
    <div ref={ref} className={`tilt ${className}`} style={style} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="tilt__inner">{children}</div>
      <div className="tilt__glare" aria-hidden />
    </div>
  )
}

/** Pulls its child toward the pointer. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || motion.reduced || e.pointerType === 'touch') return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }
  return (
    <span ref={ref} className="magnetic" onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </span>
  )
}

/** Circular gauge that fills when it enters the viewport. */
export function Gauge({ value, max, label, children, color = 'var(--cyan)' }: { value: number; max: number; label: string; children: ReactNode; color?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const R = 52
  const C = 2 * Math.PI * R
  return (
    <figure className="gauge">
      <svg ref={ref} viewBox="0 0 120 120" aria-hidden>
        <circle cx="60" cy="60" r={R} className="gauge__track" />
        <circle
          cx="60"
          cy="60"
          r={R}
          className="gauge__fill"
          style={{ stroke: color, strokeDasharray: C, strokeDashoffset: on ? C * (1 - value / max) : C }}
        />
      </svg>
      <div className="gauge__value">{children}</div>
      <figcaption>{label}</figcaption>
    </figure>
  )
}

export function SectionHead({ index, kicker, title, align = 'left' }: { index: string; kicker: string; title: string; align?: 'left' | 'center' }) {
  return (
    <header className={`section-head section-head--${align}`} data-reveal>
      <p className="kicker mono">
        <span className="kicker__index">{index}</span>
        <span className="kicker__line" />
        <Scramble text={kicker.toUpperCase()} trigger="view" />
      </p>
      <h2 className="title glitch" data-text={title}>
        {title}
      </h2>
    </header>
  )
}

export function Arrow({ dir = 'ne' }: { dir?: 'ne' | 'down' | 'right' }) {
  const rot = dir === 'ne' ? 0 : dir === 'down' ? 135 : 45
  return (
    <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" style={{ transform: `rotate(${rot}deg)` }} aria-hidden>
      <path d="M3 11 L11 3 M5 3 H11 V9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
