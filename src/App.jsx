import { useState, useCallback } from 'react'
import { MotionConfig, AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Phone, Ticket } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { CityMarquee, Stats } from './components/Highlights'
import Schedule from './components/Schedule'
import Journey from './components/Journey'
import RouteMap from './components/RouteMap'
import Fleet from './components/Fleet'
import Parcel from './components/Parcel'
import Amenities from './components/Amenities'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { CONTACT } from './data'
import LiquidFilters from './components/LiquidFilters'
import Intro from './components/Intro'
import LiquidGlass from './components/LiquidGlass'

function MobileBar() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [300, 500], [120, 0])
  return (
    <motion.div style={{ y }} className="fixed inset-x-3 bottom-3 z-40 sm:hidden">
      <LiquidGlass radius={24} depth={36} tint="rgba(8,12,24,.5)" className="flex gap-2 p-2 shadow-2xl">
      <a href={CONTACT.phoneHref} className="relative flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 font-bold text-white">
        <span className="absolute left-4 flex h-2.5 w-2.5"><span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" /></span>
        <Phone className="h-4 w-4" /> Call
      </a>
      <a href={CONTACT.bookUrl} target="_blank" rel="noopener" className="flex min-h-[48px] flex-[1.4] items-center justify-center gap-2 rounded-xl bg-marigold font-bold text-ink">
        <Ticket className="h-4 w-4" /> Book · 10% off
      </a>
      </LiquidGlass>
    </motion.div>
  )
}

export default function App() {
  const [filter, setFilter] = useState({ from: 'all', to: '', type: 'all' })
  const [ready, setReady] = useState(false)
  const done = useCallback(() => setReady(true), [])
  return (
    <MotionConfig reducedMotion="user">
      <LiquidFilters />
      <AnimatePresence>{!ready && <Intro onDone={done} />}</AnimatePresence>
      {ready && (<>
      <a href="#schedule" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-marigold focus:px-4 focus:py-2 focus:font-bold focus:text-ink">Skip to timetable</a>
      <Navbar />
      <main>
        <Hero onSearch={({ from, to }) => setFilter({ from, to, type: 'all' })} />
        <CityMarquee />
        <Stats />
        <Schedule filter={filter} setFilter={setFilter} />
        <Journey />
        <RouteMap />
        <Fleet />
        <Parcel />
        <Amenities />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
      </>)}
    </MotionConfig>
  )
}
