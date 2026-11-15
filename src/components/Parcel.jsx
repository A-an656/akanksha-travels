import { useRef, useState } from 'react'
import { asset } from '../asset'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Store, Truck, HandHelping, Phone, Radar, FileText, Package, Cookie, Cpu, Shapes, ShieldAlert, Send, CheckCircle2, ArrowRight } from 'lucide-react'
import { CONTACT, ORIGINS, DESTINATIONS } from '../data'
import { ease } from './ui'
import LiquidGlass from './LiquidGlass'

const STEPS = [
  { icon: Store, h: 'Drop it at the office', p: 'Bring the parcel to Shivaji Chowk, Solapur, or the boarding point in your town before the evening bus.' },
  { icon: Truck, h: 'It rides tonight', p: "It goes in the luggage hold of that night's bus. No waiting for a courier pickup slot." },
  { icon: HandHelping, h: 'Collected next morning', p: 'The receiver picks it up at the destination office. Call us to confirm points for your town.' },
]

const TYPES = [
  { k: 'Documents', i: FileText }, { k: 'Box / carton', i: Package }, { k: 'Sweets / food', i: Cookie },
  { k: 'Electronics', i: Cpu }, { k: 'Other', i: Shapes },
]

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-white/55">{label}</span>
      {children}
    </label>
  )
}
const input = 'w-full rounded-xl border border-white/15 bg-white/[.07] px-3.5 py-3 text-[15px] font-semibold text-white placeholder:text-white/30 outline-none transition focus:border-marigold focus:bg-white/[.12]'

