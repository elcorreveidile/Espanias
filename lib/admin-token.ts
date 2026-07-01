import { timingSafeEqual } from 'crypto'
import type { NextRequest } from 'next/server'

// Comprobación segura (tiempo constante) del token de mantenimiento de admin.
// El token válido se lee de ESPANIAS_ADMIN_TOKEN. Si no está configurado, se
// DENIEGA todo (fail closed): así no dependemos de un secreto escrito en el
// código. Configura ESPANIAS_ADMIN_TOKEN en Vercel para usar estos endpoints.

export function isValidAdminToken(provided: string | null | undefined): boolean {
  const expected = process.env.ESPANIAS_ADMIN_TOKEN
  if (!expected || !provided) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

/** true si la query trae un ?token= válido. */
export function checkAdminToken(req: NextRequest): boolean {
  return isValidAdminToken(req.nextUrl.searchParams.get('token'))
}
