import { create } from 'zustand'
import type { SectionId } from '../data/content'

export type Theme = 'dark' | 'light'
export type DeskItem = 'laptop' | 'books' | 'trophy' | 'mug' | 'plant'

const initialTheme = (): Theme =>
  (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

interface UIState {
  theme: Theme
  setTheme: (t: Theme) => void
  ready: boolean
  setReady: (v: boolean) => void
  active: SectionId
  setActive: (id: SectionId) => void
  cursorLabel: string | null
  setCursorLabel: (l: string | null) => void
  desk: DeskItem | null
  setDesk: (d: DeskItem | null) => void
  lowPower: boolean
  setLowPower: (v: boolean) => void
}

export const useUI = create<UIState>((set) => ({
  theme: initialTheme(),
  setTheme: (theme) => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#05060f' : '#eef0f7')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage unavailable */
    }
    set({ theme })
  },
  ready: false,
  setReady: (ready) => set({ ready }),
  active: 'hero',
  setActive: (active) => set({ active }),
  cursorLabel: null,
  setCursorLabel: (cursorLabel) => set({ cursorLabel }),
  desk: null,
  setDesk: (desk) => set({ desk }),
  lowPower: false,
  setLowPower: (lowPower) => set({ lowPower }),
}))

/**
 * High-frequency values (scroll, pointer) live outside React so that the
 * 60fps render loop can read them without triggering re-renders.
 */
export const motion = {
  y: 0,
  velocity: 0,
  station: 0, // float: 0 = hero … 9 = contact
  mouse: { x: 0, y: 0 }, // normalised -1..1
  themeMix: initialTheme() === 'light' ? 1 : 0, // damped 0 (dark) → 1 (light)
  canvasReady: false,
  reduced: typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches,
}