function BookForm() {
  const [type, setType] = useState(TYPES[1].k)
  const [kg, setKg] = useState(5)
  const [fragile, setFragile] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget))
    const body = `Parcel booking request\n\nFrom: ${f.from}\nTo: ${f.to}\nType: ${type}\nApprox weight: ${kg} kg\nFragile: ${fragile ? 'Yes' : 'No'}\n\nSender: ${f.sname} (${f.sphone})\nReceiver: ${f.rname} (${f.rphone})\n\nNotes: ${f.notes || '-'}`
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Parcel: ${f.from} to ${f.to}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[460px] flex-col items-center justify-center text-center">
        <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200 }}>
          <CheckCircle2 className="h-20 w-20 text-emerald-400" />
        </motion.span>
        <p className="mt-5 font-display text-3xl font-extrabold text-white">Almost done</p>
        <p className="mt-2 max-w-sm text-white/70">Your mail app opened with the parcel details. Hit send, and the office will call you with the rate and drop point.</p>
        <a href={CONTACT.phoneHref} className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-marigold px-6 font-bold text-ink"><Phone className="h-4 w-4" />Or call {CONTACT.phone}</a>
        <button onClick={() => setSent(false)} className="mt-4 cursor-pointer text-sm font-bold text-white/60 underline underline-offset-4">Book another parcel</button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="From">
          <select name="from" defaultValue="Solapur" className={`${input} cursor-pointer appearance-none`}>
            {ORIGINS.map((o) => <option key={o} className="text-ink">{o}</option>)}
          </select>
        </Field>
        <Field label="To">
          <select name="to" defaultValue="Pune" className={`${input} cursor-pointer appearance-none`}>
            {DESTINATIONS.map((o) => <option key={o} className="text-ink">{o}</option>)}
          </select>
        </Field>
      </div>

      <div>
        <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/55">What are you sending?</span>
        <div className="flex flex-wrap gap-2">
          {TYPES.map(({ k, i: Icon }) => (
            <button type="button" key={k} onClick={() => setType(k)} aria-pressed={type === k}
              className={`relative inline-flex min-h-[42px] cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-bold transition-colors ${type === k ? 'text-ink' : 'bg-white/[.07] text-white/80 hover:bg-white/[.12]'}`}>
              {type === k && <motion.span layoutId="ptype" className="absolute inset-0 rounded-full bg-marigold" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
              <Icon className="relative h-4 w-4" /><span className="relative">{k}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/55">Approx. weight</span>
            <motion.span key={kg} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-display text-2xl font-extrabold text-marigold">{kg}<span className="ml-1 text-sm text-white/60">kg</span></motion.span>
          </div>
          <input type="range" min="1" max="50" value={kg} onChange={(e) => setKg(+e.target.value)} aria-label="Approximate weight in kilograms"
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-marigold" />
        </div>
        <button type="button" onClick={() => setFragile((f) => !f)} aria-pressed={fragile}
          className={`inline-flex min-h-[46px] cursor-pointer items-center gap-2 rounded-xl px-4 text-sm font-bold transition-colors ${fragile ? 'bg-rose-500 text-white' : 'bg-white/[.07] text-white/80'}`}>
          <motion.span animate={fragile ? { rotate: [0, -15, 15, 0] } : {}} transition={{ duration: 0.5 }}><ShieldAlert className="h-4 w-4" /></motion.span>
          Fragile
          <span className={`relative h-5 w-9 rounded-full transition-colors ${fragile ? 'bg-white/40' : 'bg-white/15'}`}>
            <motion.span layout className={`absolute top-0.5 h-4 w-4 rounded-full bg-white ${fragile ? 'right-0.5' : 'left-0.5'}`} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
          </span>
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Sender name"><input required name="sname" className={input} autoComplete="name" /></Field>
        <Field label="Sender mobile"><input required name="sphone" type="tel" inputMode="tel" className={input} autoComplete="tel" /></Field>
        <Field label="Receiver name"><input required name="rname" className={input} /></Field>
        <Field label="Receiver mobile"><input required name="rphone" type="tel" inputMode="tel" className={input} /></Field>
      </div>
      <Field label="Notes (optional)"><input name="notes" className={input} placeholder="e.g. 2 boxes, handle with care" /></Field>

      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        className="group relative flex min-h-[54px] w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-marigold to-saffron font-bold text-ink">
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative">Request parcel booking</span><Send className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
      </motion.button>
      <p className="text-center text-xs text-white/45">The office confirms the rate and drop point by phone.</p>
    </form>
  )
}

function TrackPanel() {
  return (
    <div className="flex min-h-[460px] flex-col justify-center">
      <div className="relative mx-auto flex h-36 w-36 items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.span key={i} className="absolute inset-0 rounded-full border-2 border-marigold/60"
            animate={{ scale: [0.4, 1.4], opacity: [0.8, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8 }} />
        ))}
        <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-marigold text-ink"><Radar className="h-8 w-8" /></span>
      </div>
      <p className="mt-6 text-center font-display text-2xl font-extrabold text-white">Follow the bus carrying your parcel</p>
      <p className="mx-auto mt-2 max-w-sm text-center text-white/65">Every Akanksha bus has live GPS. Open live tracking and pick tonight's bus on your route.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <motion.a whileHover={{ y: -2 }} href={CONTACT.trackUrl} target="_blank" rel="noopener" className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-marigold px-6 font-bold text-ink">
          Open live tracking <ArrowRight className="h-4 w-4" />
        </motion.a>
        <motion.a whileHover={{ y: -2 }} href={CONTACT.phoneHref} className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white/10 px-6 font-bold text-white">
          <Phone className="h-4 w-4" /> Ask the office
        </motion.a>
      </div>
    </div>
  )
}

