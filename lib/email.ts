// Envío de email con proveedor conmutable:
//   - Si hay BREVO_API_KEY → usa Brevo (API transaccional).
//   - Si no, usa RESEND_API_KEY (Resend).
// Así se puede cambiar de proveedor solo con variables de entorno.
//
// NOTA: el remitente (from) debe estar verificado en el proveedor que uses
// (dominio autenticado con SPF/DKIM, o sender validado). Si no, lo rechaza.

interface SendArgs {
  to: string
  subject: string
  html: string
  /** Remitente en formato "Nombre <email@dominio>". */
  from: string
  /** Responder-a (opcional). */
  replyTo?: string
}

function parseFrom(s: string): { name: string; email: string } {
  const m = s.match(/^\s*(.*?)\s*<([^>]+)>\s*$/)
  if (m) return { name: m[1] || 'Espanias', email: m[2].trim() }
  return { name: 'Espanias', email: s.trim() }
}

/** true si hay algún proveedor de email configurado. */
export function emailConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY || process.env.RESEND_API_KEY)
}

export async function sendEmail({ to, subject, html, from, replyTo }: SendArgs): Promise<void> {
  const brevoKey = process.env.BREVO_API_KEY
  if (brevoKey) {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': brevoKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: parseFrom(from),
        to: [{ email: to }],
        subject,
        htmlContent: html,
        ...(replyTo ? { replyTo: { email: replyTo } } : {}),
      }),
    })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      throw new Error(`Brevo rechazó el envío (${res.status}): ${body}`)
    }
    return
  }

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    throw new Error('No hay proveedor de email configurado (BREVO_API_KEY o RESEND_API_KEY)')
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Resend rechazó el envío (${res.status}): ${body}`)
  }
}
