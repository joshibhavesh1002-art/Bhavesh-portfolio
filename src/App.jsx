import { Fragment, Suspense, lazy, useEffect, useRef, useState } from 'react'
import { ArrowUp, ArrowUpRight, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, Star, X, Home, User, Briefcase, Code2, Palette, Braces, Atom, Wind, FileCode2, Terminal, Zap, Database, Table2, GitBranch, Box, BarChart3, Sparkles, Award, Trophy, GraduationCap, ChevronLeft, ChevronRight, FileText, ZoomIn } from 'lucide-react'
import DotField from './components/DotField.jsx'
import { profile as P, story, about, journey, skills, projects, exploring, steps, certificates } from './data.js'

const SI = { HTML: Code2, CSS: Palette, JavaScript: Braces, React: Atom, 'Tailwind CSS': Wind, PHP: FileCode2, Python: Terminal, FastAPI: Zap, MySQL: Database, phpMyAdmin: Table2, 'VS Code': Code2, Git: GitBranch, GitHub: Github, Vite: Zap, 'Three.js': Box, 'Chart.js': BarChart3 }
const NAV = [['Home', 'home'], ['About', 'about'], ['Expertise', 'expertise'], ['Journey', 'journey'], ['Projects', 'projects'], ...(certificates.length ? [['Certificates', 'certificates']] : []), ['Insights', 'insights'], ['Contact', 'contact']]
const SEC = n => String(n + (certificates.length ? 1 : 0)).padStart(2, '0') // section numbers shift by one when Certificates is shown
const GH = P.githubUser && `https://github.com/${P.githubUser}`
const pad = n => String(n + 1).padStart(2, '0')
const ROMAN = ['I', 'II', 'III', 'IV']
const btn = 'group inline-flex items-center gap-2 rounded-none px-7 py-4 text-[11px] font-semibold tracking-[.2em] uppercase transition-[translate,background,border-color,box-shadow,scale] duration-300 ease-out active:scale-95'
const solid = `${btn} bg-fg text-ink hover:bg-acc hover:shadow-[0_12px_30px_-14px_#4B9EFF]`
const line = `${btn} border border-white/15 hover:border-cy/60 hover:bg-white/5`
const arrow = 'transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'

