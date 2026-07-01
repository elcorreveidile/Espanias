import { randomBytes } from 'crypto'
import { and, eq, gt } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { ensureSchema } from '@/lib/db/ensure-schema'
import { magicTokens, users } from '@/lib/db/schema'

const TOKEN_TTL_MS = 15 * 60 * 1000 // 15 minutos

export interface AllowedUser {
  email: string
  rol: string
  nombre: string | null
}

/** Devuelve el usuario si su email está en la lista blanca (tabla users). */
export async function getAllowedUser(email: string): Promise<AllowedUser | null> {
  await ensureSchema()
  const normalized = email.trim().toLowerCase()
  const rows = await db
    .select({ email: users.email, rol: users.rol, nombre: users.nombre })
    .from(users)
    .where(eq(users.email, normalized))
    .limit(1)
  const u = rows[0]
  if (!u) return null
  return { email: u.email, rol: u.rol ?? 'viewer', nombre: u.nombre }
}

/** Crea y persiste un token de un solo uso para el email dado. */
export async function createMagicToken(email: string): Promise<string> {
  await ensureSchema()
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS)
  await db.insert(magicTokens).values({
    email: email.trim().toLowerCase(),
    token,
    expiresAt,
  })
  return token
}

/** Valida y consume (borra) el token. Devuelve el email si es válido. */
export async function consumeMagicToken(token: string): Promise<string | null> {
  await ensureSchema()
  // Borrado atómico con RETURNING: consume el token en una sola operación, de
  // modo que dos peticiones simultáneas no puedan usar el mismo token dos veces.
  const deleted = await db
    .delete(magicTokens)
    .where(and(eq(magicTokens.token, token), gt(magicTokens.expiresAt, new Date())))
    .returning({ email: magicTokens.email })
  return deleted[0]?.email ?? null
}

/** Envía el enlace mágico por email vía Resend. */
export async function sendMagicLink(email: string, url: string): Promise<void> {
  const { Resend } = await import('resend')
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY no está configurado')
  const from = process.env.EMAIL_FROM || 'Espanias <noreply@espanias.com>'
  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: 'Tu enlace de acceso a Espanias',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h1 style="font-size: 20px; color: #1C1917;">Acceso a Espanias</h1>
        <p style="color: #57534E;">Haz clic en el botón para entrar al panel. El enlace caduca en 15 minutos.</p>
        <p style="margin: 32px 0;">
          <a href="${url}" style="background:#1C1917;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Entrar al panel</a>
        </p>
        <p style="color:#A8A29E;font-size:13px;">Si no has solicitado este acceso, ignora este correo.</p>
      </div>
    `,
  })

  if (error) {
    throw new Error(
      `Resend rechazó el envío: ${error.message ?? JSON.stringify(error)}`
    )
  }
}
