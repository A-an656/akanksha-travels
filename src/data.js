// All schedule data taken from the current akankshatours.in timetable.
export const CONTACT = {
  office: '6, Vinayak Shopping Centre, Shivaji Chowk, Solapur, Maharashtra 413001',
  phone: '0217 2720407',
  phoneHref: 'tel:+912172720407',
  support: '080 4112 3387',
  supportHref: 'tel:+918041123387',
  email: 'avinayaktravels@gmail.com',
  supportEmail: 'yaseern4@gmail.com',
  bookUrl: 'https://www.akankshatours.in/',
  trackUrl: 'http://aks.trackingo.in/live_track',
  agentUrl: 'https://aks.akankshatours.in/',
  appUrl: 'https://play.google.com/store/apps/details?id=com.mba.vitabus',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Vinayak+Shopping+Centre+Shivaji+Chowk+Solapur',
}

export const BUS_TYPES = {
  acSleeper: { label: 'AC Sleeper', short: 'AC Sleeper', ac: true, tone: 'bg-sky-400/15 text-sky-200 ring-1 ring-inset ring-sky-300/25' },
  benz: { label: 'Bharat Benz AC Sleeper / Seater', short: 'Bharat Benz AC', ac: true, tone: 'bg-violet-400/15 text-violet-200 ring-1 ring-inset ring-violet-300/25' },
  nonAcSleeper: { label: 'Non-AC Sleeper', short: 'Non-AC Sleeper', ac: false, tone: 'bg-emerald-400/15 text-emerald-200 ring-1 ring-inset ring-emerald-300/25' },
  seater: { label: 'Non-AC Push Back Seater', short: 'Push Back Seater', ac: false, tone: 'bg-amber-400/15 text-amber-200 ring-1 ring-inset ring-amber-300/25' },
}

const NORTH = 'Aurangabad · Beed · Yeola · Manmad · Malegaon · Dhule'

// from, to, type, times (24h strings sorted when rendered)
export const DEPARTURES = [
  { from: 'Solapur', to: 'Pune', type: 'acSleeper', times: ['22:15', '22:45', '23:15', '23:25'] },
  { from: 'Solapur', to: 'Pune', type: 'benz', times: ['23:45'] },
  { from: 'Solapur', to: 'Pune', type: 'nonAcSleeper', times: ['23:35'] },
  { from: 'Solapur', to: 'Mumbai', type: 'acSleeper', times: ['22:15', '22:45', '23:15'] },
  { from: 'Solapur', to: 'Kolhapur · Sangli · Miraj', type: 'seater', times: ['23:30', '23:40'] },
  { from: 'Solapur', to: NORTH, type: 'seater', times: ['21:45'] },

  { from: 'Akkalkot', to: 'Pune', type: 'acSleeper', times: ['20:00', '20:30', '21:55'] },
  { from: 'Akkalkot', to: 'Mumbai', type: 'acSleeper', times: ['20:00', '20:30'] },
  { from: 'Akkalkot', to: NORTH, type: 'seater', times: ['20:15'] },

  { from: 'Tuljapur', to: 'Pune', type: 'acSleeper', times: ['21:45'] },
  { from: 'Tuljapur', to: 'Pune', type: 'benz', times: ['22:00'] },
  { from: 'Tuljapur', to: 'Pune', type: 'nonAcSleeper', times: ['22:00'] },
  { from: 'Tuljapur', to: 'Mumbai', type: 'acSleeper', times: ['21:45'] },
  { from: 'Tuljapur', to: NORTH, type: 'seater', times: ['22:30'] },

  { from: 'Latur', to: 'Pune', type: 'acSleeper', times: ['19:45', '20:00'] },
  { from: 'Latur', to: 'Mumbai', type: 'acSleeper', times: ['19:45', '20:00'] },
  { from: 'Latur', to: 'Solapur', type: 'acSleeper', times: ['19:45', '20:00'] },

  { from: 'Lohara', to: 'Pune', type: 'acSleeper', times: ['20:55', '21:15'] },
  { from: 'Lohara', to: 'Pune', type: 'benz', times: ['20:40'] },
  { from: 'Lohara', to: 'Pune', type: 'nonAcSleeper', times: ['21:00'] },
  { from: 'Lohara', to: 'Mumbai', type: 'acSleeper', times: ['20:55', '21:15'] },

  { from: 'Ausa', to: 'Pune', type: 'acSleeper', times: ['20:20', '20:45'] },
  { from: 'Ausa', to: 'Mumbai', type: 'acSleeper', times: ['20:20', '20:45'] },
  { from: 'Ujani', to: 'Pune', type: 'acSleeper', times: ['20:50', '21:10'] },
  { from: 'Ujani', to: 'Mumbai', type: 'acSleeper', times: ['20:50', '21:10'] },
  { from: 'Patoda', to: 'Pune', type: 'acSleeper', times: ['21:15'] },
  { from: 'Patoda', to: 'Mumbai', type: 'acSleeper', times: ['21:15', '21:20'] },
  { from: 'Murum', to: 'Pune', type: 'acSleeper', times: ['20:40'] },

  { from: 'Pune', to: 'Mumbai', type: 'acSleeper', times: ['02:30', '02:45', '03:00', '03:45'] },

  { from: 'Pandharpur', to: NORTH, type: 'seater', times: ['19:45'] },
  { from: 'Osmanabad', to: 'Aurangabad · Yeola · Manmad · Malegaon · Dhule', type: 'seater', times: ['23:00'] },
  { from: 'Beed', to: 'Aurangabad · Yeola · Manmad · Malegaon · Dhule', type: 'seater', times: ['02:00'] },
  { from: 'Aurangabad', to: 'Yeola · Manmad · Malegaon · Dhule', type: 'seater', times: ['03:30'] },
]

