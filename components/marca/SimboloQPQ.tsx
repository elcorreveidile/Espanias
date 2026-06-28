// Símbolo de la moneda QPQ — reproducción del símbolo oficial (repo Papaupa).
//
// Diseño: anillo formado por dos flechas de circulación (puntas arriba y
// abajo) con "QPQ" en sans-serif al centro. Verde de marca (#2f6b4f) con
// variante mono (color="#1C1917"). El SVG/PNG oficial está en public/marca.

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
      {/* Anillo de circulación: dos arcos con punta de flecha */}
      <path d="M 75.71,19.36 A 40,40 0 0 1 43.05,89.39" fill="none" stroke={color} strokeWidth="7" />
      <path d="M 24.29,80.64 A 40,40 0 0 1 56.95,10.61" fill="none" stroke={color} strokeWidth="7" />
      <polygon points="37.64,88.44 49.17,86.41 47.78,94.29" fill={color} />
      <polygon points="62.36,11.56 50.83,13.59 52.22,5.71" fill={color} />

      {/* Texto QPQ */}
      <text
        x="50"
        y="60"
        fontSize="30"
        fontWeight="700"
        textAnchor="middle"
        fill={color}
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        QPQ
      </text>
    </svg>
  )
}
