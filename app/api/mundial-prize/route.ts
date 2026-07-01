import { NextRequest, NextResponse } from 'next/server'
import { countFreeWebs, createCupon } from '@/lib/db/mundial-repo'
import { signCoupon } from '@/lib/coupon'
import { clientIp, rateLimit } from '@/lib/rate-limit'

// Decide el premio en SERVIDOR y lo FIRMA (HMAC) para el canje seguro en
// por2duros.com/mundial. El cliente no puede falsificar el %: la firma lo impide.
// Tope global de webs gratis (MUNDIAL_FREEWEB_CAP, por defecto 3) en BD.
export const dynamic = 'force-dynamic'

function pickPct(): number {
  const r = Math.random() * 100
  return r < 2 ? 100 : r < 8 ? 80 : r < 28 ? 20 : r < 55 ? 15 : r < 82 ? 10 : 0
}

export async function POST(req: NextRequest) {
  if (!rateLimit(clientIp(req), 20).ok) {
    return NextResponse.json({ error: 'rate' }, { status: 429 })
  }
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

  try {
    return NextResponse.json({ pct, code, sig: signCoupon(code, pct) })
  } catch {
    // MUNDIAL_COUPON_SECRET no configurado → no emitimos cupón sin firmar.
    return NextResponse.json({ error: 'config' }, { status: 500 })
  }
}
