// Símbolo de la moneda QPQ ("kupeku") — versión propia de Espanias.
//
// NOTA: el símbolo oficial se diseña en el repo de Papaupa (components/marca/).
// Sustituye este archivo por su SVG/componente definitivo cuando llegue.
// Es una moneda con el texto "QPQ" y un motivo de circulación.

interface Props {
  /** Tamaño en px (cuadrado). */
  size?: number
  className?: string
}

export default function SimboloQPQ({ size = 64, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Símbolo de la moneda QPQ"
    >
      {/* Moneda */}
      <circle cx="50" cy="50" r="46" fill="#FFC400" stroke="#1C1917" strokeWidth="3" />
      <circle cx="50" cy="50" r="39" fill="none" stroke="#1C1917" strokeWidth="1.5" />

      {/* Flechas de circulación alrededor del texto */}
      <g transform="translate(50,50)" stroke="#BF2638" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M -22,-7 A 23,23 0 0 1 18,-15" />
        <path d="M 22,7 A 23,23 0 0 1 -18,15" />
      </g>
      <g fill="#BF2638">
        <path d="M 16,-19 l 4,1.4 l -2.6,3.3 z" />
        <path d="M -16,19 l -4,-1.4 l 2.6,-3.3 z" />
      </g>

      {/* Texto QPQ */}
      <text
        x="50"
        y="59"
        fontSize="26"
        fontWeight="900"
        letterSpacing="0.5"
        textAnchor="middle"
        fill="#1C1917"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        QPQ
      </text>
    </svg>
  )
}
