import { motion } from 'framer-motion'
import { Bus, MapPinned, Clock3, Package } from 'lucide-react'
import { ORIGINS, TOTAL_DEPARTURES } from '../data'
import { CountUp, fadeUp, stagger } from './ui'

const CITIES = ['Solapur', 'Pune', 'Mumbai', 'Akkalkot', 'Tuljapur', 'Latur', 'Osmanabad', 'Pandharpur', 'Aurangabad', 'Beed', 'Dhule', 'Malegaon', 'Manmad', 'Yeola', 'Kolhapur', 'Sangli', 'Miraj', 'Ausa', 'Lohara', 'Murum', 'Patoda', 'Ujani']

export function CityMarquee() {
  const row = [...CITIES, ...CITIES]
  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-marigold py-4" aria-label="Cities we serve">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        {row.map((c, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-xl font-bold uppercase tracking-wide text-ink">
            {c}
            <Bus className="h-5 w-5 text-saffron-deep" aria-hidden />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function Stats() {
  const items = [
    { icon: Clock3, n: TOTAL_DEPARTURES, s: '+', l: 'departures every night' },
    { icon: MapPinned, n: ORIGINS.length, s: '', l: 'boarding towns' },
    { icon: Bus, n: 4, s: '', l: 'bus classes, AC to seater' },
    { icon: Package, n: 7, s: ' days', l: 'parcel service, every week' },
  ]
  return (
    <section className="bg-cream py-16 sm:py-20">
      <motion.div
        className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4"
        variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
      >
        {items.map(({ icon: Icon, n, s, l }) => (
          <motion.div
            key={l} variants={fadeUp}
            whileHover={{ y: -6 }}
            className="group rounded-3xl border border-ink/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-lift"
          >
            <motion.span
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-marigold"
              whileHover={{ rotate: -12, scale: 1.1 }}
            >
              <Icon className="h-6 w-6" aria-hidden />
            </motion.span>
            <p className="mt-5 font-display text-4xl font-extrabold text-ink sm:text-5xl"><CountUp to={n} suffix={s} /></p>
            <p className="mt-1 text-sm font-semibold text-muted">{l}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
