import { NextRequest, NextResponse } from 'next/server'
import { upsertLead, listLeads } from '@/lib/db/mundial-repo'
import { checkAdminToken } from '@/lib/admin-token'
import { clientIp, rateLimit } from '@/lib/rate-limit'

// POST: guarda en BD el lead de quien canjea su cupón (uno por email).
// GET ?token=...: exporta la lista de leads (para volcarla a por2duros).
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  if (!checkAdminToken(req)) {
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
  if (!rateLimit(clientIp(req), 20).ok) {
    return NextResponse.json({ error: 'rate' }, { status: 429 })
  }
  let email = ''
  let code = ''
  let pct = 0
  try {
    const b = (await req.json()) as { email?: unknown; code?: unknown; pct?: unknown }
    email = String(b.email ?? '').trim().toLowerCase()
    code = String(b.code ?? '').slice(0, 40)
    pct = Math.max(0, Math.min(100, Math.trunc(Number(b.pct) || 0)))
  } catch {
    /* body inválido */
  }
  if (!email.includes('@') || email.length > 255) {
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