const tilt = d => e => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const el = e.currentTarget, b = el.getBoundingClientRect()
  el.style.transform = `perspective(1000px) rotateY(${((e.clientX - b.left) / b.width - .5) * d}deg) rotateX(${-((e.clientY - b.top) / b.height - .5) * d}deg)`
}
const untilt = e => { e.currentTarget.style.transform = '' }
// FX: Scramble Text (letters shuffle, then resolve)
const scramble = e => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const el = e.currentTarget, t = el.dataset.t || (el.dataset.t = el.textContent)
  let i = 0; clearInterval(el._i)
  el._i = setInterval(() => { el.textContent = [...t].map((c, k) => k < i ? c : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#/<>'[Math.random() * 30 | 0]).join(''); if (++i > t.length) { clearInterval(el._i); el.textContent = t } }, 35)
}

function useFx() {
  useEffect(() => {
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    const $ = id => document.getElementById(id)
    const glow = $('glow'), ring = $('ring'), bar = $('bar')
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf
    const move = e => {
      mx = e.clientX; my = e.clientY
      glow.style.setProperty('--cx', mx + 'px'); glow.style.setProperty('--cy', my + 'px')
      const c = e.target.closest?.('.card')
      if (c) { const b = c.getBoundingClientRect(); c.style.setProperty('--mx', mx - b.left + 'px'); c.style.setProperty('--my', my - b.top + 'px') }
      const m = e.target.closest?.('[data-mag]')
      if (m && !calm) { const b = m.getBoundingClientRect(); m.style.translate = `${(mx - b.left - b.width / 2) * .3}px ${(my - b.top - b.height / 2) * .4}px` }
      const k = e.target.closest?.('[data-cursor],a,button,input,textarea')
      ring.dataset.k = k ? k.dataset.cursor || 'link' : ''
    }
    const out = e => { const m = e.target.closest?.('[data-mag]'); if (m && !m.contains(e.relatedTarget)) m.style.translate = '' }
    const loop = () => { rx += (mx - rx) * .16; ry += (my - ry) * .16; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; raf = requestAnimationFrame(loop) }
    let q = 0; const paint = () => { q = 0; bar.style.transform = `scaleX(${scrollY / (document.documentElement.scrollHeight - innerHeight || 1)})` }
    const scroll = () => { q = q || requestAnimationFrame(paint) }
    addEventListener('mousemove', move); addEventListener('mouseout', out); addEventListener('scroll', scroll, { passive: true })
    if (!calm && matchMedia('(hover:hover) and (pointer:fine)').matches) loop()
    return () => { cancelAnimationFrame(raf); removeEventListener('mousemove', move); removeEventListener('mouseout', out); removeEventListener('scroll', scroll) }
  }, [])
}

function Reveal({ children, className = '', delay = 0 }) {
  const r = useRef(null)
  useEffect(() => {
    const el = r.current
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={r} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${className}`}>{children}</div>
}

const Words = ({ t, base = 0 }) => t.split(' ').map((w, i) => <span key={i} className="w mr-[.25em]"><i style={{ '--d': `${base + i * 80}ms` }}>{w}</i></span>)

const Section = ({ id, no, title, children }) => (
  <section id={id} className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
    <Reveal className="mb-14 border-t border-white/[.07] pt-5">
      <p className="mb-5 font-mono text-xs text-cy">{no}</p>
      <h2 className="font-serif text-5xl leading-[1.02] font-light sm:text-7xl lg:text-8xl">{title}</h2>
    </Reveal>
    {children}
  </section>
)

const Soc = ({ href, icon: I, label, mail }) => href && (
  <a href={href} {...(!mail && { target: '_blank', rel: 'noreferrer' })} className="ul flex w-fit items-center gap-2 py-2 text-sm break-all text-mute hover:text-fg"><I size={16} />{label}</a>
)

function Nav() {
  const [open, setOpen] = useState(false), [on, setOn] = useState('home'), [sc, setSc] = useState(false)
  useEffect(() => {
    const s = () => setSc(scrollY > 40), k = e => e.key === 'Escape' && setOpen(false); s(); addEventListener('scroll', s, { passive: true }); addEventListener('keydown', k)
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setOn(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(([, id]) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => { removeEventListener('scroll', s); removeEventListener('keydown', k); io.disconnect() }
  }, [])
  const link = ([l, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} data-on={on === id} onMouseEnter={scramble} className={`ul text-[11px] tracking-[.18em] text-mute uppercase hover:text-fg data-[on=true]:text-fg data-[on=true]:[background-size:100%_1px] ${id === 'certificates' ? 'md:max-lg:hidden' : ''}`}>{l}</a>
  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${sc || open ? 'border-white/[.07] bg-ink/90 backdrop-blur-sm' : 'border-transparent'}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6" aria-label="Main">
        <a data-mag href="#home" className="group flex items-center gap-3 py-2 font-serif text-lg font-semibold"><img src="/logo.svg" alt="BJ monogram" width="32" height="32" className="transition-transform duration-700 group-hover:rotate-[360deg]" />{P.name}</a>
        <div className="hidden items-center gap-8 md:flex">{NAV.slice(1).map(link)}</div>
        <button className="-mr-2 grid h-11 w-11 place-items-center md:hidden" aria-label="Toggle menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      <div className={`grid transition-[grid-template-rows] duration-500 md:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div id="mobile-menu" inert={open ? undefined : ''} className="flex flex-col gap-1 overflow-hidden px-6 [&>a]:py-2.5 [&>a]:text-lg">{NAV.map(link)}<span className="pb-4" /></div>
      </div>
    </header>
  )
}

const Gears = lazy(() => import('./components/Gears.jsx'))
function Hero() {
  const [h, setH] = useState(-1), [a, setA] = useState(-1), cur = h >= 0 ? h : a
  return (
    <section id="home" className="relative mx-auto grid min-h-svh max-w-7xl items-center gap-8 px-6 pt-28 pb-20 lg:grid-cols-12">
      <div className="min-w-0 lg:col-span-6">
        <p className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-mute"><span className="h-px w-10 bg-cy/60" />Portfolio &middot; {P.location}{P.availability && <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cy" />{P.availability}</span>}</p>
        <h1 className="font-serif text-[clamp(2.4rem,4.7vw,4.9rem)] leading-[.95] tracking-tight"><Words t="Engineering Ideas Into" base={900} /><br /><span className="text-cy italic"><Words t="Beautiful Digital Experiences." base={1250} /></span></h1>
        <p className="mt-8 max-w-lg leading-relaxed text-mute"><span className="font-serif text-2xl text-fg italic">Bhavesh Joshi</span> &mdash; software developer and creative technologist, studying B.E. Information Technology in Gujarat. I turn ideas into functional, thoughtful and visually engaging digital products.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a data-mag href="#projects" className={solid}>View My Work <ArrowUpRight size={15} className={arrow} /></a>
          <a data-mag href="#contact" className={line}>Let&apos;s Connect <ArrowUpRight size={15} className={arrow} /></a>
          {P.resume ? <a data-mag href={P.resume} download className={line}>Resume <Download size={15} /></a> : <span title="Set resume in src/data.js" className={`${line} cursor-not-allowed opacity-40`}>Resume <Download size={15} /></span>}
        </div>
      </div>
      <div className="min-w-0 lg:col-span-6">
        <div className="border border-white/[.08] p-2"><div className="relative h-[360px] border border-white/[.05] sm:h-[500px] lg:h-[560px]">
          <Suspense fallback={<div className="h-full" />}><Gears count={projects.length} active={a} onHover={setH} onPick={() => { location.hash = 'projects' }} /></Suspense>
          <p className="pointer-events-none absolute top-3 left-4 font-mono text-[11px] text-mute">The Workshop</p>
          <p className="pointer-events-none absolute bottom-3 left-4 font-serif text-2xl text-fg italic">{cur >= 0 ? `${ROMAN[cur]} \u2014 ${projects[cur].title}` : 'Four gears, four projects. Hover, tap or click one.'}</p>
        </div></div>
        <ul className="mt-4 grid grid-cols-2 gap-px border border-white/[.07] bg-white/[.07] sm:grid-cols-4">
          {projects.map((p, i) => <li key={p.title} className="bg-ink"><a href="#projects" onMouseEnter={() => setA(i)} onMouseLeave={() => setA(-1)} onFocus={() => setA(i)} onBlur={() => setA(-1)} className={`block px-4 py-3 text-xs transition-colors ${cur === i ? 'text-cy' : 'text-mute'}`}><span className="font-display text-sm italic">{ROMAN[i]}</span><br />{p.title}</a></li>)}
        </ul>
      </div>
    </section>
  )
}

function About() {
  const E = about.education
  const cards = [
    ['Education', E.degree, [E.college, E.year, E.cgpa].filter(Boolean).join(' / ') || 'Studying Information Technology while building real projects alongside.'],
    ['Interests', 'What pulls me in', about.interests.join(', ')],
    ['Philosophy', 'How I build', `${about.philosophy} Guided by ${about.values.join(', ').toLowerCase()}.`],
    ['Goal', 'Where I am headed', about.goal],
  ]
  return (
    <Section id="about" no="01 / About" title="Beyond the Screen.">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <div onMouseMove={tilt(8)} onMouseLeave={untilt} className="card grid aspect-[4/5] place-items-center overflow-hidden rounded-sm transition-transform duration-300 ease-out">
            {P.photo ? <img src={P.photo} alt={`Portrait of ${P.name}`} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : <span className="font-serif text-8xl text-acc/80 italic">BJ</span>}
          </div>
        </Reveal>
        <div className="space-y-14 lg:col-span-7 lg:col-start-6">
          <Reveal><blockquote className="border-l border-cy/60 pl-6 font-serif text-2xl leading-snug text-mute italic sm:text-3xl">&ldquo;{about.statement}&rdquo;</blockquote></Reveal>
          <Reveal><p className="lead font-serif text-3xl leading-snug sm:text-4xl">{story[0].split(' ').map((w, i) => <span key={i} className="wd">{w} </span>)}</p></Reveal>
          <Reveal className="space-y-5 leading-relaxed text-mute sm:columns-2 sm:gap-10 [&>p]:break-inside-avoid">{story.slice(1).map(t => <p key={t}>{t}</p>)}</Reveal>
          <Reveal className="grid gap-4 sm:grid-cols-2">
            {cards.map(([k, t, d]) => (
              <div key={k} tabIndex={0} aria-label={`${k}: ${d}`} className="flip h-44">
                <div className="flip-in relative h-full w-full">
                  <div className="face card absolute inset-0 flex flex-col justify-between p-6"><span className="font-mono text-[11px] text-cy">{k}</span><span className="font-serif text-3xl leading-tight">{t}</span></div>
                  <div className="face back card absolute inset-0 overflow-y-auto bg-surface p-6 text-sm text-mute">{d}</div>
                </div>
              </div>))}
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function Expertise() {
  const [g, setG] = useState(0)
  return (
    <Section id="expertise" no="02 / Expertise" title="What I work with">
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
        {skills.map((s, i) => <button key={s.group} role="tab" aria-selected={g === i} onClick={() => setG(i)} className={`rounded-none border px-5 py-3 text-[11px] tracking-[.16em] uppercase transition-colors duration-300 ${g === i ? 'border-acc bg-acc/10 text-fg' : 'border-white/10 text-mute hover:border-white/30 hover:text-fg'}`}>{s.group}</button>)}
      </div>
      <div key={g} className="pop grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills[g].items.map(([n, d]) => { const I = SI[n] || Sparkles; return (
          <div key={n} className="card group overflow-hidden rounded-sm p-6 transition-transform duration-300 hover:-translate-y-1"><span className="absolute inset-0 -z-10 translate-y-full bg-linear-to-t from-acc/20 to-transparent transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="mb-5 grid h-11 w-11 place-items-center rounded-full border border-white/10 transition-all duration-500 group-hover:border-cy/60"><I size={20} className="text-acc transition-transform duration-500 group-hover:scale-110 group-hover:text-cy" /></span>
            <h3 className="font-semibold">{n}</h3><p className="mt-1 text-sm text-mute">{d}</p>
          </div>) })}
      </div>
      <p className="mt-8 text-sm text-mute">No percentages on purpose: these are the tools I have used in projects and coursework, and I keep learning each of them.</p>
    </Section>
  )
}

