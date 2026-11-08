import { useEffect, useRef, useState } from 'react'
import { achievements, education, inspirations, interests, profile, projects, skills, trust, type Project } from '../data/content'
import { useUI, type DeskItem } from '../lib/store'
import { scrollToId, stopScroll } from '../lib/scroll'
import { Arrow, Counter, Gauge, Magnetic, Rotator, Scramble, SectionHead, Tilt } from '../components/fx'

/* =============================================================== HERO */

export function Hero() {
  const ready = useUI((s) => s.ready)
  const first = 'Komma Rohith'
  const last = 'Vijay'
  const letters = (word: string, offset: number) =>
    word.split('').map((ch, i) => (
      <span key={i} className="char" style={{ ['--i' as string]: i + offset }}>
        {ch === ' ' ? ' ' : ch}
      </span>
    ))
  return (
    <section id="hero" className={`section hero ${ready ? 'is-ready' : ''}`} aria-label="Introduction">
      <div className="hero__inner">
        <p className="hero__meta mono">
          <span className="pulse-dot" /> {ready && <Scramble text={`PORTFOLIO · ${profile.location.toUpperCase()} · 2026`} delay={500} />}
        </p>
        <h1 className="hero__name" aria-label={profile.name}>
          <span className="hero__line" aria-hidden>
            {letters(first, 0)}
          </span>
          <span className="hero__line hero__line--accent" aria-hidden>
            {letters(last, first.length)}
          </span>
        </h1>
        <p className="hero__role">
          <span className="muted">I am a </span>
          {ready ? <Rotator words={profile.roles} /> : <span className="rotator">{profile.roles[0]}</span>}
        </p>
        <p className="hero__tag">{profile.tagline}</p>
        <div className="hero__cta">
          <Magnetic>
            <button className="btn btn--primary" onClick={() => scrollToId('about')} data-cursor="Fly">
              Start the journey <Arrow dir="down" />
            </button>
          </Magnetic>
          <Magnetic>
            <a className="btn btn--ghost" href={profile.resume} target="_blank" rel="noreferrer" data-cursor="PDF">
              Download résumé <Arrow />
            </a>
          </Magnetic>
        </div>
        <p className="hero__status">
          <span className="status-chip">
            <span className="pulse-dot pulse-dot--green" /> Currently · {profile.current}
          </span>
        </p>
      </div>
      <div className="scroll-hint mono" aria-hidden>
        <span>scroll to fly</span>
        <i />
      </div>
    </section>
  )
}

/* =============================================================== ACADEMICS */