export const ORIGINS = [...new Set(DEPARTURES.map((d) => d.from))]

export const DESTINATIONS = ['Pune', 'Mumbai', 'Solapur', 'Aurangabad', 'Beed', 'Yeola', 'Manmad', 'Malegaon', 'Dhule', 'Kolhapur', 'Sangli', 'Miraj']

export const servesDestination = (d, dest) => d.to.split(' · ').includes(dest)

export const TOTAL_DEPARTURES = DEPARTURES.reduce((n, d) => n + d.times.length, 0)

export const fmtTime = (t) => {
  const [h, m] = t.split(':').map(Number)
  const ap = h >= 12 ? 'PM' : 'AM'
  const hh = h % 12 || 12
  return `${hh}:${String(m).padStart(2, '0')} ${ap}`
}

// sort evening first (18:00 → 05:59)
export const nightOrder = (t) => {
  const [h, m] = t.split(':').map(Number)
  return ((h + 24 - 18) % 24) * 60 + m
}

export const TESTIMONIALS = [
  {
    name: 'Yogesh',
    trip: 'Online booking',
    text: 'The online portal was very user-friendly, and for the first time I saw a bus start at the designated time. They even dropped me 15 minutes early. A perfect journey with nothing to complain about.',
  },
  {
    name: 'Jagadeesh',
    trip: 'Solapur → Shirdi, regular',
    text: 'I travel a lot for work and have tried almost every bus service. Since my first ride with Akanksha I have been a regular customer, for the luxurious buses and reasonable rates.',
  },
  {
    name: 'Virendra Kumar',
    trip: 'From Pune, with a 1-year-old',
    text: 'The staff was very helpful and paid special attention to the well-being of my toddler. Thank you for the courteous attitude.',
  },
  {
    name: 'Maneesh',
    trip: 'From Mumbai, sleeper',
    text: 'The sleeper bus was very comfortable and the staff was friendly and co-operative. Great going, Akanksha. Keep it up.',
  },
]
