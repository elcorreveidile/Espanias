import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { upsertPorra, listPorra } from '@/lib/db/mundial-repo'

// Porra del Mundial.
// POST {email, es, ri, partido}                 -> guarda el pronóstico (uno por email y partido)
// GET  ?token=...                               -> exporta todos los pronósticos
// GET  ?token=...&result=2-1[&partido=...]      -> calcula el ganador + URL del premio (web gratis)
export const dynamic = 'force-dynamic'

const TOKEN = 'espanias-porra-2026'

function sign(code: string, pct: number): string {
  const secret = process.env.MUNDIAL_COUPON_SECRET || 'espanias-mundial-dev-secret'
  return createHmac('sha256', secret).update(`${code}.${pct}`).digest('hex')
}

export async function POST(req: NextRequest) {
  let email = ''
  let partido = 'Próximo partido'
  let es = NaN
  let ri = NaN
  let desempate = NaN
  try {
    const b = (await req.json()) as {
      email?: unknown
      partido?: unknown
      es?: unknown
      ri?: unknown
      desempate?: unknown
    }
    email = String(b.email ?? '').trim().toLowerCase()
    partido = String(b.partido ?? 'Próximo partido').slice(0, 80)
    es = Number(b.es)
    ri = Number(b.ri)
    desempate = Number(b.desempate)
  } catch {
    /* body inválido */
  }
  if (
    !email.includes('@') ||
    !Number.isInteger(es) ||
    !Number.isInteger(ri) ||
    !Number.isInteger(desempate) ||
    es < 0 || ri < 0 || es > 30 || ri > 30 ||
    desempate < 0 || desempate > 130
  ) {
    return NextResponse.json({ error: 'datos' }, { status: 400 })
  }
  try {
    await upsertPorra(email, partido, es, ri, desempate)
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : 'db' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams
  if (p.get('token') !== TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const partido = p.get('partido') || undefined
  const result = p.get('result')
  const rows = await listPorra(partido)

  // Sin resultado: exporta la lista.
  if (!result) {
    return NextResponse.json({ count: rows.length, pronosticos: rows })
  }

  // Con resultado: calcula el ganador.
  const m = result.match(/^(\d+)\s*-\s*(\d+)$/)
  if (!m) {
    return NextResponse.json({ error: 'result debe ser "2-1"' }, { status: 400 })
  }
  const re = Number(m[1])
  const rr = Number(m[2])
  if (!rows.length) {
    return NextResponse.json({ result, winner: null, note: 'sin pronósticos' })
  }
  // Minuto real del primer gol (desempate). Opcional pero recomendado.
  const dm = Number(p.get('desempate'))
  const dist = (r: (typeof rows)[number]) => Math.abs(r.golesEs - re) + Math.abs(r.golesRival - rr)
  const tb = (r: (typeof rows)[number]) =>
    Number.isFinite(dm) && r.desempate != null ? Math.abs(r.desempate - dm) : Infinity
  const earliest = (a: (typeof rows)[number], b: (typeof rows)[number]) =>
    (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0)

  const exact = rows.filter((r) => r.golesEs === re && r.golesRival === rr)
  // Acierto exacto → desempate (minuto del 1er gol) → el más antiguo.
  // Si nadie acierta → el más cercano en marcador → desempate → el más antiguo.
  const winner = exact.length
    ? exact.slice().sort((a, b) => tb(a) - tb(b) || earliest(a, b))[0]
    : rows.slice().sort((a, b) => dist(a) - dist(b) || tb(a) - tb(b) || earliest(a, b))[0]

  const code = 'PORRA-' + Math.random().toString(36).slice(2, 6).toUpperCase()
  const q = new URLSearchParams({ code, pct: '100', sig: sign(code, 100), email: winner.email })
  return NextResponse.json({
    result,
    desempateUsado: Number.isFinite(dm) ? dm : null,
    aciertosExactos: exact.length,
    totalPronosticos: rows.length,
    winner: {
      email: winner.email,
      prediccion: `${winner.golesEs}-${winner.golesRival}`,
      desempate: winner.desempate,
      fecha: winner.createdAt,
    },
    premioUrl: `https://www.por2duros.com/mundial?${q.toString()}`,
  })
}
