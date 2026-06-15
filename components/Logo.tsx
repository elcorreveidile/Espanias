interface LogoProps {
  variant?: 'nav' | 'footer'
  // El logo está sobre una superficie clara (p. ej. el hero) y debe ir oscuro
  // aunque el tema sea oscuro.
  onLightBg?: boolean
}

export default function Logo({ variant = 'nav', onLightBg = false }: LogoProps) {
  const markSize = variant === 'nav' ? 32 : 26
  const textClass = variant === 'nav' ? 'text-xl' : 'text-sm'
  const espaClass = onLightBg ? 'text-[#1C1917]' : 'text-[#1C1917] dark:text-[#F5F5F4]'
  const boxClass = onLightBg ? 'fill-[#1C1917]' : 'fill-[#1C1917] dark:fill-[#44403C]'
  const svgRing = onLightBg ? 'rounded-[9px]' : 'rounded-[9px] dark:ring-1 dark:ring-white/15'

  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={svgRing}
      >
        <defs>
          <clipPath id="logo-clip">
            <rect width="40" height="40" rx="9" />
          </clipPath>
        </defs>
        <g clipPath="url(#logo-clip)">
          <rect width="40" height="40" className={boxClass} />
          <rect width="40" height="7" fill="#BF2638" />
          <rect y="7" width="40" height="4" fill="#D4AC0D" opacity="0.6" />
          <text
            x="20"
            y="35"
            textAnchor="middle"
            fontSize="21"
            fontWeight="900"
            fill="#F9F7F4"
            fontFamily="Georgia, 'Times New Roman', serif"
          >
            ñ
          </text>
        </g>
      </svg>
      <span className={`font-black tracking-tight leading-none ${textClass}`}>
        <span className={espaClass}>Espa</span>
        <span className="text-[#BF2638]">n</span>
        <span className="text-[#6D28D9]">ias</span>
      </span>
    </span>
  )
}
