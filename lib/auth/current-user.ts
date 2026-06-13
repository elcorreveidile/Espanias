import { cookies } from 'next/headers'
import { SESSION_COOKIE, verifySessionToken, type SessionData } from './session'

/** Lee y verifica la sesión desde la cookie (para server components / rutas). */
export async function getSession(): Promise<SessionData | null> {
  const c = await cookies()
  return verifySessionToken(c.get(SESSION_COOKIE)?.value)
}
