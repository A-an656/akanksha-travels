import { useEffect } from 'react'
import { asset } from '../asset'
import { motion, useReducedMotion } from 'framer-motion'
import { ease } from './ui'

const TAGLINE = 'Happy & comfortable journey'
const DURATION = 3000

/** 3-second opening: bus drives in, the name writes itself, then the curtain lifts. */
export default function Intro({ onDone }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    // warm the hero image while the intro plays
    const img = new Image(); img.src = asset('img/skyline.png')
    const t = setTimeout(onDone, reduce ? 900 : DURATION)
    return () => clearTimeout(t)
  }, [onDone, reduce])

  return (
    <motion.div
      key="intro"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-ink"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      role="status" aria-label="Loading Akanksha Travels"
    >
      {/* glow */}
      <motion.div
        className="pointer-events-none absolute h-[60vmin] w-[60vmin] rounded-full bg-saffron/25 blur-[100px]"
        initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1.2, opacity: 1 }} transition={{ duration: 2.4, ease }}
      />

      {/* Marathi name, hand-drawn stroke then fill */}
      <svg viewBox="0 0 600 170" className="relative w-[min(86vw,620px)]" aria-hidden>
        <defs>
          <linearGradient id="intro-grad" x1="0" x2="1">
            <stop offset="0" stopColor="#F5B700" />
            <stop offset="1" stopColor="#F26B1D" />
          </linearGradient>
        </defs>
        <motion.text
          x="50%" y="125" textAnchor="middle"
          fontFamily="Mukta, sans-serif" fontWeight="800" fontSize="140"
          stroke="url(#intro-grad)" strokeWidth="2.5"
          initial={{ strokeDasharray: 1400, strokeDashoffset: 1400, fill: 'rgba(245,183,0,0)' }}
          animate={{ strokeDashoffset: 0, fill: 'rgba(245,183,0,1)' }}
          transition={{ strokeDashoffset: { duration: 1.5, ease: 'easeInOut' }, fill: { duration: 0.6, delay: 1.2 } }}
        >
          आकांक्षा
        </motion.text>
      </svg>

      {/* English wordmark letters */}
      <div className="relative mt-1 flex overflow-hidden font-display text-2xl font-extrabold uppercase tracking-[.35em] text-white sm:text-3xl" aria-hidden>
        {'AKANKSHA'.split('').map((c, i) => (
          <motion.span key={i} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.6, ease, delay: 0.9 + i * 0.05 }}>
            {c}
          </motion.span>
        ))}
      </div>
      <motion.p
        className="relative mt-2 text-xs font-bold uppercase tracking-[.4em] text-marigold sm:text-sm"
        initial={{ opacity: 0, letterSpacing: '0.1em' }} animate={{ opacity: 1, letterSpacing: '0.4em' }}
        transition={{ duration: 1, delay: 1.4, ease }}
      >
        Tourism &amp; Logistics · Solapur
      </motion.p>
      <motion.p
        className="relative mt-5 text-sm text-white/50"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}
      >
        {TAGLINE}
      </motion.p>

      {/* road + bus */}
      <div className="absolute inset-x-0 bottom-[10vh]">
        <motion.div
          className="mx-auto h-[2px] w-[90vw] origin-left bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, ease }}
        />
        <motion.div
          className="absolute bottom-[-6px] left-0 w-[min(52vw,300px)]"
          initial={{ x: '-110%' }}
          animate={{ x: ['-110%', 'calc(50vw - 50%)', 'calc(50vw - 50%)', '110vw'] }}
          transition={{ duration: 2.9, times: [0, 0.42, 0.78, 1], ease: ['easeOut', 'linear', 'easeIn'] }}
        >
          <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 0.35, repeat: Infinity }}>
            <img src={asset('img/pink-bus.webp')} alt="" className="w-full drop-shadow-[0_10px_20px_rgba(0,0,0,.6)]" />
          </motion.div>
        </motion.div>
      </div>

      {/* progress */}
      <div className="absolute bottom-[5vh] h-1 w-40 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full origin-left rounded-full bg-gradient-to-r from-marigold to-saffron"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: (reduce ? 900 : DURATION) / 1000, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
