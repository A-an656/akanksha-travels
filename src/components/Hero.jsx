import { useRef, useState } from 'react'
import { asset } from '../asset'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowLeftRight, ArrowRight, CalendarDays, MapPin, Navigation, Package, Search } from 'lucide-react'
import { ORIGINS, DESTINATIONS, CONTACT } from '../data'
import { ease, Button } from './ui'
import LiquidGlass from './LiquidGlass'

const words = ['Sleep', 'in', 'Solapur.']
const words2 = ['Wake', 'up', 'in', 'Pune.']

function OfferSticker({ className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.a
      href={CONTACT.bookUrl} target="_blank" rel="noopener"
      aria-label="10% off when you book online"
      initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 1.6 }}
      whileHover={{ scale: 1.08 }}
      className={`flex h-24 w-24 items-center justify-center rounded-full bg-marigold text-ink shadow-[0_15px_40px_-10px_rgba(245,183,0,.7)] sm:h-32 sm:w-32 ${className}`}
    >
      <motion.svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }} aria-hidden>
        <defs><path id="ring" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" /></defs>
        <text fontSize="9.5" fontWeight="800" letterSpacing="2.4" fill="#0B1220"><textPath href="#ring" textLength="236" lengthAdjust="spacing">BOOK ONLINE · SAVE MORE · </textPath></text>
      </motion.svg>
      <span className="relative text-center font-display leading-none">
        <span className="block text-3xl font-extrabold sm:text-4xl">10%</span>
        <span className="block text-xs font-extrabold tracking-widest">OFF</span>
      </span>
    </motion.a>
  )
}