function Journey() {
  const box = useRef(null), fill = useRef(null)
  useEffect(() => {
    const f = () => { const b = box.current.getBoundingClientRect(); fill.current.style.transform = `scaleY(${Math.min(1, Math.max(0, (innerHeight * .65 - b.top) / b.height))})` }
    let q = 0; const s = () => { q = q || requestAnimationFrame(() => { q = 0; f() }) }; f(); addEventListener('scroll', s, { passive: true })
    return () => removeEventListener('scroll', s)
  }, [])
  return (
    <Section id="journey" no="03 / Journey" title="The development story">
      <div ref={box} className="relative">
        <div className="absolute top-2 bottom-2 left-[6px] w-px bg-white/10 md:left-[12.5rem]" />
        <div ref={fill} className="absolute top-2 bottom-2 left-[6px] w-px origin-top bg-linear-to-b from-acc to-cy md:left-[12.5rem]" style={{ transform: 'scaleY(0)' }} />
        <ol className="space-y-14">
          {journey.map((m, i) => (
            <li key={m.title} className="relative pl-9 md:grid md:grid-cols-[11rem_1fr] md:gap-16 md:pl-0">
              <span className="absolute top-1.5 left-0 h-3.5 w-3.5 rounded-full border border-cy bg-ink md:left-[12.5rem] md:-translate-x-1/2" />
              <p className="mb-3 font-mono text-xs text-mute md:mb-0 md:pt-1 md:text-right">{pad(i)} / {m.type}{m.date && <><br />{m.date}</>}</p>
              <Reveal><div className="card rounded-sm p-6 transition-transform duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-semibold">{m.title}</h3>
                <p className="mt-2 text-mute">{m.desc}</p>
                {m.tech.length > 0 && <ul className="mt-4 flex flex-wrap gap-2">{m.tech.map(t => <li key={t} className="pill rounded-none border border-white/10 px-3 py-1 text-xs text-mute">{t}</li>)}</ul>}
                <p className="mt-4 border-t border-white/[.07] pt-4 text-sm"><span className="font-mono text-xs text-cy">Learned </span>{m.learn}</p>
              </div></Reveal>
            </li>))}
        </ol>
      </div>
    </Section>
  )
}

function Cover({ p, n }) {
  if (p.image) return <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" role="img" aria-label={`${p.title} abstract cover`}>
      <defs><linearGradient id={`g${n}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#101522" /><stop offset="1" stopColor="#1a2b4d" /></linearGradient></defs>
      <rect width="800" height="500" fill={`url(#g${n})`} />
      {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={560 - n * 70} cy={150 + n * 60} r={30 + i * 34} fill="none" stroke={i % 3 ? '#4B9EFF' : '#62D9E8'} strokeOpacity=".2" />)}
      <text x="44" y="450" fontFamily="Playfair Display,Georgia,serif" fontSize="200" fill="none" stroke="#F2F3F5" strokeOpacity=".22">{pad(n)}</text>
    </svg>
  )
}

const LinkBtn = ({ href, icon: I, children }) => href && <a href={href} target="_blank" rel="noreferrer" className={`${line} !px-4 !py-3`}><I size={15} />{children}</a>

