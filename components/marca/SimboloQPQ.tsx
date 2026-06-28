// Símbolo de la moneda QPQ ("kupeku") — coherente con el sello oficial ECR.
//
// NOTA: si Papaupa entrega un `simbolo-qpq.svg` definitivo distinto, sustituye
// este archivo. Mantiene la familia visual del sello: verde de marca, doble
// anillo y flechas de circulación.

interface Props {
  /** Color (por defecto verde de marca). Mono negro: "#1C1917". */
  color?: string
  /** Tamaño en px (cuadrado). */
  size?: number
  className?: string
}

export default function SimboloQPQ({ color = '#2f6b4f', size = 64, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Símbolo de la moneda QPQ"
    >
      {/* Moneda: doble anillo */}
      <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="2.4" />
      <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="1.2" />

      {/* Flechas de circulación */}
      <g transform="translate(50,50)" stroke={color} strokeWidth="2.6" fill="none" strokeLinecap="round">
        <path d="M -22,-7 A 23,23 0 0 1 18,-15" />
        <path d="M 22,7 A 23,23 0 0 1 -18,15" />
      </g>
      <g fill={color}>
        <path d="M 16,-19 l 4,1.4 l -2.6,3.3 z" transform="translate(50,50)" />
        <path d="M -16,19 l -4,-1.4 l 2.6,-3.3 z" transform="translate(50,50)" />
      </g>

      {/* Texto QPQ */}
      <text
        x="50"
        y="59"
        fontSize="25"
        fontWeight="700"
        letterSpacing="0.3"
        textAnchor="middle"
        fill={color}
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        QPQ
      </text>
    </svg>
  )
}