export default function Hero({ onSearch }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const busX = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const skyY = useTransform(scrollYProgress, [0, 1], [0, 80])

  const [from, setFrom] = useState('Solapur')
  const [to, setTo] = useState('Pune')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [spin, setSpin] = useState(0)

  const swap = () => {
    setSpin((s) => s + 180)
    if (DESTINATIONS.includes(from) && ORIGINS.includes(to)) { setFrom(to); setTo(from) }
  }
  const submit = (e) => {
    e.preventDefault()
    onSearch({ from, to })
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })
  }
  const wordAnim = (i, base = 0) => ({
    initial: { y: '110%', rotate: 4 },
    animate: { y: '0%', rotate: 0 },
    transition: { duration: 0.9, ease, delay: base + i * 0.08 },
  })

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#070C18] pt-28">
      {/* night sky */}
      <div aria-hidden className="absolute inset-0 -z-30 bg-[radial-gradient(120%_70%_at_70%_100%,#3A1C10_0%,#1A1424_35%,#070C18_70%)]" />
      <div aria-hidden className="absolute inset-0 -z-30">
        {Array.from({ length: 70 }).map((_, i) => (
          <motion.span key={i} className="absolute rounded-full bg-white"
            style={{ left: `${(i * 53) % 100}%`, top: `${(i * 29) % 60}%`, width: i % 7 ? 2 : 3, height: i % 7 ? 2 : 3 }}
            animate={reduce ? {} : { opacity: [0.15, 0.9, 0.15] }} transition={{ duration: 2 + (i % 5), repeat: Infinity, delay: (i % 10) * 0.3 }} />
        ))}
      </div>
      <motion.div aria-hidden className="absolute right-[8%] top-[16%] -z-20 hidden h-24 w-24 sm:block rounded-full bg-[radial-gradient(circle_at_35%_35%,#FFF6D6,#FFD978_60%,#E9A93A)] shadow-[0_0_80px_20px_rgba(255,214,120,.25)]"
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.6, ease }} />

      {/* big wordmark rising after open */}
      <motion.div style={{ y: skyY }} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[150px] -z-20 flex select-none justify-center overflow-hidden sm:bottom-[170px]">
        {'akanksha'.split('').map((c, i) => (
          <motion.span key={i}
            className="inline-block bg-gradient-to-b from-white/[.13] via-white/[.05] to-transparent bg-clip-text font-display text-[19vw] font-extrabold leading-[0.8] tracking-[-0.04em] text-transparent"
            initial={{ y: '100%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }} transition={{ duration: 1.1, ease, delay: 0.5 + i * 0.07 }}>
            {c}
          </motion.span>
        ))}
      </motion.div>

      {/* moving city skyline */}
      <motion.div aria-hidden
        className="absolute inset-x-0 bottom-[92px] -z-10 h-[120px] sm:h-[160px]"
        style={{ backgroundImage: `url(${asset('img/skyline.png')})`, backgroundRepeat: 'repeat-x', backgroundSize: 'auto 100%', backgroundPosition: '0 bottom' }}
        initial={{ opacity: 0 }} animate={reduce ? { opacity: 0.3 } : { opacity: 0.3, backgroundPositionX: ['0px', '-1910px'] }}
        transition={{ opacity: { duration: 1.2, delay: 0.3 }, backgroundPositionX: { duration: 80, repeat: Infinity, ease: 'linear' } }}
      />

      {/* road */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[92px] bg-[#05080F]">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-marigold/50 to-transparent" />
        <motion.div className="absolute top-1/2 flex w-[200%] -translate-y-1/2 gap-12"
          animate={reduce ? {} : { x: ['0%', '-50%'] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
          {Array.from({ length: 40 }).map((_, i) => <span key={i} className="h-1.5 w-20 shrink-0 rounded bg-white/25" />)}
        </motion.div>
      </div>

      {/* content */}
      <motion.div style={{ y: textY }} className="container-x relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="liquid relative mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-marigold opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-marigold" />
            </span>
            Buses leave every night, 7:45 PM to 3:45 AM
          </motion.div>

          <h1 className="font-display text-[clamp(2.6rem,6vw,5.4rem)] font-extrabold leading-[0.95] tracking-tight">
            <span className="block">
              {words.map((w, i) => (
                <span key={w} className="mr-[.22em] inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span className="glass-text inline-block" {...wordAnim(i, 0.3)}>{w}</motion.span>
                </span>
              ))}
            </span>
            <span className="block">
              {words2.map((w, i) => (
                <span key={w} className="mr-[.22em] inline-block overflow-hidden pb-2 align-bottom">
                  <motion.span className={`inline-block ${w === 'Pune.' ? 'liquid-text' : 'glass-text'}`} {...wordAnim(i, 0.55)}>{w}</motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 1 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            AC and Non-AC sleeper buses from Solapur, Akkalkot, Tuljapur, Latur and nine more towns to Pune, Mumbai,
            Aurangabad and Dhule. Your parcels ride with us too, every single day.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 1.15 }}
            className="mt-7 flex flex-wrap gap-3">
            <Button href={CONTACT.bookUrl} target="_blank" rel="noopener" icon={ArrowRight}>Book online · 10% off</Button>
            <Button href="#parcel" variant="ghost" icon={Package}>Send a parcel</Button>
          </motion.div>
        </div>

        {/* liquid glass search bar */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 1.2 }} className="mt-10 max-w-[860px]">
          <LiquidGlass as="form" onSubmit={submit} aria-label="Find a bus" radius={28} depth={56} tint="rgba(10,16,30,.28)"
            className="grid grid-cols-2 gap-1 p-2 shadow-[0_30px_70px_-20px_rgba(0,0,0,.7)] md:grid-cols-[1fr_auto_1fr_1fr_auto] md:items-center">
            <label className="rounded-[20px] px-4 py-3 transition-colors hover:bg-white/[.06]">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/55"><MapPin className="h-3.5 w-3.5" />From</span>
              <select value={from} onChange={(e) => setFrom(e.target.value)} className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent text-lg font-bold text-white outline-none">
                {ORIGINS.map((o) => <option key={o} className="text-ink">{o}</option>)}
              </select>
            </label>
            <motion.button type="button" onClick={swap} aria-label="Swap from and to"
              animate={{ rotate: spin }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="hidden h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 md:flex">
              <ArrowLeftRight className="h-4 w-4" />
            </motion.button>
            <label className="rounded-[20px] px-4 py-3 transition-colors hover:bg-white/[.06]">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/55"><Navigation className="h-3.5 w-3.5" />To</span>
              <select value={to} onChange={(e) => setTo(e.target.value)} className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent text-lg font-bold text-white outline-none">
                <option value="" className="text-ink">Anywhere</option>
                {DESTINATIONS.map((o) => <option key={o} className="text-ink">{o}</option>)}
              </select>
            </label>
            <label className="rounded-[20px] px-4 py-3 transition-colors hover:bg-white/[.06]">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/55"><CalendarDays className="h-3.5 w-3.5" />Date</span>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-0.5 w-full bg-transparent text-lg font-bold text-white outline-none [color-scheme:dark]" />
            </label>
            <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
              className="group relative flex min-h-[60px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[22px] bg-gradient-to-r from-marigold to-saffron px-7 font-bold text-ink md:min-h-[64px]">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Search className="relative h-5 w-5" /><span className="relative">Search</span>
            </motion.button>
          </LiquidGlass>
        </motion.div>
      </motion.div>

      {/* the real Akanksha coach driving in */}
      <motion.div
        style={{ x: busX }}
        className="pointer-events-none relative z-0 ml-auto mt-16 w-[min(94vw,700px)] sm:mt-10 self-end pb-[40px] lg:absolute lg:bottom-[52px] lg:right-[3vw] lg:mt-0 lg:pb-0"
      >
        <motion.div initial={{ x: '-120vw' }} animate={{ x: 0 }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} className="relative">
          <motion.div aria-hidden className="absolute bottom-[14%] right-[-26%] h-[32%] w-[40%] bg-[radial-gradient(ellipse_at_left,rgba(255,240,190,.55),transparent_70%)] blur-md"
            animate={reduce ? {} : { opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.4, repeat: Infinity }} />
          <div aria-hidden className="absolute inset-x-[6%] bottom-[2%] h-[10%] rounded-[50%] bg-black/70 blur-xl" />
          <motion.img
            src={asset('img/pink-bus.webp')} alt="Akanksha Volvo sleeper coach" width="1296" height="772" fetchPriority="high"
            className="relative w-full drop-shadow-[0_20px_40px_rgba(0,0,0,.5)]"
            animate={reduce ? {} : { y: [0, -3, 0] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <OfferSticker className="pointer-events-auto absolute -top-6 left-[8%] sm:-top-10" />
        </motion.div>
      </motion.div>
    </section>
  )
}
