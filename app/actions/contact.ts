'use server'

import { escapeHtml } from '@/lib/html'
import { sendEmail, emailConfigured } from '@/lib/email'

export type ContactResult = { ok: true } | { ok: false; error: string }

export async function sendContact(
  name: string,
  email: string,
  message: string,
  honeypot = ''
): Promise<ContactResult> {
  // Anti-spam: si el campo trampa (oculto para humanos) viene relleno, es un bot.
  // Devolvemos éxito silencioso para no darle pistas.
  if (honeypot.trim()) {
    return { ok: true }
  }

  if (!name.trim() || !email.trim() || !message.trim()) {
    return { ok: false, error: 'Todos los campos son obligatorios.' }
  }

  if (!emailConfigured()) {
    // Dev fallback: log and pretend success so the form UX is testable locally
    if (process.env.NODE_ENV === 'development') {
      console.log('[Espanias contact]', { name, email, message })
      return { ok: true }
    }
    return { ok: false, error: 'Servicio de email no configurado.' }
  }

  // Escapamos todo dato de usuario antes de incrustarlo en el HTML del correo.
  const safeName = escapeHtml(name.trim())
  const safeEmail = escapeHtml(email.trim())
  const mailtoEmail = encodeURIComponent(email.trim())
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F9F7F4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9F7F4;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Header -->
        <tr><td style="background:#1C1917;border-radius:14px 14px 0 0;padding:28px 36px 24px;">
          <div style="height:3px;background:linear-gradient(90deg,#BF2638,#D4AC0D,#BF2638);border-radius:2px;margin-bottom:20px;"></div>
          <p style="margin:0;font-size:28px;font-weight:900;letter-spacing:-0.5px;line-height:1;">
            <span style="color:#F9F7F4;">Espa</span><span style="color:#BF2638;">n</span><span style="color:#6D28D9;">ias</span>
          </p>
          <p style="margin:8px 0 0;font-size:11px;color:#78716C;letter-spacing:0.15em;text-transform:uppercase;">Nuevo mensaje desde espanias.com</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:36px;">

          <!-- Name -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr><td style="border-left:3px solid #BF2638;padding-left:14px;">
              <p style="margin:0 0 3px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#78716C;">Nombre</p>
              <p style="margin:0;font-size:18px;font-weight:700;color:#1C1917;">${safeName}</p>
            </td></tr>
          </table>

          <!-- Email -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr><td style="border-left:3px solid #6D28D9;padding-left:14px;">
              <p style="margin:0 0 3px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#78716C;">Email</p>
              <a href="mailto:${mailtoEmail}" style="font-size:16px;color:#6D28D9;text-decoration:none;font-weight:600;">${safeEmail}</a>
            </td></tr>
          </table>

          <!-- Divider -->
          <div style="height:1px;background:#E7E5E4;margin:8px 0 24px;"></div>

          <!-- Message -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td>
              <p style="margin:0 0 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#78716C;">Mensaje</p>
              <p style="margin:0;font-size:15px;line-height:1.75;color:#1C1917;">${safeMessage}</p>
            </td></tr>
          </table>

          <!-- Reply CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
            <tr><td>
              <a href="mailto:${mailtoEmail}" style="display:inline-block;background:#BF2638;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:100px;">
                Responder a ${safeName}
              </a>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#F9F7F4;border-radius:0 0 14px 14px;padding:20px 36px;border:1px solid #E7E5E4;border-top:none;text-align:center;">
          <p style="margin:0;font-size:12px;color:#78716C;">
            Recibido desde <a href="https://espanias.com" style="color:#BF2638;text-decoration:none;font-weight:600;">espanias.com</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  try {
    await sendEmail({
      to: 'makicarapp@gmail.com',
      from: 'Espanias <hola@espanias.com>',
      replyTo: email,
      subject: `[Espanias] Nuevo mensaje de ${safeName}`,
      html,
    })
    return { ok: true }
  } catch (e) {
    console.error('[Espanias contact] envío falló:', e)
    return { ok: false, error: 'No se pudo enviar el mensaje. Inténtalo de nuevo.' }
  }
}
