// Prefix public files with the deploy base (e.g. /akanksha-travels/ on GitHub Pages).
export const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`
