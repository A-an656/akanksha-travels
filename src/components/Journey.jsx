import { useEffect, useRef, useState } from 'react'
import { asset } from '../asset'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

const STEPS = [
  { t: 'Evening', h: 'Board near home', p: 'Pickups across Solapur, Akkalkot, Tuljapur, Latur and nine more towns.' },
  { t: 'Night', h: 'Lights down, berth ready', p: 'Pillow, water bottle, charging point and reading light on board.' },
  { t: 'Highway', h: 'Tracked the whole way', p: 'Live GPS tracking, so family at home can follow the bus too.' },
  { t: 'Morning', h: 'Wake up in Pune or Mumbai', p: 'Step off rested, with the whole day still ahead of you.' },
]

function Step({ i, progress, step, solo }) {
  const start = 0.12 + i * 0.2
  const opacity = useTransform(progress, [start - 0.08, start, start + 0.16, start + 0.22], [0, 1, 1, i === 3 ? 1 : solo ? 0 : 0.25])
  const y = useTransform(progress, [start - 0.08, start], [30, 0])
  return (
    <motion.div style={{ opacity, y }} className="border-l-2 border-marigold/60 pl-5">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-marigold">{step.t}</p>
      <p className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">{step.h}</p>
      <p className="mt-1 max-w-sm text-white/70">{step.p}</p>
    </motion.div>
  )
}

export default function Journey() {
  const [solo, setSolo] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const on = () => setSolo(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.4 })

  const busX = useTransform(p, [0, 1], ['-10%', '78%'])
  const sky = useTransform(p, [0, 0.25, 0.7, 1], ['#3B2A5C', '#0B1220', '#0B1220', '#9A3412'])
  const skyTop = useTransform(p, [0, 0.25, 0.7, 1], ['#E8794A', '#060B16', '#060B16', '#F59E0B'])
  const moonY = useTransform(p, [0, 0.3, 0.75, 0.9], [120, 0, 0, 160])
  const sunY = useTransform(p, [0.75, 1], [160, 0])
  const moonO = useTransform(p, [0, 0.15, 0.75, 0.85], [0, 1, 1, 0])
  const sunO = useTransform(p, [0.78, 0.9], [0, 1])
  const stars = useTransform(p, [0.1, 0.3, 0.75, 0.9], [0, 1, 1, 0])
  const photo = useTransform(p, [0, 0.3, 0.7, 1], [0.25, 0.4, 0.4, 0.5])
  const lane = useTransform(p, [0, 1], [0, -800])
  const beam = useTransform(p, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.2])
  const busFilter = useTransform(p, [0, 0.25, 0.75, 1], ['brightness(0.9)', 'brightness(0.55) saturate(0.8)', 'brightness(0.55) saturate(0.8)', 'brightness(1)'])

  return (
    <section id="journey" ref={ref} className="relative h-[320vh] bg-ink" aria-label="An overnight journey with Akanksha">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ background: sky }} className="absolute inset-0" />
        <motion.div style={{ background: skyTop }} className="absolute inset-x-0 top-0 h-2/3 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <motion.div aria-hidden style={{ opacity: photo, x: lane, backgroundImage: `url(${asset('img/skyline.png')})` }} className="absolute inset-x-0 bottom-[22%] h-[150px] w-[300%] bg-[length:auto_100%] bg-bottom bg-repeat-x" />

        {/* stars */}
        <motion.div style={{ opacity: stars }} className="absolute inset-0" aria-hidden>
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-[2px] w-[2px] rounded-full bg-white"
              style={{ left: `${(i * 37) % 100}%`, top: `${(i * 23) % 55}%` }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </motion.div>

        <motion.div style={{ y: moonY, opacity: moonO }} className="absolute right-[12%] top-[14%] text-marigold-soft" aria-hidden>
          <Moon className="h-16 w-16 fill-current drop-shadow-[0_0_30px_rgba(255,224,138,.6)]" />
        </motion.div>
        <motion.div style={{ y: sunY, opacity: sunO }} className="absolute right-[12%] top-[14%] text-marigold" aria-hidden>
          <Sun className="h-20 w-20 fill-current drop-shadow-[0_0_40px_rgba(245,183,0,.8)]" />
        </motion.div>

        <div className="container-x relative z-10 pt-28">
          <p className="eyebrow bg-white/10 text-marigold"><span className="h-1.5 w-1.5 rounded-full bg-current" />The overnight run</p>
          <h2 className="mt-4 max-w-2xl font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            You sleep. <span className="text-marigold">We drive.</span>
          </h2>
          {/* phones: one step at a time in the same spot; larger screens: 2x2 */}
          <div className="mt-8 grid max-w-3xl gap-6 [&>*]:[grid-area:1/1] sm:mt-10 sm:grid-cols-2 sm:[&>*]:[grid-area:auto]">
            {STEPS.map((s, i) => <Step key={s.h} i={i} step={s} progress={p} solo={solo} />)}
          </div>
        </div>

        {/* road */}
        <div className="absolute inset-x-0 bottom-0 h-[22%] bg-[#0A0E18]">
          <div className="absolute inset-x-0 top-0 h-1 bg-white/10" />
          <motion.div style={{ x: lane }} className="absolute left-0 top-1/2 flex w-[300%] gap-10" aria-hidden>
            {Array.from({ length: 60 }).map((_, i) => <span key={i} className="h-1.5 w-16 shrink-0 rounded bg-marigold/70" />)}
          </motion.div>
        </div>
        <motion.div style={{ x: busX }} className="absolute bottom-[12%] left-0 w-[min(72vw,480px)]">
          <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="relative">
            <motion.div aria-hidden style={{ opacity: beam }} className="absolute bottom-[12%] right-[-34%] h-[34%] w-[48%] bg-[radial-gradient(ellipse_at_left,rgba(255,240,190,.75),transparent_70%)] blur-md" />
            <motion.img src={asset('img/pink-bus.webp')} alt="Akanksha coach on the overnight run" loading="lazy" width="1296" height="772"
              style={{ filter: busFilter }} className="relative w-full drop-shadow-[0_20px_30px_rgba(0,0,0,.6)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
