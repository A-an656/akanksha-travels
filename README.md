# Akanksha Travels — website redesign

React + Vite + Tailwind CSS + Framer Motion. All content (routes, timings, contacts, reviews) comes from the current akankshatours.in site; schedule data lives in `src/data.js`.

## Run
```
npm install
npm run dev       # http://localhost:5173
npm run build     # production files in dist/
```

## Where things are
- `src/data.js` — timetable, phone numbers, links, testimonials. Edit timings here.
- `src/components/Intro.jsx` — 3-second opening animation
- `src/components/LiquidGlass.jsx` — iOS-style liquid glass (lens refraction at the rim, per-element displacement map). Chrome/Edge refract; Safari/Firefox show frosted blur
- `src/components/LiquidFilters.jsx` — liquid text + background glass filters
- `src/components/Logo.jsx` — transparent logo (keyed mark + live type)
- `public/img/` — `pink-bus.webp` (cut-out coach), `skyline.png` (line-art from the old banner), `logo-mark*.png`, `parcel/` (free Unsplash photos)

Booking buttons link to the existing booking engine at akankshatours.in.
