import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Headset, Send, CheckCircle2, Smartphone, Radar } from 'lucide-react'
import { CONTACT } from '../data'
import { SectionHeading, ease } from './ui'

const SERVICES = ['Bus hire', 'Car hire', 'Tour package', 'Parcel booking']

export default function Contact() {
  const [service, setService] = useState(SERVICES[0])
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const body = [...f.entries()].map(([k, v]) => `${k}: ${v}`).join('\n')
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`${service} enquiry`)}&body=${encodeURIComponent(`Service: ${service}\n${body}`)}`
    setSent(true)
  }

  const cards = [
    { icon: Phone, l: 'Booking office', v: CONTACT.phone, href: CONTACT.phoneHref },
    { icon: Headset, l: '24/7 customer support', v: CONTACT.support, href: CONTACT.supportHref },
    { icon: Mail, l: 'Email', v: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, l: 'Head office', v: 'Vinayak Shopping Centre, Shivaji Chowk, Solapur', href: CONTACT.mapUrl },
  ]

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-marigold/10 blur-[140px]" />
      <div className="container-x relative grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading light eyebrow="Talk to us" title="Hire a bus. Plan a trip. Or just ask." sub="Weddings, pilgrimages to Akkalkot, Tuljapur and Pandharpur, company outings. Tell us where and how many, and we'll call you back." />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {cards.map((c, i) => (
              <motion.a
                key={c.l} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, ease }}
                whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,.1)' }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <c.icon className="h-5 w-5 text-marigold transition-transform group-hover:scale-125" aria-hidden />
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-white/50">{c.l}</p>
                <p className="mt-1 break-words font-semibold text-white">{c.v}</p>
              </motion.a>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <motion.a whileHover={{ y: -2 }} href={CONTACT.appUrl} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-ink">
              <Smartphone className="h-4 w-4" /> Get the Android app
            </motion.a>
            <motion.a whileHover={{ y: -2 }} href={CONTACT.trackUrl} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-bold text-white">
              <Radar className="h-4 w-4" /> Track your bus live
            </motion.a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}
          className="relative rounded-[2rem] bg-cream p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200 }}>
                  <CheckCircle2 className="h-20 w-20 text-emerald-600" />
                </motion.span>
                <p className="mt-5 font-display text-3xl font-extrabold text-ink">Your mail app is open</p>
                <p className="mt-2 max-w-sm text-muted">Hit send there, and the office will call you back. In a hurry? Call {CONTACT.phone}.</p>
                <button onClick={() => setSent(false)} className="mt-6 cursor-pointer font-bold text-saffron-deep underline underline-offset-4">Send another enquiry</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-bold text-ink">What do you need?</p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <button type="button" key={s} onClick={() => setService(s)} aria-pressed={service === s}
                        className={`relative min-h-[40px] cursor-pointer rounded-full px-4 text-sm font-bold ${service === s ? 'text-white' : 'bg-white text-ink'}`}>
                        {service === s && <motion.span layoutId="svc" className="absolute inset-0 rounded-full bg-ink" />}
                        <span className="relative">{s}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block"><span className="mb-1.5 block text-sm font-bold text-ink">Your name</span><input required name="Name" className="field" autoComplete="name" /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-bold text-ink">Mobile number</span><input required name="Mobile" type="tel" inputMode="tel" className="field" autoComplete="tel" /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-bold text-ink">From</span><input name="From" className="field" placeholder="Solapur" /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-bold text-ink">To</span><input name="To" className="field" placeholder="Shirdi" /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-bold text-ink">Date</span><input name="Date" type="date" className="field" /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-bold text-ink">People / seats</span><input name="Seats" type="number" min="1" className="field" /></label>
                </div>
                <label className="block"><span className="mb-1.5 block text-sm font-bold text-ink">Bus type</span>
                  <select name="Bus type" className="field cursor-pointer"><option>AC</option><option>Non-AC</option><option>AC or Non-AC</option></select>
                </label>
                <label className="block"><span className="mb-1.5 block text-sm font-bold text-ink">Anything else?</span><textarea name="Message" rows="3" className="field resize-none" /></label>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="group flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-ink font-bold text-white">
                  Send enquiry <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