export function About() {
  const [cgpa, xii, x] = education.stats
  return (
    <section id="about" className="section section--left">
      <div className="col">
        <SectionHead index="01" kicker="Academics" title="Orbiting the fundamentals" />
        <div className="glass card" data-reveal>
          <div className="edu__top">
            <div>
              <p className="eyebrow mono">{education.graduation}</p>
              <h3 className="card__title">{education.school}</h3>
              <p className="muted">{education.degree}</p>
            </div>
            <div className="edu__badges">
              <span className="badge badge--cyan">✦ {education.specialisation}</span>
              <span className="badge badge--magenta">◆ {education.honors}</span>
            </div>
          </div>
          <div className="gauges">
            <Gauge value={cgpa.value} max={10} label={cgpa.label} color="var(--cyan)">
              <Counter value={cgpa.value} decimals={2} />
              <small>/10</small>
            </Gauge>
            <Gauge value={xii.value} max={100} label={xii.label} color="var(--magenta)">
              <Counter value={xii.value} suffix="%" />
            </Gauge>
            <Gauge value={x.value} max={100} label={x.label} color="var(--amber)">
              <Counter value={x.value} suffix="%" />
            </Gauge>
          </div>
          <p className="eyebrow mono">Core coursework</p>
          <ul className="chips">
            {education.coursework.map((c, i) => (
              <li key={c} className="chip" style={{ ['--d' as string]: i }}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* =============================================================== EXPERIENCE */

export function Experience() {
  const t = trust
  const p = t.platform
  return (
    <section id="experience" className="section section--right section--tall">
      <div className="col col--wide">
        <SectionHead index="02" kicker="Leadership · Non-profit" title="Leadership & community service" />

        <div className="glass card trust" data-reveal>
          <div className="trust__head">
            <div className="trust__logo">
              <img src={t.logo} alt={`${t.name} logo`} width={112} height={112} loading="lazy" />
            </div>
            <div>
              <p className="eyebrow mono">
                {t.period} · {t.location}
              </p>
              <h3 className="card__title">{t.name}</h3>
              <p className="trust__role">
                <span className="badge badge--amber">◆ {t.role}</span>
              </p>
            </div>
          </div>
          {t.about.map((line) => (
            <p key={line} className="muted">
              {line}
            </p>
          ))}
          <div className="trust__stats">
            {t.stats.map((m) => (
              <div key={m.label}>
                <strong>
                  <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                </strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
          <div className="trust__cta">
            <Magnetic strength={0.25}>
              <a className="btn btn--primary btn--small" href={t.volunteerForm} target="_blank" rel="noreferrer" data-cursor="Join">
                Volunteer with us <Arrow />
              </a>
            </Magnetic>
            <a className="btn btn--ghost btn--small" href={t.site} target="_blank" rel="noreferrer" data-cursor="Visit">
              Visit the trust <Arrow />
            </a>
          </div>
          <p className="tiny muted mono">↳ volunteer registration designed and managed by me</p>
        </div>

        <p className="eyebrow mono">Key responsibilities</p>
        <ul className="hats" aria-label="Responsibilities as Vice President">
          {t.responsibilities.map((h, i) => (
            <li key={h.title} className="hat glass" data-reveal style={{ ['--d' as string]: i }}>
              <span className="hat__icon" aria-hidden>
                {h.icon}
              </span>
              <span>
                <strong>{h.title}</strong>
                <span className="muted small">{h.text}</span>
              </span>
            </li>
          ))}
        </ul>

        <p className="eyebrow mono">Technology & Platform · impact log</p>
        <div className="terminal glass" data-reveal>
          <div className="terminal__bar">
            <span className="terminal__dots" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <span className="mono terminal__path">rohith@kvg-trust:~/platform</span>
            <a className="live mono" href={t.site} target="_blank" rel="noreferrer" data-cursor="Visit">
              <span className="pulse-dot pulse-dot--green" /> live
            </a>
          </div>
          <div className="terminal__body mono">
            <p className="cmd">
              <span className="prompt">$</span> cat impact.log
            </p>
            <ul className="log">
              {p.log.map((l, i) => (
                <li key={i} data-reveal style={{ ['--d' as string]: i }}>
                  <span className="log__ok">[ OK ]</span> {l}
                </li>
              ))}
            </ul>
            <p className="cmd">
              <span className="prompt">$</span> <span className="caret" />
            </p>
          </div>
        </div>
        <div className="metrics metrics--4" data-reveal>
          {p.metrics.map((m) => (
            <div key={m.label} className="metric glass">
              <span className="metric__value">
                <Counter value={m.value} prefix={m.prefix} />
              </span>
              <span className="metric__label">{m.label}</span>
            </div>
          ))}
        </div>
        <button className="link-more mono" onClick={() => scrollToId('projects')} data-cursor="View">
          Full architecture & stack in Projects <Arrow dir="right" />
        </button>
      </div>
    </section>
  )
}

/* =============================================================== PROJECTS */

function Flow({ items, label, variant = '' }: { items: string[]; label: string; variant?: string }) {
  return (
    <div className={`flow ${variant}`} aria-label={label}>
      {items.map((n, i) => (
        <div key={n} className="flow__node">
          <span>{n}</span>
          {i < items.length - 1 && (
            <i className="flow__link" aria-hidden>
              <b />
            </i>
          )}
        </div>
      ))}
    </div>
  )
}

function StateMachine({ states }: { states: string[] }) {
  return (
    <ol className="states" aria-label="Loan lifecycle">
      {states.map((s, i) => (
        <li key={s} style={{ ['--i' as string]: i }}>
          <span>{s}</span>
        </li>
      ))}
    </ol>
  )
}

function LinkedList({ items }: { items: string[] }) {
  return (
    <div className="llist mono" aria-label="Bookings stored as a singly linked list">
      <span className="llist__head">head</span>
      {items.map((n, i) => (
        <span key={n} className="llist__node" style={{ ['--i' as string]: i }}>
          <b>{n}</b>
          <i>next</i>
        </span>
      ))}
      <span className="llist__null">NULL</span>
    </div>
  )
}

function ProjectViz({ p }: { p: Project }) {
  const { kind, items } = p.viz
  if (kind === 'states') return <StateMachine states={items} />
  if (kind === 'list') return <LinkedList items={items} />
  if (kind === 'roles') return <Flow items={items} variant="flow--roles" label={`Roles: ${items.join(', ')}`} />
  return <Flow items={items} label={items.join(' → ')} />
}

export function Projects() {
  return (
    <section id="projects" className="section section--center section--tall">
      <div className="col col--full">
        <SectionHead index="03" kicker="Projects" title="Systems I've engineered" />
        <div className="projects projects--grid">
          {projects.map((p, i) => (
            <Tilt key={p.name} className={`project project--${p.accent} ${p.featured ? 'project--featured' : ''}`} max={p.featured ? 3 : 6}>
              <article data-reveal>
                <header className="project__head">
                  <span className="mono eyebrow">
                    {String(i + 1).padStart(2, '0')} · {p.kicker}
                  </span>
                  <span className="badge">{p.team}</span>
                </header>
                <h3 className="project__name">
                  <Scramble text={p.name} trigger="hover" />
                </h3>
                <p className="project__desc">{p.description}</p>
                <ProjectViz p={p} />
                <ul className="project__highlights">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                {p.metrics && (
                  <div className="project__metrics">
                    {p.metrics.map((m) => (
                      <div key={m.label}>
                        <strong>{m.text ? m.text : <Counter value={m.value} />}</strong>
                        <span>{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                <footer className="project__foot">
                  <ul className="chips chips--small">
                    {p.stack.map((s) => (
                      <li key={s} className="chip chip--mono">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="project__links">
                    {p.demo && (
                      <a className="btn btn--primary btn--small" href={p.demo} target="_blank" rel="noreferrer" data-cursor="Demo">
                        {p.demoLabel ?? 'Live demo'} <Arrow />
                      </a>
                    )}
                    {p.href && (
                      <a className="btn btn--ghost btn--small" href={p.href} target="_blank" rel="noreferrer" data-cursor="Code">
                        GitHub <Arrow />
                      </a>
                    )}
                  </div>
                </footer>
              </article>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =============================================================== SKILLS */

export function Skills() {
  const all = skills.flatMap((s) => s.items)
  const half = Math.ceil(all.length / 2)
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--sx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--sy', `${e.clientY - r.top}px`)
  }
  return (
    <section id="skills" className="section section--center">
      <div className="col col--full">
        <SectionHead index="04" kicker="Skills" title="The toolkit" align="center" />
        <div className="skills-grid">
          {skills.map((g, i) => (
            <div key={g.group} className="skill-card glass" data-reveal style={{ ['--d' as string]: i }} onPointerMove={onMove}>
              <div className="skill-card__head">
                <span className="skill-card__icon" aria-hidden>
                  {g.icon}
                </span>
                <h3>{g.group}</h3>
                <span className="mono muted">{String(g.items.length).padStart(2, '0')}</span>
              </div>
              <ul className="chips chips--small">
                {g.items.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="marquees" aria-hidden>
        {[all.slice(0, half), all.slice(half)].map((row, r) => (
          <div key={r} className={`marquee ${r ? 'marquee--rev' : ''}`}>
            <div className="marquee__track">
              {[...row, ...row].map((s, i) => (
                <span key={i}>
                  {s} <i>✦</i>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* =============================================================== WORKSPACE */

const deskItems: { id: DeskItem; icon: string; label: string }[] = [
  { id: 'laptop', icon: '💻', label: 'Laptop · Projects' },
  { id: 'books', icon: '📚', label: 'Books · Academics' },
  { id: 'plant', icon: '🌱', label: 'Plant · Experience' },
  { id: 'trophy', icon: '🏆', label: 'Trophy · Achievements' },
  { id: 'mug', icon: '☕', label: 'Coffee · Contact' },
]

export function Workspace() {
  const setDesk = useUI((s) => s.setDesk)
  return (
    <section id="workspace" className="section section--center section--desk">
      <div className="col col--full">
        <SectionHead index="05" kicker="Interactive workspace" title="Step into my desk" align="center" />
        <p className="lead center" data-reveal>
          Hover over the objects on the desk and click to open them — or use the shortcuts below.
        </p>
        <div className="desk-chips" data-reveal>
          {deskItems.map((d) => (
            <button key={d.id} className="chip chip--button" onClick={() => setDesk(d.id)}>
              <span aria-hidden>{d.icon}</span> {d.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export function DeskPanel() {
  const desk = useUI((s) => s.desk)
  const setDesk = useUI((s) => s.setDesk)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [shown, setShown] = useState<DeskItem | null>(null)

  useEffect(() => {
    if (desk) {
      setShown(desk)
      stopScroll(true)
      requestAnimationFrame(() => closeRef.current?.focus())
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDesk(null)
      addEventListener('keydown', onKey)
      return () => {
        removeEventListener('keydown', onKey)
        stopScroll(false)
      }
    }
  }, [desk, setDesk])

  const jump = (id: string) => {
    setDesk(null)
    setTimeout(() => scrollToId(id), 50)
  }

  const content: Record<DeskItem, { title: string; kicker: string; body: React.ReactNode; to: string }> = {
    laptop: {
      kicker: 'Open on screen',
      title: 'Projects',
      to: 'projects',
      body: (
        <ul className="panel-list">
          {projects.map((p) => (
            <li key={p.name}>
              <strong>{p.name}</strong> — {p.description}
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer">
                  Live demo <Arrow />
                </a>
              )}
              {p.href && (
                <a href={p.href} target="_blank" rel="noreferrer">
                  GitHub <Arrow />
                </a>
              )}
            </li>
          ))}
        </ul>
      ),
    },
    books: {
      kicker: 'Bookshelf',
      title: 'Academics',
      to: 'about',
      body: (
        <>
          <p>
            <strong>{education.school}</strong> — {education.degree}, {education.specialisation}, {education.honors}.
          </p>
          <p className="muted">
            CGPA 9.55 / 10 · Class XII 93% · Class X 95% · {education.graduation}
          </p>
        </>
      ),
    },
    plant: {
      kicker: 'Growing things',
      title: 'The Trust',
      to: 'experience',
      body: (
        <>
          <p>
            <strong>{trust.role}</strong> at {trust.name}.
          </p>
          <p className="muted">{trust.responsibilities.map((h) => h.title).join(' · ')}</p>
          <p>
            <a href={trust.volunteerForm} target="_blank" rel="noreferrer">
              Volunteer with us <Arrow />
            </a>
          </p>
        </>
      ),
    },
    trophy: {
      kicker: 'Trophy shelf',
      title: 'Achievements',
      to: 'achievements',
      body: (
        <ul className="panel-list">
          <li>
            <strong>LeetCode</strong> — {achievements.leetcode.solved} solved ({achievements.leetcode.medium} medium, {achievements.leetcode.hard} hard)
          </li>
          <li>
            <strong>{achievements.hackathon.title}</strong> — {achievements.hackathon.detail}
          </li>
          {achievements.olympiads.map((o) => (
            <li key={o.short}>
              <strong>{o.short}</strong> — {o.result}, {o.name}
            </li>
          ))}
          <li>
            <strong>{achievements.science.short}</strong> — State rank {achievements.science.state}, national rank {achievements.science.national}
          </li>
          {achievements.certifications.map((c) => (
            <li key={c.name}>
              <strong>{c.name}</strong> — {c.issuer}
            </li>
          ))}
        </ul>
      ),
    },
    mug: {
      kicker: 'Grab a coffee',
      title: "Let's talk",
      to: 'contact',
      body: (
        <ul className="panel-list">
          <li>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          {profile.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer">
                {l.label} <Arrow />
              </a>
            </li>
          ))}
        </ul>
      ),
    },
  }

  const c = shown ? content[shown] : null
  return (
    <div className={`panel-backdrop ${desk ? 'is-open' : ''}`} onClick={() => setDesk(null)} aria-hidden={!desk} onTransitionEnd={() => !desk && setShown(null)}>
      {c && (
        <div className="panel glass" role="dialog" aria-modal="true" aria-labelledby="panel-title" onClick={(e) => e.stopPropagation()}>
          <button ref={closeRef} className="panel__close" onClick={() => setDesk(null)} aria-label="Close">
            ✕
          </button>
          <p className="eyebrow mono">{c.kicker}</p>
          <h3 id="panel-title" className="panel__title">
            {c.title}
          </h3>
          <div className="panel__body">{c.body}</div>
          <button className="btn btn--primary btn--small" onClick={() => jump(c.to)}>
            Go to section <Arrow dir="right" />
          </button>
        </div>
      )}
    </div>
  )
}

/* =============================================================== ACHIEVEMENTS */

export function Achievements() {
  const lc = achievements.leetcode
  const easy = lc.solved - lc.medium - lc.hard
  const h = achievements.hackathon
  const pctTop = (h.qualifiers / h.participants) * 100
  return (
    <section id="achievements" className="section section--left">
      <div className="col">
        <SectionHead index="06" kicker="Achievements" title="Signal over noise" />
        <div className="ach-grid">
          <Tilt className="glass card leet" max={5}>
            <div data-reveal>
              <p className="eyebrow mono">LeetCode</p>
              <p className="big-number">
                <Counter value={lc.solved} />
                <small>problems solved</small>
              </p>
              <div className="difficulty" role="img" aria-label={`${easy} easy, ${lc.medium} medium, ${lc.hard} hard`}>
                <span style={{ flexGrow: easy }} className="d-easy" />
                <span style={{ flexGrow: lc.medium }} className="d-med" />
                <span style={{ flexGrow: lc.hard }} className="d-hard" />
              </div>
              <div className="difficulty__legend mono">
                <span>
                  <i className="d-easy" /> Easy {easy}
                </span>
                <span>
                  <i className="d-med" /> Medium {lc.medium}
                </span>
                <span>
                  <i className="d-hard" /> Hard {lc.hard}
                </span>
              </div>
              <p className="muted small">
                {lc.java} solved in Java · <span className="badge badge--amber">🔥 {lc.badge}</span>
              </p>
              <p className="tiny muted mono">↳ each shard orbiting the crystal is one solved problem</p>
            </div>
          </Tilt>
          <Tilt className="glass card hack" max={5}>
            <div data-reveal>
              <p className="eyebrow mono">Hackathon</p>
              <h3 className="card__title">{h.title}</h3>
              <p className="muted">{h.detail}</p>
              <div className="dots" role="img" aria-label={`Top ${pctTop.toFixed(0)} percent of participants`}>
                {Array.from({ length: 50 }).map((_, i) => (
                  <i key={i} className={i === 0 ? 'on' : ''} />
                ))}
              </div>
              <p className="small">
                <strong className="grad-text">Top {pctTop.toFixed(0)}%</strong> <span className="muted">— 1 in every 50 entrants advanced</span>
              </p>
            </div>
          </Tilt>
        </div>
        <div className="glass card olympiads" data-reveal>
          <p className="eyebrow mono">Olympiads · school years</p>
          <div className="olympiads__row">
            {achievements.olympiads.map((o) => (
              <div key={o.short} className="medal" title={o.name}>
                <span className="medal__disc" aria-hidden>
                  <b>{o.short}</b>
                </span>
                <span>
                  <strong>{o.result}</strong>
                  <span className="muted small">{o.name}</span>
                </span>
              </div>
            ))}
            <div className="medal medal--rank" title={achievements.science.name}>
              <span className="medal__disc" aria-hidden>
                <b>{achievements.science.short}</b>
              </span>
              <span>
                <strong>
                  State <span className="grad-text">#{achievements.science.state}</span> · National{' '}
                  <span className="grad-text">#{achievements.science.national}</span>
                </strong>
                <span className="muted small">{achievements.science.name}</span>
              </span>
            </div>
          </div>
        </div>
        <ul className="certs" data-reveal>
          {achievements.certifications.map((c, i) => (
            <li key={c.name} className="cert glass" style={{ ['--d' as string]: i }}>
              <span className="cert__seal" aria-hidden>
                ✓
              </span>
              <span>
                <strong>{c.name}</strong>
                <span className="muted small">{c.issuer}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* =============================================================== INTERESTS */

export function Interests() {
  return (
    <section id="interests" className="section section--center">
      <div className="col col--full">
        <SectionHead index="07" kicker="Interests" title="Beyond the code" align="center" />
        <ul className="interest-grid">
          {interests.map((it, i) => (
            <li key={it.title} className="interest glass" data-reveal style={{ ['--d' as string]: i }}>
              <span className="interest__icon" aria-hidden>
                {it.icon}
              </span>
              <h3 className="interest__title">{it.title}</h3>
              <p className="muted small">{it.text}</p>
              <div className="interest__foot">
                {it.tags && (
                  <ul className="chips chips--small">
                    {it.tags.map((t) => (
                      <li key={t} className="chip chip--mono">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
                {it.actions?.map((a, j) => (
                  <a key={a.href} className={`btn btn--small ${j === 0 ? 'btn--primary' : 'btn--ghost'}`} href={a.href} target="_blank" rel="noreferrer" data-cursor="Open">
                    {a.label} <Arrow />
                  </a>
                ))}
                {it.to && (
                  <button className="btn btn--ghost btn--small" onClick={() => scrollToId(it.to!)} data-cursor="View">
                    See the trust <Arrow dir="right" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* =============================================================== INSPIRATIONS */

export function Inspirations() {
  return (
    <section id="inspirations" className="section section--left">
      <div className="col">
        <SectionHead index="08" kicker="Inspirations" title={inspirations.title} />
        <div className="glass card soon" data-reveal>
          <span className="badge badge--cyan">✦ Coming soon</span>
          <p className="muted">{inspirations.text}</p>
          <div className="soon__frames" aria-hidden>
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    </section>
  )
}

/* =============================================================== CONTACT */

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      location.href = `mailto:${profile.email}`
    }
  }
  return (
    <section id="contact" className="section section--center contact">
      <div className="col col--full">
        <p className="kicker mono center" data-reveal>
          <span className="kicker__index">09</span>
          <span className="kicker__line" />
          <Scramble text="CONTACT" trigger="view" />
        </p>
        <h2 className="contact__title" data-reveal>
          Let’s build something
          <br />
          <span className="grad-text">that scales.</span>
        </h2>
        <p className="lead center" data-reveal>
          Open to backend / platform internships and collaborations. My inbox is always open.
        </p>
        <div className="contact__cta" data-reveal>
          <Magnetic strength={0.3}>
            <a className="btn btn--primary btn--huge" href={`mailto:${profile.email}`} data-cursor="Write">
              {profile.email}
            </a>
          </Magnetic>
          <button className="btn btn--ghost" onClick={copy} aria-live="polite">
            {copied ? 'Copied ✓' : 'Copy email'}
          </button>
        </div>
        <ul className="socials" data-reveal>
          {profile.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer" className="social glass" data-cursor="Open">
                <span className="mono muted small">{l.label}</span>
                <span>{l.handle}</span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
        <footer className="footer mono">
          <span>
            © 2026 {profile.name} · {profile.phone}
          </span>
          <span>Designed & engineered with React Three Fiber, GLSL shaders & Lenis</span>
          <button className="footer__top" onClick={() => scrollToId('hero')}>
            Back to launch ↑
          </button>
        </footer>
      </div>
    </section>
  )
}
