import { motion } from 'framer-motion'
import { asset } from '../asset'

/** Transparent Akanksha wordmark: keyed brand mark + live type (no yellow sticker box). */
export default function Logo({ className = '', animate = true }) {
  return (
    <span className={`group inline-flex items-center gap-2.5 ${className}`}>
      <motion.img
        src={asset('img/logo-mark-light.png')} alt="" aria-hidden width="46" height="40"
        className="h-9 w-auto drop-shadow-[0_4px_12px_rgba(242,107,29,.35)] sm:h-10"
        initial={animate ? { rotate: -30, scale: 0.6, opacity: 0 } : false}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        whileHover={{ rotate: -8, scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[22px] font-extrabold tracking-tight text-white sm:text-2xl">
          Akanksha
        </span>
        <span className="mt-1 text-[9px] font-bold uppercase tracking-[.3em] text-marigold sm:text-[10px]">
          Tourism &amp; Logistics
        </span>
      </span>
    </span>
  )
}
