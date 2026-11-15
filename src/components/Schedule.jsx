import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ArrowRight, Snowflake, Wind, BedDouble, Armchair, Search, RotateCcw, ChevronDown } from 'lucide-react'
import { DEPARTURES, ORIGINS, BUS_TYPES, CONTACT, fmtTime, nightOrder, servesDestination } from '../data'
import { SectionHeading, ease } from './ui'
import { buildMap, canRefract } from './LiquidGlass'

const TYPE_FILTERS = [{ key: 'all', label: 'All buses' }, ...Object.entries(BUS_TYPES).map(([key, v]) => ({ key, label: v.short }))]
const MOBILE_LIMIT = 8

function useMedia(q) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [q])
  return m
}

/** One shared iOS-glass lens filter for every card (all cards share a size). */
function useCardLens(enabled) {
  const [el, setEl] = useState(null)
  const [lens, setLens] = useState(null)
  useEffect(() => {
    if (!el || !enabled) return
    let raf
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const w = el.offsetWidth, h = el.offsetHeight
        if (w > 10 && h > 10) setLens((l) => (l && l.w === w && l.h === h ? l : { w, h, map: buildMap(w, h, 22, 30) }))
      })
    })
    ro.observe(el)
    return () => { ro.disconnect(); cancelAnimationFrame(raf) }
  }, [el, enabled])
  return [setEl, lens]
}

function Chip({ active, onClick, children, group }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`relative min-h-[40px] shrink-0 cursor-pointer rounded-full px-4 text-sm font-bold transition-colors ${active ? 'text-ink' : 'text-white/65 hover:text-white'}`}
    >
      {active && <motion.span layoutId={`chip-${group}`} className="absolute inset-0 rounded-full bg-gradient-to-r from-marigold to-[#FFD25A] shadow-[0_6px_20px_-6px_rgba(245,183,0,.8)]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
      <span className="relative">{children}</span>
    </button>
  )
}