function Case({ p, n, onClose }) {
  useEffect(() => {
    const k = e => e.key === 'Escape' && onClose()
    addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [])
  const Sec = ({ h, children }) => <div><h4 className="mb-2 font-mono text-xs text-cy">{h}</h4>{children}</div>
  return (
    <div role="dialog" aria-modal="true" aria-label={`${p.title} case study`} className="fixed inset-0 z-[80] grid place-items-center bg-ink/80 p-4 backdrop-blur-md" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="card pop max-h-[88dvh] w-full max-w-3xl space-y-8 overflow-y-auto rounded-sm p-5 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div><p className="font-mono text-xs text-mute">{pad(n)} / {p.cats.join(', ')} / {p.status}</p><h3 className="mt-2 font-serif text-4xl sm:text-5xl">{p.title}</h3></div>
          <button autoFocus aria-label="Close case study" onClick={onClose} className="rounded-full border border-white/15 p-2 hover:border-cy/60"><X size={18} /></button>
        </div>
        <p className="text-lg text-mute">{p.desc}</p>
        <div className="grid gap-8 sm:grid-cols-2">
          <Sec h="Problem"><p className="text-sm text-mute">{p.problem}</p></Sec>
          <Sec h="Development approach"><p className="text-sm text-mute">{p.approach}</p></Sec>
          <Sec h="My contribution"><p className="text-sm text-mute">{p.contribution}</p></Sec>
          <Sec h="Technologies"><ul className="flex flex-wrap gap-2">{p.tech.map(t => <li key={t} className="rounded-none border border-white/10 px-3 py-1 text-xs">{t}</li>)}</ul></Sec>
        </div>
        {p.features.length > 0 && <Sec h={p.status === 'Concept' ? 'Planned features' : 'Main features'}><ul className="grid gap-1 text-sm text-mute sm:grid-cols-2">{p.features.map(f => <li key={f}>{f}</li>)}</ul></Sec>}
        <Sec h="Architecture, from the stack"><Diagram tech={p.tech} /></Sec>
        {p.challenges.length > 0 && <Sec h="Challenges and solutions">{p.challenges.map(([c, s]) => <p key={c} className="text-sm text-mute"><b className="text-fg">{c}</b> {s}</p>)}</Sec>}
        {(p.live || p.github) && <div className="flex flex-wrap gap-3"><LinkBtn href={p.live} icon={ExternalLink}>Live Demo</LinkBtn><LinkBtn href={p.github} icon={Github}>GitHub</LinkBtn></div>}
      </div>
    </div>
  )
}

function Showcase({ p, n, flip, open }) {
  return (
    <Reveal>
      <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <button data-cursor="view" onClick={open} onMouseMove={tilt(2.5)} onMouseLeave={untilt} aria-label={`Open ${p.title} case study`} className={`curtain card relative aspect-[2/1] overflow-hidden rounded-sm text-left transition-[transform,border-color] duration-300 ease-out lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
          <div className="h-full w-full [filter:saturate(.55)_brightness(.9)] transition-[transform,filter] duration-[1600ms] ease-out group-hover:scale-105 group-hover:[filter:saturate(1.3)]"><Cover p={p} n={n} /></div>
          <div className="reveal-layer absolute inset-0 flex flex-col justify-end gap-3 bg-ink/85 p-6 backdrop-blur-[2px]"><span className="font-serif text-3xl">{p.title}</span>
            <ul className="flex flex-wrap gap-2">{p.features.slice(0, 4).map(f => <li key={f} className="rounded-none border border-white/20 bg-ink/50 px-3 py-1 text-xs">{f}</li>)}</ul><span className="inline-flex items-center gap-1 text-sm font-semibold text-cy">Read case study <ArrowUpRight size={16} /></span>
          </div>
        </button>
        <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
          <span className="font-display text-7xl leading-none text-transparent italic transition-colors duration-500 [-webkit-text-stroke:1px_rgba(242,243,245,.3)] group-hover:text-acc/90 group-hover:[-webkit-text-stroke-color:transparent]">{pad(n)}</span>
          <p className="mt-5 font-mono text-xs text-cy">{p.cats.join(' / ')} &middot; {p.status}</p>
          <h3 className="mt-2 font-serif text-4xl sm:text-5xl">{p.title}</h3>
          <p className="mt-4 text-mute">{p.desc}</p>
          <ul className="mt-5 flex flex-wrap gap-2">{p.tech.map(t => <li key={t} className="pill rounded-none border border-white/10 px-3 py-1 text-xs text-mute">{t}</li>)}</ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={open} className={`${solid} !py-2.5`}>Read case study <ArrowUpRight size={16} className={arrow} /></button>
            <LinkBtn href={p.live} icon={ExternalLink}>Live Demo</LinkBtn><LinkBtn href={p.github} icon={Github}>GitHub</LinkBtn>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function Projects() {
  const [f, setF] = useState('All'), [open, setOpen] = useState(null)
  const list = projects.map((p, i) => [p, i]).filter(([p]) => f === 'All' || p.cats.includes(f))
  return (
    <Section id="projects" no="04 / Projects" title="Selected work">
      <div className="mb-14 flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
        {['All', 'AI', 'Frontend', 'Full-Stack'].map(c => <button key={c} role="tab" aria-selected={f === c} onClick={() => setF(c)} className={`rounded-none border px-5 py-3 text-[11px] tracking-[.16em] uppercase transition-colors duration-300 ${f === c ? 'border-acc bg-acc/10' : 'border-white/10 text-mute hover:border-white/30 hover:text-fg'}`}>{c}</button>)}
      </div>
      <div className="space-y-24 sm:space-y-32">{list.map(([p, i], k) => <Showcase key={p.title} p={p} n={i} flip={k % 2} open={() => setOpen(i)} />)}</div>
      {open !== null && <Case p={projects[open]} n={open} onClose={() => setOpen(null)} />}
    </Section>
  )
}

const CERT_ICON = { Hackathon: Trophy, Course: GraduationCap, Internship: Briefcase }

function CertCard({ c, open }) {
  const I = CERT_ICON[c.type] || Award, frame = 'aspect-[4/3] overflow-hidden border border-white/[.08] bg-ink'
  return (
    <article className="card group flex h-full flex-col rounded-sm p-4 transition-transform duration-300 hover:-translate-y-1">
      {c.image
        ? <button data-cursor="view" onClick={open} aria-label={`View ${c.title} certificate`} className={`${frame} relative block p-2 text-left`}>
            <img src={c.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
            <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-ink/90 py-3 text-xs font-semibold text-cy transition-transform duration-300 group-hover:translate-y-0"><ZoomIn size={14} />View certificate</span>
          </button>
        : <div className={`${frame} grid place-items-center p-6 text-center`}><div><I size={32} className="mx-auto text-acc" /><p className="mt-3 font-serif text-2xl leading-tight">{c.issuer || c.title}</p></div></div>}
      <p className="mt-5 flex items-center gap-2 font-mono text-[11px] text-cy"><I size={14} />{[c.type, c.date].filter(Boolean).join(' / ')}</p>
      <h3 className="mt-2 font-serif text-2xl leading-tight">{c.title}</h3>
      {c.issuer && <p className="mt-1 text-sm text-mute">{c.issuer}</p>}
      {c.note && <p className="mt-3 line-clamp-3 text-sm text-mute">{c.note}</p>}
      {c.skills?.length > 0 && <ul className="mt-4 flex flex-wrap gap-2">{c.skills.map(s => <li key={s} className="pill rounded-none border border-white/10 px-3 py-1 text-xs text-mute">{s}</li>)}</ul>}
      <div className="mt-auto flex flex-wrap gap-3 pt-5 empty:hidden">
        {c.image && <button onClick={open} className={`${line} !px-4 !py-3`}>View <ZoomIn size={15} /></button>}
        <LinkBtn href={c.pdf} icon={FileText}>PDF</LinkBtn><LinkBtn href={c.verify} icon={ExternalLink}>Verify</LinkBtn>
      </div>
    </article>
  )
}

function CertViewer({ list, i, go, onClose }) {
  const c = list[i], n = list.length
  useEffect(() => {
    const k = e => { if (e.key === 'Escape') onClose(); else if (n > 1 && e.key === 'ArrowRight') go(1); else if (n > 1 && e.key === 'ArrowLeft') go(-1) }
    addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [n, go, onClose])
  const step = (d, I, label) => <button aria-label={label} onClick={() => go(d)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 transition-colors hover:border-cy/60 active:scale-95"><I size={18} /></button>
  return (
    <div role="dialog" aria-modal="true" aria-label={`${c.title} certificate`} className="fixed inset-0 z-[80] grid place-items-center bg-ink/85 p-3 backdrop-blur-md sm:p-6" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="card pop flex max-h-[92dvh] w-full max-w-4xl flex-col gap-5 overflow-y-auto rounded-sm p-4 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div><p className="font-mono text-xs text-cy">{[c.type, c.date].filter(Boolean).join(' / ')}</p><h3 className="mt-2 font-serif text-3xl sm:text-4xl">{c.title}</h3>{c.issuer && <p className="mt-1 text-mute">{c.issuer}</p>}</div>
          <button autoFocus aria-label="Close certificate" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 hover:border-cy/60"><X size={18} /></button>
        </div>
        {c.image && <img src={c.image} alt={`${c.title} certificate${c.issuer ? ` from ${c.issuer}` : ''}`} decoding="async" className="mx-auto max-h-[56dvh] w-auto max-w-full rounded-sm border border-white/10 bg-ink object-contain" />}
        {c.note && <p className="text-sm text-mute">{c.note}</p>}
        <div className="flex flex-wrap items-center gap-3">
          <LinkBtn href={c.pdf} icon={FileText}>Open PDF</LinkBtn><LinkBtn href={c.verify} icon={ExternalLink}>Verify online</LinkBtn>
          {n > 1 && <div className="ml-auto flex items-center gap-2">{step(-1, ChevronLeft, 'Previous certificate')}<span className="font-mono text-[11px] text-mute">{i + 1} / {n}</span>{step(1, ChevronRight, 'Next certificate')}</div>}
        </div>
      </div>
    </div>
  )
}

function Certificates() {
  const types = ['All', ...new Set(certificates.map(c => c.type).filter(Boolean))]
  const [f, setF] = useState('All'), [open, setOpen] = useState(null)
  if (!certificates.length) return null
  const list = certificates.filter(c => f === 'All' || c.type === f)
  return (
    <Section id="certificates" no="05 / Certificates" title="Learning, on the record.">
      {types.length > 2 && <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Certificate types">{types.map(t => <button key={t} role="tab" aria-selected={f === t} onClick={() => { setF(t); setOpen(null) }} className={`rounded-none border px-5 py-3 text-[11px] tracking-[.16em] uppercase transition-colors duration-300 ${f === t ? 'border-acc bg-acc/10' : 'border-white/10 text-mute hover:border-white/30 hover:text-fg'}`}>{t}</button>)}</div>}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((c, i) => <Reveal key={c.title + i} className="h-full"><CertCard c={c} open={() => setOpen(i)} /></Reveal>)}</div>
      {open !== null && list[open] && <CertViewer list={list} i={open} go={d => setOpen(o => (o + d + list.length) % list.length)} onClose={() => setOpen(null)} />}
    </Section>
  )
}

function GitHub() {
  const [repos, setRepos] = useState(null), [err, setErr] = useState(false)
  useEffect(() => {
    if (!P.githubUser) return
    fetch(`https://api.github.com/users/${P.githubUser}/repos?sort=updated&per_page=8`).then(r => r.ok ? r.json() : Promise.reject()).then(d => setRepos(d.filter(r => !r.fork).slice(0, 6))).catch(() => setErr(true))
  }, [])
  if (!P.githubUser) return import.meta.env.DEV ? <p className="border-t border-white/[.07] pt-6 text-sm text-mute">Dev only: set <code className="text-cy">githubUser</code> in <code className="text-cy">src/data.js</code> to show repositories and the contribution graph.</p> : null
  return (
    <div className="space-y-6">
      <div className="card overflow-x-auto rounded-sm p-6"><img src={`https://ghchart.rshah.org/4B9EFF/${P.githubUser}`} alt={`GitHub contribution graph for ${P.githubUser}`} loading="lazy" className="min-w-[640px]" /></div>
      {repos && !repos.length && <p className="text-sm text-mute">No public repositories yet: new projects appear here as soon as they are pushed. <a className="ul text-cy" href={GH} target="_blank" rel="noreferrer">Open GitHub profile</a></p>}
      {err && <p className="text-sm text-mute">Could not load repositories right now. <a className="ul text-cy" href={GH} target="_blank" rel="noreferrer">Open GitHub profile</a></p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(repos || []).map(r => (
          <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" className="card group rounded-sm p-5 transition-transform duration-300 hover:-translate-y-1">
            <h4 className="flex items-center justify-between font-semibold">{r.name}<ArrowUpRight size={16} className={`${arrow} text-mute`} /></h4>
            <p className="mt-2 min-h-10 text-sm text-mute">{r.description || 'No description yet.'}</p>
            <p className="mt-4 flex items-center gap-4 font-mono text-xs text-mute">{r.language && <span>{r.language}</span>}<span className="flex items-center gap-1"><Star size={12} />{r.stargazers_count}</span><span>Updated {new Date(r.pushed_at).toLocaleDateString()}</span></p>
          </a>))}
      </div>
    </div>
  )
}

function Timeline() {
  const [yrs, setYrs] = useState(() => { try { return JSON.parse(localStorage.getItem('bj-years')) || {} } catch { return {} } })
  useEffect(() => { try { localStorage.setItem('bj-years', JSON.stringify(yrs)) } catch { /* storage blocked */ } }, [yrs])
  const yr = p => p.year || yrs[p.title] || ''
  const ys = projects.map(p => +yr(p) || 0), lo = Math.min(...ys), hi = Math.max(...ys), ok = ys.every(Boolean) && hi > lo
  const at = i => ok ? (ys[i] - lo) / (hi - lo) : i / (projects.length - 1)
  return (
    <div>
      <p className="mb-6 font-mono text-[11px] text-mute">Build timeline{ok ? ' \u00b7 spaced by real year gaps' : import.meta.env.DEV ? ' \u00b7 dev: add every project year in data.js to space by real gaps' : ''}</p>
      
      <ol className="relative ml-1.5 space-y-5 border-l border-white/10 pb-2 pl-6 sm:hidden">
        {projects.map((p, i) => (
          <li key={p.title} className="relative">
            <span className="absolute top-2 -left-[31px] h-3 w-3 border border-cy bg-ink" />
            <a href="#projects" className="block py-1">
              <span className="font-display text-sm text-mute italic">{ROMAN[i]}{yr(p) && ` \u00b7 ${yr(p)}`}</span>
              <span className="block font-serif text-2xl leading-tight">{p.title}</span>
              <span className="block font-mono text-[10px] text-mute">{p.status}</span>
            </a>
          </li>))}
      </ol>
      <div className="relative hidden overflow-x-auto overscroll-x-contain pt-14 pb-4 sm:block">
        <div className="relative mx-16 h-44 min-w-[560px]">
          <div className="absolute top-[7px] right-0 left-0 h-px bg-linear-to-r from-acc via-cy to-acc/20" />
          {ok && projects.slice(1).map((p, i) => <span key={p.title} className="absolute top-[7px] -translate-x-1/2 -translate-y-1/2 bg-ink px-2 font-mono text-[10px] text-cy" style={{ left: `${(at(i) + at(i + 1)) * 50}%` }}>+{ys[i + 1] - ys[i]} yr</span>)}
          {projects.map((p, i) => (
            <a key={p.title} href="#projects" className="group absolute top-0 w-36 -translate-x-1/2" style={{ left: `${at(i) * 100}%` }}>
              {yr(p) && <span className="absolute -top-12 left-1/2 -translate-x-1/2 font-display text-3xl text-white/25 transition-colors duration-300 group-hover:text-cy">{yr(p)}</span>}
              <span className="mx-auto block h-3.5 w-3.5 border border-cy bg-ink transition-all duration-300 group-hover:scale-150 group-hover:bg-cy" />
              <span className="mt-5 block text-center font-display text-sm text-mute italic">{ROMAN[i]}</span>
              <span className="block text-center font-serif text-2xl leading-tight transition-colors group-hover:text-cy">{p.title}</span>
              <span className="mt-1 block text-center font-mono text-[10px] text-mute">{p.status}</span>
            </a>))}
        </div>
      </div>
      {import.meta.env.DEV && (
        <div className="mt-4 border border-dashed border-white/15 p-4 text-sm text-mute">
          <p className="mb-3 font-mono text-[10px]">Dev only &middot; type each year here, then copy them into src/data.js (year: &apos;2025&apos;)</p>
          <div className="flex flex-wrap gap-5">{projects.map(p => <label key={p.title} className="flex items-center gap-2">{p.title}<input inputMode="numeric" maxLength={4} value={yrs[p.title] ?? p.year} onChange={e => setYrs({ ...yrs, [p.title]: e.target.value.replace(/\D/g, '') })} className="w-16 border-b border-white/20 bg-transparent px-1 text-fg outline-none focus:border-cy" /></label>)}</div>
        </div>)}
    </div>
  )
}

function StackMap() {
  const techs = [...new Set(projects.flatMap(p => p.tech))], [hv, setHv] = useState(null)
  return (
    <div>
      <p className="mb-6 font-mono text-[11px] text-mute">Stack map &middot; which technologies each project uses</p>
      <p className="-mt-3 mb-3 text-xs text-mute sm:hidden">Swipe sideways to see every project.</p>
      <div className="relative overflow-x-auto overscroll-x-contain">
        <table className="w-full min-w-[520px] border-collapse text-sm" onMouseLeave={() => setHv(null)}>
          <thead><tr><td className="p-3" />{projects.map((p, j) => <th key={p.title} scope="col" className={`p-3 text-left font-serif text-lg font-normal transition-colors ${hv?.[1] === j ? 'text-cy' : 'text-mute'}`}><span className="font-display text-xs italic">{ROMAN[j]}</span> {p.title}</th>)}<th className="p-3 text-right font-mono text-[10px] font-normal text-mute">Used in</th></tr></thead>
          <tbody>{techs.map((t, i) => (
            <tr key={t} className="border-t border-white/[.07]">
              <th scope="row" className={`p-3 text-left font-normal transition-colors ${hv?.[0] === i ? 'text-cy' : ''}`}>{t}</th>
              {projects.map((p, j) => { const on = p.tech.includes(t), hit = hv && hv[0] === i && hv[1] === j; return (
                <td key={j} onMouseEnter={() => setHv([i, j])} className={`p-3 transition-colors ${hv && (hv[0] === i || hv[1] === j) ? 'bg-white/[.04]' : ''}`}>
                  <span title={`${p.title} ${on ? 'uses' : 'does not use'} ${t}`} className={`block h-3 w-3 transition-transform duration-300 ${on ? 'bg-linear-to-br from-acc to-cy' : 'border border-white/10'} ${hit ? 'scale-150' : ''}`} /><span className="sr-only">{on ? 'Yes' : 'No'}</span>
                </td>) })}
              <td className="p-3 text-right text-mute">{projects.filter(p => p.tech.includes(t)).length}/{projects.length}</td>
            </tr>))}</tbody>
        </table>
      </div>
    </div>
  )
}

function Activity() {
  return <div className="space-y-20"><Timeline /><StackMap /><GitHub /></div>
}

function Insights() {
  return (
    <Section id="insights" no={`${SEC(6)} / Insights`} title="Curiosity Never Compiles Itself.">
      <ul className="border-y border-white/[.07]">
        {exploring.map(([t, note], i) => (
          <li key={t} className="group border-b border-white/[.07] last:border-0">
            <div className="flex items-center gap-5 py-6 transition-all duration-500 hover:pl-4 sm:gap-8 sm:py-8">
              <span className="font-mono text-xs text-mute">{pad(i)}</span>
              <div className="flex-1 md:flex md:items-center md:justify-between md:gap-10"><h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-acc sm:text-3xl">{t}</h3><p className="mt-1 max-w-sm text-sm text-mute md:mt-0">{note}</p></div>
              <ArrowUpRight className="shrink-0 text-mute transition-all duration-300 group-hover:rotate-45 group-hover:text-cy" />
            </div>
          </li>))}
      </ul>
      <h3 className="mt-24 mb-8 font-serif text-4xl">Developer activity</h3>
      <Activity />
    </Section>
  )
}

const Field = ({ label, err, area, ...r }) => (
  <label className="fld block">
    <span className="font-mono text-xs text-mute">{label}</span>
    <span className="relative mt-1 block">
      {area ? <textarea rows={4} aria-invalid={!!err} {...r} className="block w-full resize-none border-b border-white/15 bg-transparent py-2 text-lg outline-none placeholder:text-white/20" /> : <input aria-invalid={!!err} {...r} className="block w-full border-b border-white/15 bg-transparent py-2 text-lg outline-none placeholder:text-white/20" />}
      <i className="fld-line" />
    </span>
    {err && <span role="alert" className="text-xs text-red-300">{err}</span>}
  </label>
)

function CopyBtn() {
  const [ok, setOk] = useState(false)
  const copy = async () => { try { await navigator.clipboard.writeText(P.email); setOk(true); setTimeout(() => setOk(false), 1800) } catch { /* clipboard blocked */ } }
  return <button type="button" onClick={copy} aria-live="polite" className="ml-3 border border-white/15 px-3 py-2.5 font-mono text-[10px] text-mute transition-colors hover:border-cy/60 hover:text-fg">{ok ? 'Copied' : 'Copy'}</button>
}

function Contact() {
  const [st, setSt] = useState('idle'), [er, setEr] = useState({})
  const submit = async e => {
    e.preventDefault()
    const form = e.currentTarget, f = Object.fromEntries(new FormData(form)), x = {}
    if (f.name.trim().length < 2) x.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email address.'
    if (f.message.trim().length < 10) x.message = 'Write at least 10 characters.'
    setEr(x); if (Object.keys(x).length) return
    if (!P.formEndpoint) { location.href = `mailto:${P.email}?subject=${encodeURIComponent(f.subject || 'Portfolio message from ' + f.name)}&body=${encodeURIComponent(`${f.message}\n\n${f.name} (${f.email})`)}`; setSt('mailto'); return }
    setSt('sending')
    try { const r = await fetch(P.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(f) }); if (!r.ok) throw 0; setSt('ok'); form.reset() } catch { setSt('error') }
  }
  return (
    <Section id="contact" no={`${SEC(8)} / Contact`} title="Have an Idea? Let's Build Something Meaningful.">
      <div className="grid gap-14 lg:grid-cols-12">
        <Reveal className="space-y-1 lg:col-span-4"><div className="flex flex-wrap items-center"><Soc mail href={P.email && `mailto:${P.email}`} icon={Mail} label={P.email} /><CopyBtn /></div><Soc href={P.linkedin} icon={Linkedin} label="LinkedIn" /><Soc href={GH} icon={Github} label="GitHub" /></Reveal>
        <Reveal delay={100} className="lg:col-span-7 lg:col-start-6">
          <form onSubmit={submit} noValidate className="space-y-7">
            <div className="grid gap-7 sm:grid-cols-2"><Field label="Name" name="name" err={er.name} autoComplete="name" placeholder="Your name" /><Field label="Email" name="email" type="email" err={er.email} autoComplete="email" placeholder="you@example.com" /></div>
            <Field label="Subject" name="subject" placeholder="What is this about?" />
            <Field label="Message" name="message" area err={er.message} placeholder="Tell me about your idea" />
            <button data-mag disabled={st === 'sending'} className={`${solid} disabled:opacity-60`}>{st === 'sending' ? 'Sending...' : 'Send Message'}<ArrowUpRight size={16} className={arrow} /></button>
            <p role="status" className={`text-sm ${st === 'error' ? 'text-red-300' : 'text-mute'}`}>
              {st === 'ok' && 'Message sent. Thank you, I will get back to you soon.'}
              {st === 'error' && 'Something went wrong and your message was not sent. Please email me directly.'}
              {st === 'mailto' && 'Your email app should open with the message filled in. It is only sent once you press send there.'}
              {st === 'idle' && !P.formEndpoint && 'Your email app will open with your message ready to send.'}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}

const Footer = () => (
  <footer className="relative border-t border-white/[.07] pb-20 md:pb-0">
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p aria-label="BHAVESH JOSHI" className="font-serif text-[clamp(2.4rem,10vw,8rem)] leading-none">{[...'BHAVESH JOSHI'].map((c, i) => <span key={i} aria-hidden="true" className="lt inline-block">{c === ' ' ? '\u00A0' : c}</span>)}</p>
      <p className="mt-4 font-serif text-3xl text-mute italic">Designed with curiosity. Built with code.</p><p className="mt-6 font-mono text-[11px] text-mute">Luxury in simplicity. Character in details. Engineering in every experience.</p>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
        <nav className="flex flex-wrap gap-6" aria-label="Footer">{NAV.map(([l, id]) => <a key={id} href={`#${id}`} onMouseEnter={scramble} className="ul py-2 text-sm text-mute hover:text-fg">{l}</a>)}</nav>
        <div className="flex flex-wrap gap-6"><Soc mail href={P.email && `mailto:${P.email}`} icon={Mail} label="Email" /><Soc href={GH} icon={Github} label="GitHub" /><Soc href={P.linkedin} icon={Linkedin} label="LinkedIn" /></div>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/[.07] pt-6 text-sm text-mute">
        <p>&copy; {new Date().getFullYear()} {P.name}. {P.location}.</p>
        <a href="#home" data-mag className="group inline-flex items-center gap-2 py-2 hover:text-fg">Back to top <ArrowUp size={16} className="transition-transform duration-300 group-hover:-translate-y-1" /></a>
      </div>
    </div>
  </footer>
)

function Count({ to }) {
  const [v, setV] = useState(0), r = useRef(null)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setV(to)
      const t0 = performance.now()
      const f = t => { const p = Math.min(1, (t - t0) / 1200); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(f) }
      requestAnimationFrame(f)
    })
    io.observe(r.current)
    return () => io.disconnect()
  }, [to])
  return <span ref={r}>{v}</span>
}

