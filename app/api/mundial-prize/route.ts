import { NextRequest, NextResponse } from 'next/server'
import { getCuponByEmail, createCupon, countFreeWebs } from '@/lib/db/mundial-repo'

// Candado de verdad: el premio se decide y se guarda en SERVIDOR, un cupón por
// email. Ni incógnito ni borrar localStorage lo saltan.
export const dynamic = 'force-dynamic'

function pickPct(): number {
  const r = Math.random() * 100
  return r < 2 ? 100 : r < 8 ? 80 : r < 28 ? 20 : r < 55 ? 15 : r < 82 ? 10 : 0
}

export async function POST(req: NextRequest) {
  let email = ''
  try {
    const body = (await req.json()) as { email?: unknown }
    email = String(body.email ?? '').trim().toLowerCase()
  } catch {
    /* body inválido */
  }
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'email' }, { status: 400 })
  }

  try {
    // ¿Ya tiene cupón? Se le devuelve el mismo (uno por email).
    const existing = await getCuponByEmail(email)
    if (existing) {
      return NextResponse.json({ pct: existing.pct, code: existing.code, repeat: true })
    }

    let pct = pickPct()

    // Tope global opcional de webs gratis (MUNDIAL_FREEWEB_CAP). 0/ausente = sin tope.
    if (pct === 100) {
      const cap = Number(process.env.MUNDIAL_FREEWEB_CAP || 0)
      if (cap > 0 && (await countFreeWebs()) >= cap) pct = 80
    }

    // Solo se guarda (y bloquea el email) si hay premio. Sin premio: puede reintentar.
    if (pct === 0) {
      return NextResponse.json({ pct: 0, code: null, repeat: false })
    }

    const code = 'MUNDIAL-' + Math.random().toString(36).slice(2, 6).toUpperCase()
    try {
      await createCupon(email, code, pct)
    } catch {
      // Carrera (mismo email a la vez): devolvemos el que haya quedado.
      const again = await getCuponByEmail(email)
      if (again) return NextResponse.json({ pct: again.pct, code: again.code, repeat: true })
      throw new Error('insert')
    }
    return NextResponse.json({ pct, code, repeat: false })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'db' },
      { status: 500 }
    )
  }
}
