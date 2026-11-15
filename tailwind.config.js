/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0B1220', 2: '#111A2E', 3: '#1B2742' },
        marigold: { DEFAULT: '#F5B700', soft: '#FFE08A' },
        saffron: { DEFAULT: '#F26B1D', deep: '#C2410C' },
        cream: { DEFAULT: '#FFF8EC', 2: '#F6EEDF' },
        body: '#1A2233',
        muted: '#5B6474',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        deva: ['Mukta', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 20px 50px -20px rgba(11,18,32,.35)',
        glow: '0 0 0 6px rgba(245,183,0,.18)',
      },
    },
  },
  plugins: [],
}
