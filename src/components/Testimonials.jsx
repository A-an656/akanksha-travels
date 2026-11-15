import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { TESTIMONIALS } from '../data'
import { SectionHeading, ease } from './ui'

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-cream py-20 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Passengers" title="Regulars, not one-time riders." sub="What people who ride with us say about the trip." />
        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mt-14 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px 0px -60px 0px', amount: 0 }}
              transition={{ duration: 0.8, ease, delay: (i % 2) * 0.12 }}
              whileHover={{ y: -6 }}
              className={`relative w-[85%] shrink-0 snap-center overflow-hidden rounded-[2rem] p-6 shadow-sm transition-shadow hover:shadow-lift sm:p-8 md:w-auto ${i === 0 ? 'bg-ink text-white' : 'bg-white'}`}
            >
              <Quote className={`absolute right-6 top-6 h-16 w-16 ${i === 0 ? 'text-white/10' : 'text-ink/5'}`} aria-hidden />
              <div className="flex gap-1" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <motion.span key={s} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + s * 0.08, type: 'spring' }}>
                    <Star className="h-5 w-5 fill-marigold text-marigold" aria-hidden />
                  </motion.span>
                ))}
              </div>
              <blockquote className={`mt-5 text-lg leading-relaxed ${i === 0 ? 'text-white/85' : 'text-body'}`}>“{t.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-marigold to-saffron font-display text-lg font-extrabold text-ink">{t.name[0]}</span>
                <span>
                  <span className={`block font-bold ${i === 0 ? 'text-white' : 'text-ink'}`}>{t.name}</span>
                  <span className={`block text-sm ${i === 0 ? 'text-white/60' : 'text-muted'}`}>{t.trip}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <p className="mt-2 flex items-center justify-center gap-2 text-xs font-semibold text-muted md:hidden">
          <motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>→</motion.span> Swipe for more reviews
        </p>
      </div>
    </section>
  )
}
