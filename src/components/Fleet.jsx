import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Snowflake, Wind, BedDouble, Armchair, Check } from 'lucide-react'
import { SectionHeading, ease } from './ui'
import { CONTACT } from '../data'

const CLASSES = [
  {
    key: 'ac', name: 'AC Sleeper', icon: Snowflake, layout: 'sleeper',
    blurb: 'Our most booked class. Air-conditioned cabin, flat berths, a pillow, water bottle and charging point for every passenger.',
    points: ['Upper and lower berths', 'Pillow and water bottle', 'Reading light & charging point', 'Solapur, Akkalkot, Latur & more to Pune and Mumbai'],
  },
  {
    key: 'benz', name: 'Bharat Benz Sleeper / Seater', icon: BedDouble, layout: 'mixed',
    blurb: 'A Bharat Benz AC coach with sleeper berths and seats together. Good for families travelling with a mix of needs.',
    points: ['Mixed sleeper and seater layout', 'Air conditioned', 'From Solapur, Tuljapur and Lohara to Pune'],
  },
  {
    key: 'nonac', name: 'Non-AC Sleeper', icon: Wind, layout: 'sleeper',
    blurb: 'Full-length berths without the AC. It has the comfort of a sleeper at a lower fare.',
    points: ['Flat berths, upper and lower', 'Lower fare than AC', 'Solapur, Tuljapur and Lohara to Pune'],
  },
  {
    key: 'seater', name: 'Push Back Seater', icon: Armchair, layout: 'seater',
    blurb: 'Reclining push-back seats on the long northern run to Aurangabad, Manmad and Dhule, and south to Kolhapur.',
    points: ['Reclining push-back seats', 'Night departures to the north', 'Solapur → Kolhapur · Sangli · Miraj'],
  },
]

const DECKS = {
  sleeper: [
    { id: 'lower', label: 'Lower deck', kind: 'berth', rows: 6, plan: '1+2', prefix: 'L' },
    { id: 'upper', label: 'Upper deck', kind: 'berth', rows: 6, plan: '1+2', prefix: 'U' },
  ],
  mixed: [
    { id: 'lower', label: 'Lower · seats', kind: 'seat', rows: 8, plan: '1+2', prefix: 'S' },
    { id: 'upper', label: 'Upper · berths', kind: 'berth', rows: 6, plan: '1+2', prefix: 'U' },
  ],
  seater: [{ id: 'main', label: 'Seats', kind: 'seat', rows: 10, plan: '2+2', prefix: '' }],
}

// deterministic sample occupancy so the layout looks lived-in
const isBooked = (code) => [...code].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) % 97, 7) % 4 === 0
const isLadies = (n) => n % 7 === 3

function Steering() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-white/50" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.5" /><path d="M12 14.5V21M9.6 11.2 3.5 9.5M14.4 11.2l6.1-1.7" />
    </svg>
  )
}

function Spot({ code, n, kind, selected, onToggle }) {
  const booked = isBooked(code)
  const ladies = !booked && isLadies(n)
  const base = kind === 'berth' ? 'h-[62px] rounded-xl' : 'h-11 rounded-lg'
  const tone = booked
    ? 'cursor-not-allowed bg-white/[.06] text-white/25 [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,.07)_0_4px,transparent_4px_9px)]'
    : selected
      ? 'cursor-pointer bg-marigold text-ink shadow-[0_0_0_3px_rgba(245,183,0,.35),0_8px_20px_-6px_rgba(245,183,0,.7)]'
      : ladies
        ? 'cursor-pointer bg-pink-200 text-pink-900 hover:bg-pink-100'
        : 'cursor-pointer bg-white/90 text-ink hover:bg-white'
  return (
    <motion.button
      type="button"
      disabled={booked}
      aria-pressed={selected}
      aria-label={`${kind === 'berth' ? 'Berth' : 'Seat'} ${code}${booked ? ', booked' : ladies ? ', ladies' : ''}`}
      onClick={onToggle}
      variants={{ h: { opacity: 0, y: 10, scale: 0.85 }, s: { opacity: 1, y: 0, scale: 1 } }}
      whileHover={!booked ? { y: -3 } : {}}
      whileTap={!booked ? { scale: 0.9 } : {}}
      className={`relative flex w-full flex-col items-center justify-between overflow-hidden px-1 py-1.5 text-[11px] font-extrabold transition-colors ${base} ${tone}`}
    >
      {kind === 'berth' ? <span className={`h-2 w-[70%] rounded-full ${booked ? 'bg-white/10' : 'bg-ink/15'}`} /> : <span />}
      <AnimatePresence mode="wait" initial={false}>
        {selected ? (
          <motion.span key="c" initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
            <Check className="h-4 w-4" strokeWidth={3} />
          </motion.span>
        ) : (
          <motion.span key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{code}</motion.span>
        )}
      </AnimatePresence>
      {kind === 'seat' && <span className={`absolute inset-x-1.5 bottom-0 h-1.5 rounded-t ${booked ? 'bg-white/10' : 'bg-ink/20'}`} />}
    </motion.button>
  )
}

