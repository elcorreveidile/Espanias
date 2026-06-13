import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

export const SESSION_COOKIE = 'espanias_session'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 días

export interface SessionData extends JWTPayload {
  email: string
  rol: string
  nombre?: string
}

function secret(): Uint8Array {
  const s = process.env.AUTH_SECRET
  if (!s) throw new Error('AUTH_SECRET no está configurado')
  return new TextEncoder().encode(s)
}

export async function createSessionToken(data: {
  email: string
  rol: string
  nombre?: string
}): Promise<string> {
  return new SignJWT({ email: data.email, rol: data.rol, nombre: data.nombre })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret())
}

export async function verifySessionToken(
  token: string | undefined
): Promise<SessionData | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret())
    if (typeof payload.email !== 'string' || typeof payload.rol !== 'string') {
      return null
    }
    return payload as SessionData
  } catch {
    return null
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: MAX_AGE,
}
