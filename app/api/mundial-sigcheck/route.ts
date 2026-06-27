import { NextResponse } from 'next/server'
import { createHmac } from 'crypto'

// TEMPORAL: genera un cupón de prueba firmado para verificar que el secreto
// compartido coincide con por2duros. Borrar tras la comprobación.
export const dynamic = 'force-dynamic'

function sign(code: string, pct: number): string {
  const secret = process.env.MUNDIAL_COUPON_SECRET || 'espanias-mundial-dev-secret'
  return createHmac('sha256', secret).update(`${code}.${pct}`).digest('hex')
}

export async function GET() {
  const code = 'MUNDIAL-TEST-' + Math.random().toString(36).slice(2, 6).toUpperCase()
  const pct = 20
  const sig = sign(code, pct)
  return NextResponse.json({
    secretConfigured: Boolean(process.env.MUNDIAL_COUPON_SECRET),
    code,
    pct,
    sig,
    claimUrl: `https://www.por2duros.com/mundial?code=${code}&pct=${pct}&sig=${sig}`,
  })
}
