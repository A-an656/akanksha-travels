import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionHeading } from './ui'

// lon/lat → map coords
const P = (lon, lat) => [Math.round((lon - 72.4) * 118), Math.round((21.3 - lat) * 118)]
const C = {
  Mumbai: P(72.88, 19.08), Pune: P(73.86, 18.52), Solapur: P(75.91, 17.66), Akkalkot: P(76.2, 17.52),
  Tuljapur: P(76.07, 18.01), Osmanabad: P(76.04, 18.18), Latur: P(76.56, 18.4), Ausa: P(76.5, 18.25),
  Lohara: P(76.35, 17.95), Murum: P(76.47, 17.78), Ujani: P(76.35, 18.12), Patoda: P(75.48, 18.8),
  Beed: P(75.76, 18.99), Pandharpur: P(75.33, 17.68), Aurangabad: P(75.34, 19.88), Yeola: P(74.48, 20.04),
  Manmad: P(74.44, 20.25), Malegaon: P(74.53, 20.55), Dhule: P(74.77, 20.9), Kolhapur: P(74.24, 16.7),
  Sangli: P(74.58, 16.85), Miraj: P(74.64, 16.82),
}
const LABEL = ['Mumbai', 'Pune', 'Solapur', 'Akkalkot', 'Tuljapur', 'Latur', 'Osmanabad', 'Beed', 'Pandharpur', 'Aurangabad', 'Dhule', 'Malegaon', 'Kolhapur', 'Sangli']

const line = (...names) => names.map((n, i) => `${i ? 'L' : 'M'}${C[n][0]} ${C[n][1]}`).join(' ')

const ROUTES = [
  { id: 'west', name: 'Solapur → Pune → Mumbai', d: line('Akkalkot', 'Solapur', 'Pune', 'Mumbai'), color: '#F5B700' },
  { id: 'marathwada', name: 'Latur · Ausa · Tuljapur feeder', d: line('Latur', 'Ausa', 'Ujani', 'Tuljapur', 'Solapur'), color: '#F26B1D' },
  { id: 'lohara', name: 'Murum · Lohara feeder', d: line('Murum', 'Lohara', 'Tuljapur'), color: '#F26B1D' },
  { id: 'patoda', name: 'Patoda → Pune', d: line('Patoda', 'Pune'), color: '#F5B700' },
  { id: 'north', name: 'Solapur → Dhule corridor', d: line('Solapur', 'Osmanabad', 'Beed', 'Aurangabad', 'Yeola', 'Manmad', 'Malegaon', 'Dhule'), color: '#38BDF8' },
  { id: 'pandharpur', name: 'Pandharpur → North', d: line('Pandharpur', 'Patoda', 'Beed'), color: '#38BDF8' },
  { id: 'south', name: 'Solapur → Kolhapur', d: line('Solapur', 'Pandharpur', 'Miraj', 'Sangli', 'Kolhapur'), color: '#A78BFA' },
]

export default function RouteMap() {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState(null)
  return (
    <section id="routes" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-saffron/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="container-x grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <SectionHeading
            light
            eyebrow="Our network"
            title="From Marathwada to the coast, every night."
            sub="Twenty-two towns on one network. Board in a small town, change nothing, and wake up in the city."
          />
          <ul className="mt-10 space-y-2">
            {ROUTES.filter((r, i, a) => a.findIndex((x) => x.name === r.name) === i).map((r, i) => (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                onMouseEnter={() => setHover(r.id)} onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(r.id)} onBlur={() => setHover(null)} tabIndex={0}
                className={`flex cursor-default items-center gap-3 rounded-xl px-4 py-3 transition-colors ${hover === r.id ? 'bg-white/10' : ''}`}
              >
                <span className="h-1 w-8 rounded-full" style={{ background: r.color }} />
                <span className="font-semibold text-white/85">{r.name}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="relative rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 sm:p-8"
        >
          <svg viewBox="0 0 560 620" className="h-auto w-full" role="img" aria-label="Map of Akanksha bus routes across Maharashtra">
            <defs>
              <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#fff" opacity=".08" />
              </pattern>
              <filter id="glow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <rect width="560" height="620" fill="url(#grid)" />
            {/* coastline hint */}
            <path d="M40 60 C 50 160, 40 220, 55 300 S 70 450, 110 560" stroke="#38BDF8" strokeOpacity=".25" strokeWidth="2" fill="none" strokeDasharray="4 6" />
            <text x="24" y="420" fill="#38BDF8" opacity=".35" fontSize="12" fontWeight="700" transform="rotate(-80 24 420)" letterSpacing="4">ARABIAN SEA</text>

            {ROUTES.map((r, i) => (
              <g key={r.id} opacity={hover && hover !== r.id ? 0.18 : 1} style={{ transition: 'opacity .3s' }}>
                <motion.path
                  d={r.d} fill="none" stroke={r.color} strokeWidth={hover === r.id ? 5 : 3} strokeLinecap="round" strokeLinejoin="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                  transition={{ duration: 1.8, delay: 0.3 + i * 0.18, ease: 'easeInOut' }}
                />
                {!reduce && (
                  <circle r="5" fill="#fff">
                    <animateMotion dur={`${5 + i}s`} repeatCount="indefinite" path={r.d} begin={`${2 + i * 0.3}s`} />
                  </circle>
                )}
              </g>
            ))}

            {Object.entries(C).map(([n, [x, y]], i) => {
              const big = ['Solapur', 'Pune', 'Mumbai'].includes(n)
              return (
                <motion.g key={n} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.05 }}>
                  {big && !reduce && (
                    <motion.circle cx={x} cy={y} r="10" fill="none" stroke="#F5B700" animate={{ r: [8, 22], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                  )}
                  <circle cx={x} cy={y} r={big ? 7 : 4} fill={big ? '#F5B700' : '#fff'} stroke="#0B1220" strokeWidth="2" />
                  {LABEL.includes(n) && (
                    <text x={x + (n === 'Mumbai' ? 12 : 10)} y={y + 4} fill="#fff" fontSize={big ? 15 : 12} fontWeight={big ? 800 : 600} opacity={big ? 1 : 0.7}
                      fontFamily="Manrope, sans-serif">{n}</text>
                  )}
                </motion.g>
              )
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
