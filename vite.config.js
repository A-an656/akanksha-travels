import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `npm run deploy` builds in "gh" mode for GitHub Pages, served at /akanksha-travels/
export default defineConfig(({ mode }) => ({
  base: mode === 'gh' ? '/akanksha-travels/' : '/',
  plugins: [react()],
}))
