// Sello "Economía Circular" — reproducción del sello oficial (repo Papaupa).
//
// Diseño: doble anillo, texto curvo "ECONOMÍA CIRCULAR" (arriba) y el nombre
// del barrio (abajo), la moneda QPQ centrada arriba, el código en serif al
// centro y dos puntos a los lados. Color verde de marca (#2f6b4f) con variante
// mono (pasa color="#1C1917"). API alineada con el componente de Papaupa:
// props `codigo`, `barrio`, `color`.

const BARRIO_NOMBRE: Record<string, string> = {
  ECR: 'Realejo',
  ECZ: 'Zaidín',
}

export function barrioNombre(codigo: string): string {
  return BARRIO_NOMBRE[codigo] ?? codigo
}

interface Props {
  /** Código del barrio (p. ej. "ECR"). */
  codigo?: string
  /** Nombre del barrio; si se omite, se deriva del código (ECR → Realejo). */
  barrio?: string
  /** Color del sello (por defecto verde de marca). Mono negro: "#1C1917". */
  color?: string
  /** Tamaño en px (cuadrado). */
  size?: number
  className?: string
}

const R = 38 // radio del texto curvo

export default function SelloECR({
  codigo = 'ECR',
  barrio,
  color = '#2f6b4f',
  size = 96,
  className,
}: Props) {
  const nombre = (barrio ?? barrioNombre(codigo)).toUpperCase()
  // Ids deterministas (server/cliente coinciden). Geometría idéntica entre
  // sellos del mismo tamaño → un id duplicado resuelve al mismo arco (inocuo).
  const idTop = `ecr-top-${codigo}-${size}`
  const idBot = `ecr-bot-${codigo}-${size}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={`Sello Economía Circular ${barrio ?? barrioNombre(codigo)}`}
    >
      <defs>
        {/* Semicircunferencia superior (texto recto hacia arriba). */}
        <path id={idTop} d={`M ${50 - R},50 a ${R},${R} 0 1 1 ${2 * R},0`} fill="none" />
        {/* Semicircunferencia inferior invertida (texto recto hacia abajo). */}
        <path id={idBot} d={`M ${50 + R},50 a ${R},${R} 0 1 1 ${-2 * R},0`} fill="none" />
      </defs>

      {/* Doble anillo del cuño */}
      <circle cx="50" cy="50" r="48" fill="none" stroke={color} strokeWidth="1.3" />
      <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="0.7" />

      {/* Texto curvo superior */}
      <text
        fontSize="7.2"
        fontWeight="600"
        letterSpacing="1.4"
        fill={color}
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        <textPath href={`#${idTop}`} startOffset="50%" textAnchor="middle">
          ECONOMÍA CIRCULAR
        </textPath>
      </text>

      {/* Texto curvo inferior (nombre del barrio) */}
      <text
        fontSize="7.2"
        fontWeight="600"
        letterSpacing="2.4"
        fill={color}
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        <textPath href={`#${idBot}`} startOffset="50%" textAnchor="middle">
          {nombre}
        </textPath>
      </text>

      {/* Puntos separadores laterales */}
      <circle cx="13.5" cy="50" r="1.4" fill={color} />
      <circle cx="86.5" cy="50" r="1.4" fill={color} />

      {/* Moneda QPQ centrada arriba */}
      <circle cx="50" cy="33" r="9" fill="none" stroke={color} strokeWidth="1.2" />
      <text
        x="50"
        y="35.4"
        fontSize="5.6"
        fontWeight="700"
        letterSpacing="0.2"
        textAnchor="middle"
        fill={color}
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        QPQ
      </text>

      {/* Código del barrio en serif */}
      <text
        x="50"
        y="64"
        fontSize="30"
        fontWeight="700"
        textAnchor="middle"
        fill={color}
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        {codigo}
      </text>
    </svg>
  )
}
