/**
 * SVG filters behind the "liquid glass" surfaces (.liquid in index.css).
 * Chromium refracts the backdrop through these; other browsers fall back to frosted blur.
 */
export default function LiquidFilters() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        {/* static refraction for bars and pills */}
        <filter id="liquid-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="2" seed="11" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2.5" result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="38" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* slowly flowing refraction for hero card */}
        <filter id="liquid-flow" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.005 0.01" numOctaves="2" seed="4" result="noise">
            <animate attributeName="baseFrequency" dur="14s" values="0.005 0.010;0.008 0.014;0.005 0.010" repeatCount="indefinite" />
          </feTurbulence>
          <feGaussianBlur in="noise" stdDeviation="3" result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="60" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* wobbling liquid text */}
        <filter id="liquid-text" x="-5%" y="-15%" width="110%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.018" numOctaves="1" seed="2" result="n">
            <animate attributeName="baseFrequency" dur="9s" values="0.006 0.018;0.01 0.026;0.006 0.018" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* gooey blob merge used for liquid buttons */}
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  )
}
