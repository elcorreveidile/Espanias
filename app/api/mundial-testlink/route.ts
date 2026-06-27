import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

// TEMPORAL (solo pruebas): genera un cupón firmado y redirige a por2duros/mundial
// para probar el flujo (validación + enlace mágico) sin depender del juego.
// Uso: /api/mundial-testlink?token=espanias-test-2026&pct=20&email=tu@email.com
// Borrar tras probar. Protegido por token porque mintea cupones reales.
export const dynamic = 'force-dynamic'

const TOKEN = 'espanias-test-2026'

function sign(code: string, pct: number): string {
  const secret = process.env.MUNDIAL_COUPON_SECRET || 'espanias-mundial-dev-secret'
  return createHmac('sha256', secret).update(`${code}.${pct}`).digest('hex')
}

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams
  if (p.get('token') !== TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const allowed = [10, 15, 20, 80, 100]
  const pct = allowed.includes(Number(p.get('pct'))) ? Number(p.get('pct')) : 20
  const email = (p.get('email') || '').trim().toLowerCase()
  if (!email.includes('@')) {
    return NextResponse.json({ error: 'falta ?email=' }, { status: 400 })
  }
  const code = 'MUNDIAL-TEST-' + Math.random().toString(36).slice(2, 6).toUpperCase()
  const q = new URLSearchParams({ code, pct: String(pct), sig: sign(code, pct), email })
  return NextResponse.redirect(`https://www.por2duros.com/mundial?${q.toString()}`)
}
