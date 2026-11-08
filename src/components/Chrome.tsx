import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { profile, sections } from '../data/content'
import { motion, useUI } from '../lib/store'
import { scrollToId } from '../lib/scroll'
import { Magnetic } from './fx'

/* ---------------------------------------------------------------- Loader */

export function Loader() {
  const ready = useUI((s) => s.ready)
  const setReady = useUI((s) => s.setReady)
  const [pct, setPct] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    let raf = 0
    let shown = 0
    const tick = () => {
      const elapsed = performance.now() - start
      const canvas = motion.canvasReady
      const cap = canvas ? 100 : 88
      const target = Math.min(cap, (elapsed / 1600) * 100)
      shown += (target - shown) * 0.12
      setPct(Math.round(shown))
      if (canvas && elapsed > 1500 && shown > 99.2) {
        setPct(100)
        setTimeout(() => setReady(true), 200)
        return
      }
      // Fail-safe: never trap the visitor behind the loader.
      if (elapsed > 9000) return setReady(true)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [setReady])

  useEffect(() => {
    if (!ready) return
    const id = setTimeout(() => setGone(true), 1400)
    return () => clearTimeout(id)
  }, [ready])

  if (gone) return null
  return (
    <div className={`loader ${ready ? 'loader--out' : ''}`} role="status" aria-live="polite">
      <div className="loader__panel loader__panel--top" />
      <div className="loader__panel loader__panel--bottom" />
      <div className="loader__content">
        <div className="loader__orbit" aria-hidden>
          <span />
          <span />
          <span />
          <b className="loader__sun" />
        </div>
        <p className="loader__name">{profile.name}</p>
        <p className="loader__pct mono">
          {String(pct).padStart(3, '0')}
          <span>%</span>
        </p>
        <div className="loader__bar">
          <i style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
        <p className="loader__hint mono">initialising universe · compiling shaders</p>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- Cursor */

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useUI((s) => s.cursorLabel)
  const [hoverEl, setHoverEl] = useState<string | null>(null)
  const [enabled] = useState(() => matchMedia('(pointer: fine)').matches && !motion.reduced)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')
    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const ringPos = { ...pos }
    let raf = 0
    const move = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      const t = (e.target as HTMLElement).closest<HTMLElement>('a, button, [data-cursor]')
      setHoverEl(t ? t.dataset.cursor ?? '' : null)
    }
    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18
      ringPos.y += (pos.y - ringPos.y) * 0.18
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    addEventListener('pointermove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [enabled])

  if (!enabled) return null
  const text = label ?? (hoverEl || null)
  const active = label != null || hoverEl != null
  return (
    <>
      <div ref={ring} className={`cursor-ring ${active ? 'is-active' : ''} ${text ? 'has-label' : ''}`} aria-hidden>
        <span>{text}</span>
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  )
}

/* ---------------------------------------------------------------- Theme toggle */

export function ThemeToggle() {
  const theme = useUI((s) => s.theme)
  const setTheme = useUI((s) => s.setTheme)
  const toggle = (e: MouseEvent) => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }
    if (!doc.startViewTransition || motion.reduced) return setTheme(next)
    const x = e.clientX
    const y = e.clientY
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    let applied = false
    const apply = () => {
      if (applied) return
      applied = true
      flushSync(() => setTheme(next))
    }
    const vt = doc.startViewTransition(apply)
    // Safety net: if the browser stalls or skips the transition, still switch.
    setTimeout(apply, 600)
    vt.ready.catch(() => {}).then(() => {
      if (!applied) return
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(.7,0,.25,1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }
  return (
    <button className={`theme-toggle theme-toggle--${theme}`} onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} data-cursor={theme === 'dark' ? 'Light' : 'Dark'}>
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
        <mask id="moon-mask">
          <rect width="24" height="24" fill="white" />
          <circle className="theme-toggle__cut" cx="17" cy="7" r="6" fill="black" />
        </mask>
        <circle className="theme-toggle__core" cx="12" cy="12" r="5.5" mask="url(#moon-mask)" fill="currentColor" />
        <g className="theme-toggle__rays" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2
            return <line key={i} x1={12 + Math.cos(a) * 8.5} y1={12 + Math.sin(a) * 8.5} x2={12 + Math.cos(a) * 10.5} y2={12 + Math.sin(a) * 10.5} />
          })}
        </g>
      </svg>
    </button>
  )
}