export default function Schedule({ filter, setFilter }) {
  const { from, to, type } = filter
  const isMobile = useMedia('(max-width: 767px)')
  const finePointer = useMedia('(min-width: 1024px) and (pointer: fine)')
  const [expanded, setExpanded] = useState(false)
  const lensOn = canRefract && finePointer
  const [cardRef, lens] = useCardLens(lensOn)

  const rows = useMemo(() => {
    return DEPARTURES
      .filter((d) => (from === 'all' || d.from === from) && (!to || servesDestination(d, to)) && (type === 'all' || d.type === type))
      .flatMap((d) => d.times.map((t) => ({ ...d, time: t, key: `${d.from}-${d.to}-${d.type}-${t}` })))
      .sort((a, b) => nightOrder(a.time) - nightOrder(b.time))
  }, [from, to, type])

  useEffect(() => { setExpanded(false) }, [from, to, type])
  const shown = isMobile && !expanded ? rows.slice(0, MOBILE_LIMIT) : rows
  const glassBackdrop = lensOn && lens ? 'url(#lg-card) blur(3px) saturate(190%) brightness(1.08)' : 'blur(18px) saturate(180%)'

  return (
    <section id="schedule" className="relative isolate overflow-hidden bg-[#060A14] py-24 sm:py-32">
      {/* shared lens filter */}
      {lensOn && lens && (
        <svg aria-hidden width="0" height="0" style={{ position: 'absolute' }}>
          <filter id="lg-card" x="0" y="0" width={lens.w} height={lens.h} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feImage href={lens.map} x="0" y="0" width={lens.w} height={lens.h} preserveAspectRatio="none" result="map" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="46" xChannelSelector="R" yChannelSelector="G" result="dR" />
            <feColorMatrix in="dR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="42" xChannelSelector="R" yChannelSelector="G" result="dG" />
            <feColorMatrix in="dG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="38" xChannelSelector="R" yChannelSelector="G" result="dB" />
            <feColorMatrix in="dB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
            <feBlend in="r" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="b" mode="screen" />
          </filter>
        </svg>
      )}

      {/* glowing orbs the glass bends */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div className="absolute left-[-8%] top-[8%] h-[420px] w-[420px] rounded-full bg-marigold/50 blur-[80px] sm:h-[560px] sm:w-[560px]"
          animate={{ x: [0, 220, 0], y: [0, 260, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute right-[-10%] top-[30%] h-[420px] w-[420px] rounded-full bg-saffron/55 blur-[80px] sm:h-[520px] sm:w-[520px]"
          animate={{ x: [0, -200, 0], y: [0, 200, 0] }} transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-[0%] left-[25%] h-[420px] w-[420px] rounded-full bg-violet-500/40 blur-[90px] sm:h-[520px] sm:w-[520px]"
          animate={{ x: [0, 160, -80, 0], y: [0, -220, 0] }} transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-[20%] right-[15%] h-[300px] w-[300px] rounded-full bg-sky-400/35 blur-[80px]"
          animate={{ x: [0, -140, 0], y: [0, 120, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0 opacity-[.07] [background-image:radial-gradient(rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:26px_26px]" />
      </div>

      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            light
            eyebrow="Tonight's timetable"
            title="Every departure, one clean list."
            sub="Pick your boarding town and see every bus leaving tonight, earliest first. Tap any bus to book your seat."
          />
          {(from !== 'all' || to || type !== 'all') && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              onClick={() => setFilter({ from: 'all', to: '', type: 'all' })}
              className="card-glass inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full px-5 text-sm font-bold text-white"
            >
              <RotateCcw className="h-4 w-4" /> Clear filters
            </motion.button>
          )}
        </div>

        {/* filters */}
        <LayoutGroup>
          <div className="mt-10 space-y-3">
            {[
              ['from', [{ k: 'all', l: 'All towns' }, ...ORIGINS.map((o) => ({ k: o, l: o }))], from],
              ['type', TYPE_FILTERS.map((t) => ({ k: t.key, l: t.label })), type],
            ].map(([g, items, val]) => (
              <div key={g} className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="card-glass relative flex w-max gap-1 rounded-full p-1.5" style={{ backdropFilter: 'blur(18px) saturate(180%)' }}>
                  {items.map((it) => <Chip key={it.k} group={g} active={val === it.k} onClick={() => setFilter({ ...filter, [g]: it.k })}>{it.l}</Chip>)}
                </div>
              </div>
            ))}
            {to && (
              <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-semibold text-white/60">
                Going to <span className="text-white">{to}</span>
                <button onClick={() => setFilter({ ...filter, to: '' })} className="ml-2 cursor-pointer text-marigold underline underline-offset-4">show all destinations</button>
              </motion.p>
            )}
          </div>
        </LayoutGroup>

        {/* offer */}
        <motion.a
          href={CONTACT.bookUrl} target="_blank" rel="noopener"
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -2 }}
          className="card-glass group relative mt-8 flex flex-wrap items-center justify-between gap-3 overflow-hidden rounded-[22px] px-5 py-4"
          style={{ backdropFilter: 'blur(18px) saturate(180%)' }}
        >
          <span className="sheen" aria-hidden />
          <span className="flex items-center gap-3">
            <motion.span animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-marigold to-saffron font-display text-sm font-extrabold text-ink shadow-[0_8px_24px_-6px_rgba(245,183,0,.8)]">10%</motion.span>
            <span><span className="block font-display text-lg font-bold text-white">10% off when you book online</span>
            <span className="block text-sm text-white/60">Pick your bus below and book on our booking page.</span></span>
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-marigold">Book now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
        </motion.a>

        <p className="mt-8 text-sm font-semibold text-white/60" aria-live="polite">
          <motion.span key={rows.length} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="inline-block font-display text-2xl font-extrabold text-white">{rows.length}</motion.span> buses found
        </p>

        <motion.ul layout className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((r, i) => {
              const bt = BUS_TYPES[r.type]
              const Seat = r.type === 'seater' ? Armchair : BedDouble
              const [hm, ap] = fmtTime(r.time).split(' ')
              return (
                <motion.li
                  layout
                  key={r.key}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease, delay: Math.min(i % 12, 12) * 0.03 } }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                >
                  <motion.a
                    ref={i === 0 ? cardRef : undefined}
                    href={CONTACT.bookUrl} target="_blank" rel="noopener"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="card-glass group relative flex h-full items-center gap-4 overflow-hidden rounded-[22px] p-3.5 sm:p-4"
                    style={{ backdropFilter: glassBackdrop }}
                  >
                    <span className="sheen" aria-hidden />
                    {/* time capsule */}
                    <div className="relative flex w-[78px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/[.07] py-3 ring-1 ring-inset ring-white/15 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-marigold group-hover:to-saffron group-hover:ring-transparent sm:w-[84px]">
                      <span className="font-display text-xl font-extrabold leading-none text-white transition-colors group-hover:text-ink">{hm}</span>
                      <span className="mt-1 text-[11px] font-bold tracking-widest text-marigold transition-colors group-hover:text-ink">{ap}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 font-display text-lg font-bold text-white">
                        {r.from}
                        <ArrowRight className="h-4 w-4 shrink-0 text-marigold transition-transform group-hover:translate-x-1" aria-hidden />
                      </p>
                      <p className="truncate text-[15px] font-semibold text-white/75" title={r.to}>{r.to}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${bt.tone}`}>
                          <Seat className="h-3.5 w-3.5" aria-hidden /> {bt.short}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/[.07] px-2.5 py-0.5 text-xs font-bold text-white/70 ring-1 ring-inset ring-white/10">
                          {bt.ac ? <Snowflake className="h-3.5 w-3.5" aria-hidden /> : <Wind className="h-3.5 w-3.5" aria-hidden />}
                          {bt.ac ? 'AC' : 'Non-AC'}
                        </span>
                      </div>
                    </div>
                  </motion.a>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>

        {isMobile && rows.length > MOBILE_LIMIT && (
          <motion.button
            layout
            onClick={() => {
              if (expanded) document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })
              setExpanded((e) => !e)
            }}
            whileTap={{ scale: 0.97 }}
            className="card-glass mx-auto mt-5 flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-2xl font-bold text-white"
            style={{ backdropFilter: 'blur(18px) saturate(180%)' }}
          >
            {expanded ? 'Show fewer' : `Show all ${rows.length} buses`}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }}><ChevronDown className="h-5 w-5 text-marigold" /></motion.span>
          </motion.button>
        )}

        {rows.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-glass mt-6 rounded-3xl p-10 text-center">
            <Search className="mx-auto h-8 w-8 text-white/50" />
            <p className="mt-3 font-display text-xl font-bold text-white">No direct bus on that pair</p>
            <p className="mt-1 text-white/60">Call the office on <a className="font-bold text-marigold underline" href={CONTACT.phoneHref}>{CONTACT.phone}</a> and we'll find you a connection.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