function Glance() {
  const tech = new Set(skills.flatMap(g => g.items.map(i => i[0]))).size
  return (
    <div className="mx-auto max-w-7xl px-6">
      <Reveal className="grid grid-cols-3 divide-x divide-white/[.07] border-y border-white/[.07]">
        {[[projects.length, 'Projects'], [tech, 'Technologies'], [15, 'Day internship']].map(([n, l]) => (
          <div key={l} className="group px-2 py-8 text-center transition-colors duration-500 hover:bg-white/[.02] sm:py-10">
            <p className="font-display text-4xl transition-colors duration-300 group-hover:text-cy sm:text-6xl"><Count to={n} /></p>
            <p className="mx-auto mt-2 w-fit font-mono text-[11px] text-mute sm:text-xs">{l}<i className="mt-1 block h-px w-0 bg-cy transition-all duration-500 group-hover:w-full" /></p>
          </div>
        ))}
      </Reveal>
    </div>
  )
}

const Dock = () => (
  <nav aria-label="Quick navigation" className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border border-white/10 bg-surface/80 p-1.5 shadow-2xl backdrop-blur-xl md:hidden" style={{ marginBottom: 'env(safe-area-inset-bottom)' }}>
    {[[Home, 'Home', 'home'], [User, 'About', 'about'], [Briefcase, 'Projects', 'projects'], [Mail, 'Contact', 'contact']].map(([I, l, id]) => (
      <a key={id} href={`#${id}`} aria-label={l} className="grid h-11 w-11 place-items-center rounded-full text-mute transition-colors active:bg-acc/20 active:text-cy"><I size={18} /></a>
    ))}
  </nav>
)

