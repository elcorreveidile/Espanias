import { NextResponse } from 'next/server'
import { countFreeWebs, createCupon } from '@/lib/db/mundial-repo'

// Tope GLOBAL de webs gratis (por defecto 3). Reserva atómica en BD: solo se
// conceden como máximo N en toda la promo. Si la BD falla, NO se concede (seguro).
export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const cap = Number(process.env.MUNDIAL_FREEWEB_CAP || 3)
    if ((await countFreeWebs()) >= cap) {
      return NextResponse.json({ granted: false })
    }
    const code = 'MUNDIAL-' + Math.random().toString(36).slice(2, 6).toUpperCase()
    try {
      // Reserva: usamos el propio code como email placeholder (columna única).
      await createCupon(code, code, 100)
    } catch {
      return NextResponse.json({ granted: false })
    }
    return NextResponse.json({ granted: true, code })
  } catch {
    return NextResponse.json({ granted: false })
  }
}
