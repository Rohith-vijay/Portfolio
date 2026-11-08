import { Component, lazy, Suspense, useEffect, type ReactNode } from 'react'
import { sections, type SectionId } from './data/content'
import { initScroll } from './lib/scroll'
import { motion, useUI } from './lib/store'
import { Cursor, Loader, Nav, Rail } from './components/Chrome'
import { About, Achievements, Contact, DeskPanel, Experience, Hero, Inspirations, Interests, Projects, Skills, Workspace } from './sections/Sections'

const Scene = lazy(() => import('./three/Experience'))

/** If WebGL is unavailable the site still works, on an animated CSS backdrop. */
class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    motion.canvasReady = true
  }
  render() {
    return this.state.failed ? <div className="webgl webgl--fallback" aria-hidden /> : this.props.children
  }
}

function useGlobalEffects() {
  const setActive = useUI((s) => s.setActive)

  useEffect(() => initScroll(), [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      motion.mouse.x = (e.clientX / innerWidth) * 2 - 1
      motion.mouse.y = -((e.clientY / innerHeight) * 2 - 1)
    }
    addEventListener('pointermove', onMove, { passive: true })
    return () => removeEventListener('pointermove', onMove)
  }, [])

  // Reveal-on-scroll for every [data-reveal] element.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    // Also catch elements rendered later (hot reloads, conditional content),
    // otherwise they would stay hidden forever.
    const scan = () => document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
    scan()
    const root = document.querySelector('.content')
    const mo = new MutationObserver(scan)
    if (root) mo.observe(root, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  // Active section = the one crossing the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as SectionId)
        }),
      { rootMargin: '-45% 0px -54% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [setActive])
}

export default function App() {
  useGlobalEffects()
  const ready = useUI((s) => s.ready)
  return (
    <>
      <WebGLBoundary>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </WebGLBoundary>
      <div className="grain" aria-hidden />
      <Loader />
      <Cursor />
      <div className={`chrome ${ready ? 'is-ready' : ''}`}>
        <Nav />
        <Rail />
      </div>
      <main className="content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Workspace />
        <Achievements />
        <Interests />
        <Inspirations />
        <Contact />
      </main>
      <DeskPanel />
    </>
  )
}