const shuffled = n => { const a = Array.from({ length: n }, (_, i) => i + 1); for (let i = n - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]] } return a }
const BIGO = { Bubble: 'O(n\u00b2)', Selection: 'O(n\u00b2)', Insertion: 'O(n\u00b2)', Quick: 'O(n log n) on average' }
// Each algorithm yields [i, j, swapped?] so the UI can show every comparison and swap.
const ALGOS = {
  Bubble: function* (a) { for (let i = 0; i < a.length; i++) for (let j = 0; j < a.length - i - 1; j++) { yield [j, j + 1]; if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; yield [j, j + 1, 1] } } },
  Selection: function* (a) { for (let i = 0; i < a.length; i++) { let m = i; for (let j = i + 1; j < a.length; j++) { yield [m, j]; if (a[j] < a[m]) m = j } if (m !== i) { [a[i], a[m]] = [a[m], a[i]]; yield [i, m, 1] } } },
  Insertion: function* (a) { for (let i = 1; i < a.length; i++) for (let j = i; j > 0; j--) { yield [j - 1, j]; if (a[j - 1] <= a[j]) break; [a[j - 1], a[j]] = [a[j], a[j - 1]]; yield [j - 1, j, 1] } },
  Quick: function* (a) { const st = [[0, a.length - 1]]; while (st.length) { const [lo, hi] = st.pop(); if (lo >= hi) continue; let i = lo; for (let j = lo; j < hi; j++) { yield [j, hi]; if (a[j] < a[hi]) { [a[i], a[j]] = [a[j], a[i]]; yield [i, j, 1]; i++ } } [a[i], a[hi]] = [a[hi], a[i]]; yield [i, hi, 1]; st.push([lo, i - 1], [i + 1, hi]) } },
}

