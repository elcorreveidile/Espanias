// Límite de uso best-effort en memoria (por instancia del servidor). Evita el
// abuso de la API pública de agentes sin bloquear el uso legítimo.
type Entry = { count: number; reset: number }
const hits = new Map<string, Entry>()

export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for') || ''
  return fwd.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown'
}

export function rateLimit(
  key: string,
  limit = 60,
  windowMs = 60_000
): { ok: boolean; retryAfter: number } {
  const now = Date.now()
  const entry = hits.get(key)
  if (!entry || now > entry.reset) {
    hits.set(key, { count: 1, reset: now + windowMs })
    return { ok: true, retryAfter: 0 }
  }
  entry.count++
  if (entry.count > limit) {
    return { ok: false, retryAfter: Math.ceil((entry.reset - now) / 1000) }
  }
  return { ok: true, retryAfter: 0 }
}
