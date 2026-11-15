import { motion } from 'framer-motion'
import { BatteryCharging, Satellite, Lamp, BriefcaseMedical, GlassWater, DoorOpen, FireExtinguisher, MapPin, BedSingle, Wifi, Tv, Armchair } from 'lucide-react'
import { SectionHeading, fadeUp, stagger } from './ui'

const ITEMS = [
  { icon: BatteryCharging, l: 'Charging point' },
  { icon: Satellite, l: 'Live bus tracking' },
  { icon: Lamp, l: 'Reading light' },
  { icon: BedSingle, l: 'Pillow' },
  { icon: GlassWater, l: 'Water bottle' },
  { icon: MapPin, l: 'Free pickup' },
  { icon: Wifi, l: 'WiFi' },
  { icon: Tv, l: 'Central TV' },
  { icon: Armchair, l: 'Comfortable seats' },
  { icon: BriefcaseMedical, l: 'First aid box' },
  { icon: FireExtinguisher, l: 'Fire extinguisher' },
  { icon: DoorOpen, l: 'Emergency exit' },
]

export default function Amenities() {
  return (
    <section className="bg-cream-2 py-20 sm:py-32">
      <div className="container-x">
        <SectionHeading center eyebrow="On board" title="Small things that make a long night easy." />
        <motion.ul
          className="mt-10 grid grid-cols-3 gap-2 sm:mt-14 sm:gap-3 lg:grid-cols-6"
          variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
        >
          {ITEMS.map(({ icon: Icon, l }) => (
            <motion.li
              key={l} variants={fadeUp}
              whileHover="hover"
              className="group flex flex-col items-center gap-2 rounded-2xl bg-white px-2 py-4 text-center shadow-sm transition-shadow hover:shadow-lift sm:gap-3 sm:rounded-3xl sm:p-6"
            >
              <motion.span
                variants={{ hover: { rotate: [0, -12, 10, 0], scale: 1.15, transition: { duration: 0.5 } } }}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-marigold/20 sm:h-14 sm:w-14 sm:rounded-2xl text-saffron-deep transition-colors group-hover:bg-ink group-hover:text-marigold"
              >
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
              </motion.span>
              <span className="text-xs font-bold leading-tight text-ink sm:text-sm">{l}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