function Lab() {
  const [n, setN] = useState(32), [alg, setAlg] = useState('Quick'), [spd, setSpd] = useState(40), [arr, setArr] = useState(() => shuffled(32)), [hl, setHl] = useState([]), [run, setRun] = useState(false), [done, setDone] = useState(false), [steps, setSteps] = useState(0)
  const gen = useRef(null), cur = useRef(arr)
  const reset = m => { const a = shuffled(m); cur.current = a; gen.current = null; setArr(a); setHl([]); setRun(false); setDone(false); setSteps(0) }
  useEffect(() => { reset(n) }, [n, alg])
  useEffect(() => {
    if (!run) return
    const id = setInterval(() => {
      gen.current = gen.current || ALGOS[alg](cur.current)
      const r = gen.current.next()
      if (r.done) { setRun(false); setDone(true); setHl([]); return }
      setArr([...cur.current]); setHl(r.value); setSteps(x => x + 1)
    }, Math.max(16, 1000 / spd))
    return () => clearInterval(id)
  }, [run, alg, spd])
  const play = () => { if (done) { reset(n); setRun(true) } else setRun(!run) }
  const slider = (label, min, max, v, set) => <label className="flex items-center gap-4"><span className="w-12 font-mono text-[11px] text-mute">{label}</span><input type="range" aria-label={label} min={min} max={max} value={v} onChange={e => set(+e.target.value)} className="h-8 flex-1 accent-[#4B9EFF]" /><span className="w-8 text-right text-sm text-mute">{v}</span></label>
  return (
    <Section id="lab" no={`${SEC(5)} / Engineering Lab`} title="Algorithms, in motion">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-4">
          <p className="text-mute">Choose a sorting algorithm and watch it work. Bars compare in cyan, swap in white, and ripple when sorted. Every smooth interface rests on careful algorithms like these.</p>
          <div className="flex flex-wrap gap-2">{Object.keys(ALGOS).map(a => <button key={a} onClick={() => setAlg(a)} aria-pressed={alg === a} className={`pill border px-4 py-2.5 sm:px-3 sm:py-1.5 text-[11px] tracking-[.12em] uppercase ${alg === a ? 'border-acc text-fg' : 'border-white/10 text-mute'}`}>{a}</button>)}</div>
          {slider('Size', 8, 64, n, setN)}{slider('Speed', 5, 120, spd, setSpd)}
          <div className="flex gap-3"><button onClick={play} className={solid}>{run ? 'Pause' : done ? 'Run again' : 'Play'}</button><button onClick={() => reset(n)} className={line}>Shuffle</button></div>
          <p className="font-mono text-[11px] text-mute">{alg} &middot; {BIGO[alg]} &middot; {steps} steps</p>
        </div>
        <div className="card rounded-sm p-6 lg:col-span-8">
          <div className="flex h-56 items-end gap-px sm:h-72 sm:gap-[2px]" role="img" aria-label={`${alg} sort visualisation`}>
            {arr.map((v, i) => { const on = hl[0] === i || hl[1] === i; return <span key={i} className={`flex-1 transition-colors duration-300 ${done ? 'bg-linear-to-t from-acc to-cy' : on ? (hl[2] ? 'bg-fg' : 'bg-cy') : 'bg-acc/45'}`} style={{ height: `${v / n * 100}%`, transitionDelay: done ? `${i * 14}ms` : '0ms' }} /> })}
          </div>
        </div>
      </div>
    </Section>
  )
}

