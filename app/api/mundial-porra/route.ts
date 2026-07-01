import { NextRequest, NextResponse } from 'next/server'
import { upsertPorra, listPorra } from '@/lib/db/mundial-repo'
import { checkAdminToken } from '@/lib/admin-token'
import { signCoupon } from '@/lib/coupon'
import { clientIp, rateLimit } from '@/lib/rate-limit'

// Porra del Mundial.
// POST {email, es, ri, partido}                 -> guarda el pronóstico (uno por email y partido)
// GET  ?token=...                               -> exporta todos los pronósticos
// GET  ?token=...&result=2-1[&partido=...]      -> calcula el ganador + URL del premio (web gratis)
export const dynamic = 'force-dynamic'

// Email al ganador con el enlace de su web gratis. Devuelve si se envió.
async function sendWinnerEmail(to: string, premioUrl: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return false
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Espanias <hola@espanias.com>',
        to,
        subject: '🏆 ¡Has ganado la Porra del Mundial de Espanias!',
        html: `<!DOCTYPE html><html lang="es"><body style="margin:0;background:#F9F7F4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:40px 20px;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
      <tr><td style="background:#1C1917;border-radius:14px 14px 0 0;padding:28px 36px;">
        <div style="height:3px;background:linear-gradient(90deg,#C60B1E,#FFC400,#C60B1E);border-radius:2px;margin-bottom:18px;"></div>
        <p style="margin:0;font-size:24px;font-weight:900;color:#FFC400;">🏆 ¡Has ganado la Porra!</p>
        <p style="margin:8px 0 0;font-size:13px;color:#A8A29E;">Reto Mundial · Espanias</p>
      </td></tr>
      <tr><td style="background:#ffffff;padding:32px 36px;">
        <p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#1C1917;">Tu pronóstico fue el ganador. Como premio, <strong>te llevas una WEB GRATIS</strong> con Por 2 Duros.</p>
        <a href="${premioUrl}" style="display:inline-block;background:#FFC400;color:#1C1917;font-size:15px;font-weight:800;text-decoration:none;padding:14px 30px;border-radius:10px;">Conseguir mi web gratis →</a>
        <p style="margin:22px 0 0;font-size:12px;color:#78716C;">Si el botón no funciona, copia este enlace:<br><span style="color:#6D28D9;word-break:break-all;">${premioUrl}</span></p>
      </td></tr>
      <tr><td style="background:#F9F7F4;border-radius:0 0 14px 14px;padding:18px 36px;border:1px solid #E7E5E4;border-top:none;text-align:center;">
        <p style="margin:0;font-size:12px;color:#78716C;">Enviado desde <a href="https://espanias.com" style="color:#BF2638;text-decoration:none;font-weight:600;">espanias.com</a></p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`,
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  if (!rateLimit(clientIp(req), 20).ok) {
    return NextResponse.json({ error: 'rate' }, { status: 429 })
  }
  let email = ''
  let partido = 'Próximo partido'
  let es = NaN
  let ri = NaN
  let desempate = NaN // minuto dentro de la parte
  let desempateFase = NaN // 1=1ª, 2=2ª, 3=prórroga
  try {
    const b = (await req.json()) as {
      email?: unknown
      partido?: unknown
      es?: unknown
      ri?: unknown
      desempate?: unknown
      desempateFase?: unknown
    }
    email = String(b.email ?? '').trim().toLowerCase()
    partido = String(b.partido ?? 'Próximo partido').slice(0, 80)
    es = Number(b.es)
    ri = Number(b.ri)
    desempate = Number(b.desempate)
    desempateFase = Number(b.desempateFase)
  } catch {
    /* body inválido */
  }
  if (
    !email.includes('@') ||
    !Number.isInteger(es) ||
    !Number.isInteger(ri) ||
    !Number.isInteger(desempate) ||
    !Number.isInteger(desempateFase) ||
    es < 0 || ri < 0 || es > 30 || ri > 30 ||
    desempate < 1 || desempate > 60 ||
    desempateFase < 1 || desempateFase > 3
  ) {
    return NextResponse.json({ error: 'datos' }, { status: 400 })
  }
  try {
    await upsertPorra(email, partido, es, ri, desempate, desempateFase)
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : 'db' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams
  if (!checkAdminToken(req)) {
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
  // Momento real del primer gol (desempate): parte + minuto. Pasa &fase=1&min=49.
  const fActual = Number(p.get('fase'))
  const mActual = Number(p.get('min'))
  const haveTb = Number.isInteger(fActual) && Number.isInteger(mActual)
  const actualMoment = haveTb ? fActual * 1000 + mActual : NaN
  const moment = (r: (typeof rows)[number]) => (r.desempateFase ?? 0) * 1000 + (r.desempate ?? 0)
  const dist = (r: (typeof rows)[number]) => Math.abs(r.golesEs - re) + Math.abs(r.golesRival - rr)
  const tb = (r: (typeof rows)[number]) =>
    haveTb && r.desempate != null ? Math.abs(moment(r) - actualMoment) : Infinity
  const earliest = (a: (typeof rows)[number], b: (typeof rows)[number]) =>
    (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0)

  const exact = rows.filter((r) => r.golesEs === re && r.golesRival === rr)
  // Acierto exacto → desempate (minuto del 1er gol) → el más antiguo.
  // Si nadie acierta → el más cercano en marcador → desempate → el más antiguo.
  const winner = exact.length
    ? exact.slice().sort((a, b) => tb(a) - tb(b) || earliest(a, b))[0]
    : rows.slice().sort((a, b) => dist(a) - dist(b) || tb(a) - tb(b) || earliest(a, b))[0]

  const code = 'PORRA-' + Math.random().toString(36).slice(2, 6).toUpperCase()
  const q = new URLSearchParams({ code, pct: '100', sig: signCoupon(code, 100), email: winner.email })
  const premioUrl = `https://www.por2duros.com/mundial?${q.toString()}`
  // Solo envía el email al ganador si se pide explícitamente con &send=1.
  const emailEnviado = p.get('send') === '1' ? await sendWinnerEmail(winner.email, premioUrl) : false
  return NextResponse.json({
    result,
    desempateUsado: haveTb ? { fase: fActual, minuto: mActual } : null,
    aciertosExactos: exact.length,
    totalPronosticos: rows.length,
    winner: {
      email: winner.email,
      prediccion: `${winner.golesEs}-${winner.golesRival}`,
      primerGol: { fase: winner.desempateFase, minuto: winner.desempate },
      fecha: winner.createdAt,
    },
    premioUrl,
    emailEnviado,
  })
}
