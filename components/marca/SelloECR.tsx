// Sello "Economía Circular" — versión propia de Espanias.
//
// NOTA: el sello oficial se diseña en el repo de Papaupa (components/marca/).
// Cuando llegue su SVG/componente definitivo, sustituye este archivo por él.
// Hasta entonces, este sello es funcional y on-brand, y acepta el código de
// barrio para mostrarlo (ECR = Realejo, ECZ = Zaidín…).

const BARRIO_NOMBRE: Record<string, string> = {
  ECR: 'Realejo',
  ECZ: 'Zaidín',
}

export function barrioNombre(codigo: string): string {
  return BARRIO_NOMBRE[codigo] ?? codigo
}

interface Props {
  /** Código del barrio (p. ej. "ECR"). */
  barrio?: string
  /** Tamaño en px (cuadrado). */
  size?: number
  className?: string
}

export default function SelloECR({ barrio = 'ECR', size = 96, className }: Props) {
  const nombre = barrioNombre(barrio).toUpperCase()
  const topText = `· ECONOMÍA CIRCULAR · ${nombre} `

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={`Sello Economía Circular ${barrioNombre(barrio)}`}
    >
      <defs>
        {/* Arco superior para el texto curvo (de izquierda a derecha por arriba). */}
        <path id={`sello-top-${barrio}`} d="M 50,50 m -39,0 a 39,39 0 1 1 78,0" fill="none" />
      </defs>

      {/* Anillos del cuño */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="#1C1917" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="44" fill="none" stroke="#1C1917" strokeWidth="0.8" />

      {/* Texto curvo superior */}
      <text
        fontSize="8.2"
        fontWeight="700"
        letterSpacing="0.6"
        fill="#1C1917"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        <textPath href={`#sello-top-${barrio}`} startOffset="50%" textAnchor="middle">
          {topText}
        </textPath>
      </text>

      {/* Motivo central: flechas en círculo (reciclaje / circulación) */}
      <g transform="translate(50,46)" stroke="#BF2638" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M -9,-3 A 9.5,9.5 0 0 1 7,-6" />
        <path d="M 9,3 A 9.5,9.5 0 0 1 -7,6" />
      </g>
      {/* Puntas de flecha */}
      <g fill="#BF2638">
        <path d="M 56,38 l 3.4,1.2 l -2.2,2.8 z" />
        <path d="M 44,54 l -3.4,-1.2 l 2.2,-2.8 z" />
      </g>

      {/* Código del barrio */}
      <text
        x="50"
        y="68"
        fontSize="11"
        fontWeight="900"
        letterSpacing="1"
        textAnchor="middle"
        fill="#1C1917"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        {barrio}
      </text>
    </svg>
  )
}
