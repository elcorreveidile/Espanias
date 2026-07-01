import { createHmac } from 'crypto'

// Firma de cupones del Mundial (HMAC-SHA256), compartida con por2duros.com.
// El secreto es OBLIGATORIO: si falta, lanzamos en vez de caer a un valor
// conocido (fail closed), para que nadie pueda falsificar cupones (p. ej. 100%).

function couponSecret(): string {
  const s = process.env.MUNDIAL_COUPON_SECRET
  if (!s) throw new Error('MUNDIAL_COUPON_SECRET no está configurado')
  return s
}

export function signCoupon(code: string, pct: number): string {
  return createHmac('sha256', couponSecret()).update(`${code}.${pct}`).digest('hex')
}