export default function Parcel() {
  const [tab, setTab] = useState('book')
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 80])
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section id="parcel" ref={ref} className="relative isolate overflow-hidden bg-ink py-24 sm:py-32">
      {/* photo backdrop the glass refracts */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-10%] -z-20">
        <img src={asset('img/parcel/loading.webp')} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover opacity-40" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/80 to-ink" />
      <motion.div aria-hidden className="absolute -left-20 top-1/3 -z-10 h-96 w-96 rounded-full bg-saffron/30 blur-[120px]"
        animate={{ x: [0, 120, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="eyebrow bg-marigold text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />Akanksha Logistics
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}
              className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl">
              Send it tonight.<br /><span className="liquid-text">There by morning.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
              Daily parcel delivery on every Akanksha route: documents, boxes, shop stock and sweets for family.
              If our bus goes there, so does your parcel.
            </motion.p>

            {/* phones/tablets: one photo instead of the collage */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}
              className="relative mt-8 overflow-hidden rounded-[1.75rem] lg:hidden">
              <img src={asset('img/parcel/handover.webp')} alt="A parcel being handed over to the receiver" loading="lazy" className="aspect-[16/11] w-full object-cover object-[50%_60%]" />
              <span className="absolute left-4 top-4 -rotate-6 rounded-xl bg-marigold px-3 py-2 text-ink shadow-lift">
                <span className="block font-display text-xl font-extrabold leading-none">Daily</span>
                <span className="block text-[10px] font-bold uppercase tracking-widest">on every route</span>
              </span>
            </motion.div>

            <ol className="mt-8 space-y-3 lg:mt-10">
              {STEPS.map((s, i) => (
                <motion.li key={s.h}
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease, delay: i * 0.12 }} whileHover={{ x: 6 }}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-marigold text-ink"><s.icon className="h-5 w-5" /></span>
                  <div>
                    <p className="font-display text-lg font-bold text-white"><span className="mr-2 text-marigold">0{i + 1}</span>{s.h}</p>
                    <p className="mt-0.5 text-sm text-white/60">{s.p}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* photo collage */}
          <div className="relative hidden h-[560px] lg:block">
            <motion.div style={{ y: y1 }} className="absolute right-0 top-0 w-[62%] overflow-hidden rounded-[2rem] shadow-lift">
              <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} src={asset('img/parcel/handover.webp')} alt="A parcel being handed over to the receiver" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </motion.div>
            <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[52%] overflow-hidden rounded-[2rem] shadow-lift ring-8 ring-ink">
              <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} src={asset('img/parcel/fragile.webp')} alt="A box sealed with fragile tape" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </motion.div>
            <motion.div initial={{ scale: 0, rotate: -20 }} whileInView={{ scale: 1, rotate: -8 }} viewport={{ once: true }} transition={{ type: 'spring', delay: 0.4 }}
              className="absolute left-[8%] top-[12%] rounded-2xl bg-marigold px-5 py-4 text-ink shadow-lift">
              <p className="font-display text-3xl font-extrabold leading-none">Daily</p>
              <p className="text-xs font-bold uppercase tracking-widest">on every route</p>
            </motion.div>
          </div>
        </div>

        {/* the module */}
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease }}
          className="relative mt-16 overflow-hidden rounded-[2.2rem]">
          <img src={asset('img/parcel/loading.webp')} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-ink/60 via-ink/30 to-saffron-deep/40" />
          <div className="grid gap-6 p-3 sm:p-6 lg:grid-cols-[.8fr_1.2fr] lg:p-10">
            <div className="hidden flex-col justify-end p-4 lg:flex">
              <p className="font-display text-5xl font-extrabold leading-none text-white drop-shadow-lg">Book a parcel<br />in one minute.</p>
              <p className="mt-4 max-w-sm text-white/85 drop-shadow">Tell us what, where and who. The office calls back with the rate and drop point.</p>
              <a href={CONTACT.phoneHref} className="mt-6 inline-flex w-fit items-center gap-2 font-bold text-marigold"><Phone className="h-4 w-4" />{CONTACT.phone}</a>
            </div>

            <LiquidGlass radius={28} depth={60} tint="rgba(8,12,24,.66)" className="p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)] sm:p-7">
              <div className="mb-6 flex rounded-full bg-white/[.07] p-1" role="tablist" aria-label="Parcel">
                {[['book', 'Book a parcel', Package], ['track', 'Track', Radar]].map(([k, l, Icon]) => (
                  <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
                    className={`relative flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-bold transition-colors ${tab === k ? 'text-ink' : 'text-white/70 hover:text-white'}`}>
                    {tab === k && <motion.span layoutId="parcel-tab" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                    <Icon className="relative h-4 w-4" /><span className="relative">{l}</span>
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, x: tab === 'book' ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: tab === 'book' ? 20 : -20 }} transition={{ duration: 0.3, ease }}>
                  {tab === 'book' ? <BookForm /> : <TrackPanel />}
                </motion.div>
              </AnimatePresence>
            </LiquidGlass>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
