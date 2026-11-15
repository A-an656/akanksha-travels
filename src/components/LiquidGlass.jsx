import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'

/**
 * iOS-style Liquid Glass.
 * Clear in the middle, refracts like a lens at the rim, with a little chromatic split
 * and a specular edge. Each instance builds a displacement map for its own size and
 * corner radius. Chromium renders the refraction; other browsers get frosted blur.
 */

export const canRefract = typeof navigator !== 'undefined' && /Chrome|Chromium|Edg\//.test(navigator.userAgent) && !/Firefox/.test(navigator.userAgent)

export function buildMap(w, h, r, edge) {
  const s = 0.5
  const W = Math.max(2, Math.ceil(w * s))
  const H = Math.max(2, Math.ceil(h * s))
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')
  const img = ctx.createImageData(W, H)
  const rr = Math.min(r, w / 2, h / 2)
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      const px = (i + 0.5) / s, py = (j + 0.5) / s
      const sx = px - w / 2, sy = py - h / 2
      const qx = Math.abs(sx) - (w / 2 - rr), qy = Math.abs(sy) - (h / 2 - rr)
      const ox = Math.max(qx, 0), oy = Math.max(qy, 0)
      const sdf = Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - rr
      const d = -sdf
      let R = 128, G = 128
      if (d >= 0 && d < edge) {
        const t = 1 - d / edge
        const f = t * t * (3 - 2 * t) // smoothstep: strongest at the rim
        let nx, ny
        if (qx > 0 && qy > 0) { const l = Math.hypot(ox, oy) || 1; nx = ox / l; ny = oy / l }
        else if (qx > qy) { nx = 1; ny = 0 } else { nx = 0; ny = 1 }
        nx *= Math.sign(sx) || 1; ny *= Math.sign(sy) || 1
        R = 128 - nx * f * 127
        G = 128 - ny * f * 127
      }
      const k = (j * W + i) * 4
      img.data[k] = R; img.data[k + 1] = G; img.data[k + 2] = 128; img.data[k + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return c.toDataURL()
}

export default function LiquidGlass({
  as: Tag = 'div', radius = 24, depth = 48, edge, blur = 1.5, tint = 'rgba(255,255,255,.06)',
  className = '', style, children, innerRef, ...rest
}) {
  const ref = useRef(null)
  const id = 'lg' + useId().replace(/[^a-zA-Z0-9]/g, '')
  const [size, setSize] = useState(null)
  const [map, setMap] = useState(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !canRefract) return
    let raf
    const ro = new ResizeObserver(([e]) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const w = Math.round(e.borderBoxSize?.[0]?.inlineSize ?? el.offsetWidth)
        const h = Math.round(e.borderBoxSize?.[0]?.blockSize ?? el.offsetHeight)
        setSize((s) => (s && s.w === w && s.h === h ? s : { w, h }))
      })
    })
    ro.observe(el)
    return () => { ro.disconnect(); cancelAnimationFrame(raf) }
  }, [])

  useEffect(() => {
    if (!size || size.w < 4 || size.h < 4) return
    const e = edge ?? Math.min(Math.min(size.w, size.h) * 0.45, 42)
    setMap(buildMap(size.w, size.h, radius, e))
  }, [size, radius, edge])

  const setRef = (n) => { ref.current = n; if (typeof innerRef === 'function') innerRef(n); else if (innerRef) innerRef.current = n }
  const live = canRefract && map && size

  return (
    <Tag ref={setRef} className={`relative isolate ${className}`} style={{ borderRadius: radius, ...style }} {...rest}>
      {live && (
        <svg aria-hidden width="0" height="0" style={{ position: 'absolute' }}>
          <filter id={id} x="0" y="0" width={size.w} height={size.h} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feImage href={map} x="0" y="0" width={size.w} height={size.h} preserveAspectRatio="none" result="map" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale={depth} xChannelSelector="R" yChannelSelector="G" result="dR" />
            <feColorMatrix in="dR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale={depth * 0.93} xChannelSelector="R" yChannelSelector="G" result="dG" />
            <feColorMatrix in="dG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale={depth * 0.86} xChannelSelector="R" yChannelSelector="G" result="dB" />
            <feColorMatrix in="dB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
            <feBlend in="r" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="b" mode="screen" />
          </filter>
        </svg>
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          borderRadius: 'inherit',
          background: tint,
          WebkitBackdropFilter: 'blur(14px) saturate(170%)',
          backdropFilter: live ? `url(#${id}) blur(${blur}px) saturate(170%) brightness(1.04)` : 'blur(14px) saturate(170%)',
        }}
      />
      <span aria-hidden className="lg-rim pointer-events-none absolute inset-0 -z-10" style={{ borderRadius: 'inherit' }} />
      {children}
    </Tag>
  )
}
