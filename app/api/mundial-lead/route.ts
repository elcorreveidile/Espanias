import { NextRequest, NextResponse } from 'next/server'
import { upsertLead, listLeads } from '@/lib/db/mundial-repo'

// POST: guarda en BD el lead de quien canjea su cupón (uno por email).
// GET ?token=...: exporta la lista de leads (para volcarla a por2duros).
export const dynamic = 'force-dynamic'

const EXPORT_TOKEN = 'espanias-leads-2026'

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('token') !== EXPORT_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  try {
    const leads = await listLeads()
    return NextResponse.json({ count: leads.length, leads })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'db' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  let email = ''
  let code = ''
  let pct = 0
  try {
    const b = (await req.json()) as { email?: unknown; code?: unknown; pct?: unknown }
    email = String(b.email ?? '').trim().toLowerCase()
    code = String(b.code ?? '')
    pct = Number(b.pct) || 0
  } catch {
    /* body inválido */
  }
  if (!email.includes('@')) {
    return NextResponse.json({ error: 'email' }, { status: 400 })
  }
  try {
    await upsertLead(email, code, pct)
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : 'db' },
      { status: 500 }
    )
  }
  return NextResponse.json({ ok: true })
}