function SeatMap({ layout }) {
  const decks = DECKS[layout]
  const [deckIdx, setDeckIdx] = useState(0)
  const [picked, setPicked] = useState([])
  const deck = decks[deckIdx]
  const cols = deck.plan === '2+2' ? '1fr 1fr 18px 1fr 1fr' : '1fr 18px 1fr 1fr'
  const perRow = deck.plan === '2+2' ? 4 : 3
  const aisleAfter = deck.plan === '2+2' ? 2 : 1

  const toggle = (code) => setPicked((p) => (p.includes(code) ? p.filter((x) => x !== code) : p.length >= 6 ? p : [...p, code]))

  const cells = []
  let n = 0
  for (let r = 0; r < deck.rows; r++) {
    for (let c = 0; c < perRow; c++) {
      n += 1
      if (c === aisleAfter) cells.push(<span key={`aisle-${r}`} aria-hidden className="mx-auto w-px bg-white/10" />)
      const code = `${deck.prefix}${n}`
      cells.push(<Spot key={code} code={code} n={n} kind={deck.kind} selected={picked.includes(code)} onToggle={() => toggle(code)} />)
    }
  }

  return (
    <div className="liquid relative overflow-hidden rounded-3xl p-5" style={{ background: 'linear-gradient(160deg,#1B2742,#0B1220 70%)' }}>
      {decks.length > 1 && (
        <div className="mb-4 flex rounded-full bg-white/[.06] p-1" role="tablist" aria-label="Deck">
          {decks.map((d, i) => (
            <button key={d.id} role="tab" aria-selected={deckIdx === i} onClick={() => setDeckIdx(i)}
              className={`relative min-h-[38px] flex-1 cursor-pointer rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${deckIdx === i ? 'text-ink' : 'text-white/60 hover:text-white'}`}>
              {deckIdx === i && <motion.span layoutId={`deck-${layout}`} className="absolute inset-0 rounded-full bg-marigold" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className="relative">{d.label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="mb-3 flex items-center justify-between border-b border-dashed border-white/15 pb-3 text-[10px] font-bold uppercase tracking-[.2em] text-white/40">
        <span className="flex items-center gap-1.5"><span className="h-4 w-1 rounded bg-white/30" />Door</span>
        <span>Front</span>
        <Steering />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={deck.id}
          className="grid gap-2"
          style={{ gridTemplateColumns: cols }}
          initial="h" animate="s" exit={{ opacity: 0, x: -20, transition: { duration: 0.15 } }}
          variants={{ s: { transition: { staggerChildren: 0.015 } } }}
        >
          {cells}
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold text-white/60">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-white/90" />Available</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-pink-200" />Ladies</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-marigold" />Selected</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-white/10" />Booked</span>
      </div>

      <AnimatePresence>
        {picked.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-white/[.07] p-3">
              <p className="min-w-0 text-sm text-white">
                <span className="font-extrabold text-marigold">{picked.length}</span> picked: <span className="font-bold">{picked.join(', ')}</span>
              </p>
              <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} href={CONTACT.bookUrl} target="_blank" rel="noopener"
                className="shrink-0 rounded-full bg-marigold px-4 py-2 text-xs font-extrabold text-ink">Book now</motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="mt-3 text-[11px] text-white/40">Sample layout. Live seat availability is shown on the booking page.</p>
    </div>
  )
}

export default function Fleet() {
  const [active, setActive] = useState(0)
  const c = CLASSES[active]
  return (
    <section id="fleet" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="The fleet" title="Four ways to ride through the night." sub="Volvo, Scania, Mercedes-Benz and Bharat Benz coaches. Pick a class, switch decks, and tap a berth to see how it's laid out." />

        <div className="mt-14 grid gap-8 lg:grid-cols-[280px_1fr]">
          <div role="tablist" aria-label="Bus classes" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {CLASSES.map((k, i) => (
              <button
                key={k.key} role="tab" aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`relative flex min-h-[56px] shrink-0 cursor-pointer items-center gap-3 rounded-2xl px-5 text-left font-bold transition-colors ${active === i ? 'text-white' : 'text-ink hover:bg-ink/5'}`}
              >
                {active === i && <motion.span layoutId="fleet-tab" className="absolute inset-0 rounded-2xl bg-ink" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
                <k.icon className={`relative h-5 w-5 shrink-0 ${active === i ? 'text-marigold' : 'text-saffron-deep'}`} aria-hidden />
                <span className="relative whitespace-nowrap">{k.name}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={c.key} role="tabpanel"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease }}
              className="grid gap-6 rounded-[2rem] bg-white p-6 shadow-sm sm:p-8 md:grid-cols-[1fr_minmax(0,380px)]"
            >
              <div>
                <h3 className="font-display text-3xl font-extrabold text-ink">{c.name}</h3>
                <p className="mt-3 text-lg leading-relaxed text-muted">{c.blurb}</p>
                <ul className="mt-6 space-y-3">
                  {c.points.map((pt, i) => (
                    <motion.li key={pt} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.07 }} className="flex items-start gap-3 font-semibold text-body">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-marigold/25 text-saffron-deep"><Check className="h-4 w-4" /></span>
                      {pt}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <SeatMap layout={c.layout} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