/* ---------------------------------------------------------------- Nav */

export function Nav() {
  const active = useUI((s) => s.active)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const links = sections.filter((s) => s.id !== 'hero')

  useEffect(() => {
    const on = () => setScrolled(scrollY > 40)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <a href="#hero" className="nav__logo" onClick={go('hero')} data-cursor="Home" aria-label="Back to top">
        <span className="nav__mark" aria-hidden>
          <i />
        </span>
        <span className="nav__initials">{profile.initials}</span>
      </a>
      <nav aria-label="Sections">
        <ul className="nav__links">
          {links.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} onClick={go(s.id)} className={active === s.id ? 'is-active' : ''} aria-current={active === s.id ? 'true' : undefined}>
                <span className="mono">{s.short}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="nav__actions">
        <ThemeToggle />
        <Magnetic strength={0.25}>
          <a className="btn btn--small" href={profile.resume} target="_blank" rel="noreferrer" data-cursor="PDF">
            Résumé
          </a>
        </Magnetic>
        <button className="nav__burger" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menu">
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

/* ---------------------------------------------------------------- Progress rail + HUD */

/** Light travel time from the Sun at a fractional station (log-interpolated). */
function lightAt(station: number) {
  const i = Math.min(sections.length - 2, Math.max(0, Math.floor(station)))
  const f = Math.min(1, Math.max(0, station - i))
  const a = Math.max(1, sections[i].light)
  const b = sections[i + 1].light
  if (i === 0) return b * f * f
  return Math.exp(Math.log(a) + (Math.log(b) - Math.log(a)) * f)
}

const YEAR = 31557600
function formatLight(s: number) {
  if (s >= YEAR) return `${Math.round(s / YEAR).toLocaleString('en-US')} yr`
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = Math.floor(s % 60)
  const hms = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  return d ? `${d}d ${hms}` : hms
}

export function Rail() {
  const active = useUI((s) => s.active)
  const fill = useRef<HTMLDivElement>(null)
  const photon = useRef<HTMLSpanElement>(null)
  const hud = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let raf = 0
    const loop = () => {
      const p = motion.station / (sections.length - 1)
      if (fill.current) fill.current.style.transform = `scaleY(${p})`
      if (photon.current) photon.current.style.top = `${p * 100}%`
      if (hud.current) {
        const near = sections[Math.min(sections.length - 1, Math.round(motion.station))]
        hud.current.textContent = `☀ light · t+ ${formatLight(lightAt(motion.station))} · ${near.waypoint}`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  const idx = sections.findIndex((s) => s.id === active)
  return (
    <>
      <nav className="rail" aria-label="Journey progress">
        <div className="rail__track">
          <div ref={fill} className="rail__fill" />
          <span ref={photon} className="rail__photon" />
        </div>
        <span className="rail__sun" aria-hidden />
        {sections.map((s, i) => (
          <button key={s.id} className={`rail__stop ${i <= idx ? 'is-past' : ''} ${s.id === active ? 'is-active' : ''}`} onClick={() => scrollToId(s.id)} aria-label={s.label} data-cursor={s.label}>
            <i />
            <span className="mono">{s.label}</span>
          </button>
        ))}
      </nav>
      <div className="hud mono" aria-hidden>
        <span className="hud__dot" />
        <span>
          {String(idx).padStart(2, '0')}/{String(sections.length - 1).padStart(2, '0')} {sections[idx]?.label.toUpperCase()}
        </span>
        <span ref={hud} className="hud__coords" />
      </div>
    </>
  )
}
