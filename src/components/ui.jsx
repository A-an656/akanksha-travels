import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate, useReducedMotion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export const stagger = (s = 0.08, d = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: d } },
})

export function Reveal({ children, className = '', delay = 0, y = 28, as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease, delay }}
    >
      {children}
    </M>
  )
}

export function SectionHeading({ eyebrow, title, sub, light = false, center = false }) {
  return (
    <motion.div
      className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {eyebrow && (
        <motion.span variants={fadeUp} className={`eyebrow ${light ? 'bg-white/10 text-marigold' : 'bg-saffron/10 text-saffron-deep'}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className={`mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl ${light ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p variants={fadeUp} className={`mt-4 text-lg leading-relaxed ${light ? 'text-white/70' : 'text-muted'}`}>
          {sub}
        </motion.p>
      )}
    </motion.div>
  )
}

export function Button({ href, children, variant = 'primary', className = '', icon: Icon, ...rest }) {
  const styles = {
    primary: 'bg-marigold text-ink hover:bg-marigold-soft',
    dark: 'bg-ink text-white hover:bg-ink-3',
    ghost: 'liquid relative text-white',
    outline: 'border border-ink/15 text-ink hover:border-ink/40 bg-white',
  }
  const Tag = href ? motion.a : motion.button
  return (
    <Tag
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`group inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-bold transition-colors ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
      {Icon && <Icon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />}
    </Tag>
  )
}

export function CountUp({ to, suffix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduce) { setVal(to); return }
    const c = animate(0, to, { duration, ease, onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, to, duration, reduce])
  return <span ref={ref} className="tabular-nums">{val}{suffix}</span>
}