const Process = () => (
  <Section id="process" no={`${SEC(7)} / Engineering Process`} title="How I work">
    <ol className="grid divide-y divide-white/[.07] border-y border-white/[.07] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 [&>li]:p-7">
      {steps.map(([t, d], i) => (
        <li key={t} className="group">
          <span className="font-display text-5xl text-white/15 italic transition-colors duration-500 group-hover:text-cy">{pad(i)}</span>
          <h3 className="mt-6 font-serif text-3xl">{t}</h3><p className="mt-3 text-sm text-mute">{d}</p>
          <i className="mt-6 block h-px w-8 bg-cy/60 transition-all duration-700 group-hover:w-full" />
        </li>))}
    </ol>
  </Section>
)

const layer = t => skills.find(g => g.items.some(i => i[0] === t))?.group
function Diagram({ tech }) {
  const cols = ['Frontend', 'Backend', 'Database'].map(g => [g, tech.filter(t => layer(t) === g)]).filter(([, l]) => l.length)
  return (
    <div className="flex flex-wrap items-center gap-2" role="img" aria-label={`Stack layers: ${cols.map(([g]) => g).join(' to ')}`}>
      {cols.map(([g, l], i) => <Fragment key={g}>{i > 0 && <span className="text-cy">&rarr;</span>}<div className="border border-white/15 px-4 py-3 text-center"><p className="font-mono text-[10px] text-mute">{g}</p><p className="mt-1 text-sm">{l.join(', ')}</p></div></Fragment>)}
    </div>
  )
}

function CommandPalette() {
  const [show, setShow] = useState(false), [q, setQ] = useState(''), [i, setI] = useState(0)
  const go = id => () => { location.hash = id }
  const all = [...NAV.map(([l, id]) => [`Go to ${l}`, go(id)]), ['Go to Engineering Lab', go('lab')], ['Go to Process', go('process')], ['Email me', () => { location.href = `mailto:${P.email}` }], ...(GH ? [['Open GitHub', () => window.open(GH, '_blank')]] : []), ...(P.linkedin ? [['Open LinkedIn', () => window.open(P.linkedin, '_blank')]] : [])]
  const list = all.filter(([l]) => l.toLowerCase().includes(q.toLowerCase()))
  useEffect(() => {
    const k = e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setShow(s => !s); setQ(''); setI(0) } else if (e.key === 'Escape') setShow(false) }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [])
  const run = x => { setShow(false); x && x[1]() }
  const key = e => {
    const n = list.length || 1
    if (e.key === 'ArrowDown') { e.preventDefault(); setI((i + 1) % n) } else if (e.key === 'ArrowUp') { e.preventDefault(); setI((i + n - 1) % n) } else if (e.key === 'Enter') run(list[i])
  }
  return (
    <>
      <button onClick={() => { setShow(true); setQ(''); setI(0) }} aria-label="Open command palette" className="fixed right-6 bottom-6 z-40 hidden border border-white/15 bg-ink/90 px-4 py-2 font-mono text-[11px] text-mute transition-colors hover:border-cy/60 hover:text-fg [@media(hover:hover)_and_(min-width:48rem)]:block">Search &middot; Ctrl K</button>
      {show && (
        <div role="dialog" aria-modal="true" aria-label="Command palette" className="fixed inset-0 z-[85] bg-ink/80 p-4 pt-[18vh] backdrop-blur-sm" onClick={() => setShow(false)}>
          <div onClick={e => e.stopPropagation()} className="pop mx-auto w-full max-w-lg border border-white/10 bg-navy">
            <input autoFocus value={q} onChange={e => { setQ(e.target.value); setI(0) }} onKeyDown={key} placeholder="Type a command..." aria-label="Command" className="w-full border-b border-white/10 bg-transparent px-5 py-4 outline-none placeholder:text-white/30" />
            <ul role="listbox" className="max-h-72 overflow-y-auto py-2">
              {list.map((x, n) => <li key={x[0]} role="option" aria-selected={n === i}><button onMouseEnter={() => setI(n)} onClick={() => run(x)} className={`w-full px-5 py-3 text-left text-sm ${n === i ? 'bg-white/5 text-cy' : 'text-mute'}`}>{x[0]}</button></li>)}
              {!list.length && <li className="px-5 py-3 text-sm text-mute">No matches</li>}
            </ul>
          </div>
        </div>)}
    </>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  useFx()
  useEffect(() => { const t = setTimeout(() => setReady(true), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1100); return () => clearTimeout(t) }, [])
  return (
    <>
      <div className={`loader ${ready ? 'done' : ''}`} aria-hidden="true"><img src="/logo.svg" alt="" width="72" height="72" className="animate-pulse" /><i className="lbar" /></div>
      <div id="bar" className="fixed top-0 left-0 z-[60] h-0.5 w-full origin-left bg-linear-to-r from-acc to-cy" style={{ transform: 'scaleX(0)' }} />
      <div id="ring" className="ring" aria-hidden="true" /><div className="grain" aria-hidden="true" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="aurora absolute inset-0"><i /><i /><i /></div><div className="cols absolute inset-0 mx-auto max-w-7xl" /><DotField />
        <div id="glow" className="absolute inset-0" style={{ background: 'radial-gradient(600px circle at var(--cx,70%) var(--cy,20%), rgba(75,158,255,.10), transparent 60%)' }} />
      </div>
      <Nav />
      <main><Hero /><Glance /><About /><Expertise /><Journey /><Projects /><Certificates /><Lab /><Insights /><Process /><Contact /></main>
      <Footer />
      <Dock />
      <CommandPalette />
    </>
  )
}
