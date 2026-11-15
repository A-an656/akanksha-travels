import { motion } from 'framer-motion'
import { Phone, ArrowUp } from 'lucide-react'
import { CONTACT } from '../data'
import Logo from './Logo'

const LINKS = [
  ['Timetable', '#schedule'], ['Routes', '#routes'], ['Fleet', '#fleet'], ['Parcel service', '#parcel'],
  ['Book online', CONTACT.bookUrl], ['Live tracking', CONTACT.trackUrl], ['Agent login', CONTACT.agentUrl], ['Android app', CONTACT.appUrl],
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#070B14] pb-28 pt-20 text-white sm:pb-10">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo animate={false} />
            <p className="mt-5 max-w-sm text-white/60">Overnight sleeper buses and daily parcel service from Solapur. Wishing you a happy and comfortable journey.</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-semibold text-white/70">
              {LINKS.map(([l, h]) => (
                <li key={l}><a href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noopener" className="transition-colors hover:text-marigold">{l}</a></li>
              ))}
            </ul>
          </nav>
          <div className="text-sm text-white/70">
            <p className="font-bold text-white">Head office</p>
            <p className="mt-2">{CONTACT.office}</p>
            <a href={CONTACT.phoneHref} className="mt-4 inline-flex items-center gap-2 font-bold text-marigold"><Phone className="h-4 w-4" />{CONTACT.phone}</a>
          </div>
        </div>


        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50">
          <p>© {new Date().getFullYear()} Akanksha Travels, Solapur. Parcel photos: Unsplash.</p>
          <motion.a href="#top" whileHover={{ y: -3 }} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-white/70 hover:text-white">
            Back to top <ArrowUp className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
