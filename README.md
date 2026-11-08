# Komma Rohith Vijay — 3D Portfolio

A scroll-driven 3D journey through ten "stations", each a custom WebGL scene built for one part of the story. A ray of light leaves the galaxy's core after the intro and leads the camera through every station, passing the planets of our solar system (each lights up as the ray reaches it) before ending in the contact wormhole.

| # | Section | 3D scene | Style |
|---|---------|----------|-------|
| 00 | Launch (hero) | 45k-star spiral galaxy; the light ray is born in its core | Cosmic |
| 01 | Academics | Procedural gas giant + rings + 3 moons (CGPA / XII / X), ring gauges | Cosmic |
| 02 | Trust | Holographic server rack, scanning ring, data stream, neon grid; leadership, responsibilities, volunteer form, impact log | Cyber |
| 03 | Projects | ByteVault architecture as a live constellation; featured KVG Trust Platform + 4 project cards | Cyber |
| 04 | Skills | Floating iridescent glass forms with glowing cores, spotlight cards, marquee | Minimal premium |
| 05 | Workspace | Interactive desk — click laptop / books / plant / trophy / mug to open panels | 3D room |
| 06 | Achievements | Crystal orbited by **155 shards = 155 solved LeetCode problems**; olympiads, certifications | Cosmic |
| 07 | Interests | Voyager-style probe; five equal interest cards (space, chess, cricket, reading, service) | Cosmic |
| 08 | Inspirations | The Milky Way with a "you are here" marker (page content coming soon) | Cosmic |
| 09 | Contact | Wormhole tunnel where the ray ends | Cosmic |

Between stations: Mercury → Neptune (`three/Planets.tsx`), lit by the ray (`three/Ray.tsx`). The HUD shows the light's travel time from the Sun and the last planet passed.

Plus: dark "Cosmos" / light "Aurora" themes with a circular View-Transition reveal (3D shaders crossfade too), loader, magnetic buttons, custom cursor with context labels, scramble/glitch text, holographic tilt cards, count-up stats, progress rail + HUD, smooth scrolling (Lenis), bloom / chromatic aberration (velocity-reactive) / grain, adaptive quality (PerformanceMonitor), reduced-motion support and a CSS fallback when WebGL is unavailable.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the build
```

## Edit your content

Everything you say lives in **`src/data/content.ts`** — profile, links, education, trust, projects, skills, achievements, interests, inspirations. Change it there; no component edits needed. The résumé PDF is `public/Komma_Rohith_Vijay_Resume.pdf`.

## Structure

```
src/
  data/content.ts        all text & numbers
  lib/store.ts           UI state (zustand) + per-frame motion values
  lib/scroll.ts          Lenis + scroll → camera-station mapping
  three/Experience.tsx   Canvas, camera rig, lighting, post-processing
  three/*.tsx            one file per station scene (+ SkyDome, Dust)
  components/            fx (scramble, counter, tilt, magnetic, gauge), chrome (loader, nav, cursor, rail)
  sections/Sections.tsx  the HTML sections + desk panel
  styles.css             design tokens, both themes, responsive layout
  journey.css            light-ray motif, trust, projects grid, olympiads, interests, inspirations
```

Note: with @react-three/fiber v9, pass shader uniforms via `args={[{ uniforms }]}` (as done here) — the `uniforms` prop is copied, so per-frame updates to your own object would not reach the material.

## Deploy

`dist/` is fully static (relative `base: './'`), so it works on GitHub Pages, Netlify, Vercel or Cloudflare Pages: build command `npm run build`, output directory `dist`.
