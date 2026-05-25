'use server'

export type ContactResult = { ok: true } | { ok: false; error: string }

export async function sendContact(
  name: string,
  email: string,
  message: string
): Promise<ContactResult> {
  if (!name.trim() || !email.trim() || !message.trim()) {
    return { ok: false, error: 'Todos los campos son obligatorios.' }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Dev fallback: log and pretend success so the form UX is testable locally
    if (process.env.NODE_ENV === 'development') {
      console.log('[Espanias contact]', { name, email, message })
      return { ok: true }
    }
    return { ok: false, error: 'Servicio de email no configurado.' }
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Espanias <onboarding@resend.dev>',
      to: 'javier@blablaele.com',
      reply_to: email,
      subject: `[Espanias] Mensaje de ${name}`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    }),
  })

  if (!res.ok) {
    return { ok: false, error: 'No se pudo enviar el mensaje. Inténtalo de nuevo.' }
  }

  return { ok: true }
}
