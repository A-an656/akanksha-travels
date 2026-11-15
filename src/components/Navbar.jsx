import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from 'framer-motion'
import { Phone, Menu, X } from 'lucide-react'
import { CONTACT } from '../data'
import { ease } from './ui'
import Logo from './Logo'
import LiquidGlass from './LiquidGlass'

const LINKS = [
  { id: 'schedule', label: 'Timetable' },
  { id: 'routes', label: 'Routes' },
  { id: 'fleet', label: 'Fleet' },
  { id: 'parcel', label: 'Parcel' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 40)
    setHidden(y > prev && y > 400 && !open)
  })

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    LINKS.forEach((l) => { const el = document.getElementById(l.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-marigold to-saffron" />
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="container-x pt-3">
          <LiquidGlass
            radius={999} depth={40} tint={solid ? 'rgba(8,12,24,.45)' : 'rgba(255,255,255,.03)'}
            className="shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)] transition-[background] duration-500"
          >
          <nav className="flex h-[64px] items-center justify-between gap-4 pl-5 pr-2" aria-label="Main">
            <a href="#top" className="flex shrink-0 items-center" aria-label="Akanksha Tourism & Logistics, home">
              <Logo />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {LINKS.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05, ease }}>
                  <a href={`#${l.id}`} className="relative rounded-full px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:text-white">
                    {active === l.id && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/10" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <motion.a
                href={CONTACT.phoneHref}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
                className="hidden min-h-[48px] items-center gap-2 rounded-full bg-marigold px-5 text-sm font-bold text-ink sm:inline-flex"
              >
                <Phone className="h-4 w-4" aria-hidden /> {CONTACT.phone}
              </motion.a>
              <button
                onClick={() => setOpen((o) => !o)}
                className="liquid relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white lg:hidden"
                aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={open ? 'x' : 'm'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>
          </LiquidGlass>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.45, ease }}
              className="liquid liquid-dark relative mx-4 mt-2 overflow-hidden rounded-3xl lg:hidden"
            >
              <motion.ul className="container-x flex flex-col py-4" initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}>
                {LINKS.map((l) => (
                  <motion.li key={l.id} variants={{ h: { opacity: 0, x: -20 }, s: { opacity: 1, x: 0 } }}>
                    <a href={`#${l.id}`} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 font-display text-2xl font-bold text-white">
                      {l.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li variants={{ h: { opacity: 0 }, s: { opacity: 1 } }} className="pt-5">
                  <a href={CONTACT.phoneHref} className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-marigold font-bold text-ink">
                    <Phone className="h-4 w-4" /> Call {CONTACT.phone}
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
