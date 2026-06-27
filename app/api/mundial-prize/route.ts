import { NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { countFreeWebs, createCupon } from '@/lib/db/mundial-repo'

// Decide el premio en SERVIDOR y lo FIRMA (HMAC) para el canje seguro en
// por2duros.com/mundial. El cliente no puede falsificar el %: la firma lo impide.
// Tope global de webs gratis (MUNDIAL_FREEWEB_CAP, por defecto 3) en BD.
export const dynamic = 'force-dynamic'

function pickPct(): number {
  const r = Math.random() * 100
  return r < 2 ? 100 : r < 8 ? 80 : r < 28 ? 20 : r < 55 ? 15 : r < 82 ? 10 : 0
}

function sign(code: string, pct: number): string {
  const secret = process.env.MUNDIAL_COUPON_SECRET || 'espanias-mundial-dev-secret'
  return createHmac('sha256', secret).update(`${code}.${pct}`).digest('hex')
}

export async function POST() {
  const code = 'MUNDIAL-' + Math.random().toString(36).slice(2, 6).toUpperCase()
  let pct = pickPct()

  // Web gratis: tope GLOBAL en BD. Si falla la BD, NO se concede (seguro).
  if (pct === 100) {
    try {
      const cap = Number(process.env.MUNDIAL_FREEWEB_CAP || 3)
      if ((await countFreeWebs()) >= cap) {
        pct = 80
      } else {
        try {
          await createCupon(code, code, 100)
        } catch {
          pct = 80
        }
      }
    } catch {
      pct = 80
    }
  }

  return NextResponse.json({ pct, code, sig: sign(code, pct) })
}
