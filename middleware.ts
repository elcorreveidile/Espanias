import { NextRequest, NextResponse } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth/session'
import { isDemoHostedHere } from '@/lib/demos'

const ROOT_DOMAIN = 'espanias.com'

/** Devuelve el subdominio (o null para apex/www/host desconocido). */
function getSubdomain(host: string | null): string | null {
  if (!host) return null
  const hostname = host.split(':')[0] // quita el puerto
  // Desarrollo local: <sub>.localhost
  if (hostname.endsWith('.localhost')) return hostname.replace('.localhost', '')
  if (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}`) return null
  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    return hostname.slice(0, -(ROOT_DOMAIN.length + 1))
  }
  return null // dominios de preview de Vercel, etc.
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl
  const subdomain = getSubdomain(req.headers.get('host'))

  // 1) Multi-tenant: <demo>.espanias.com -> /demos/<demo> (reescritura interna)
  if (subdomain && isDemoHostedHere(subdomain)) {
    const rewriteUrl = new URL(`/demos/${subdomain}${url.pathname}`, req.url)
    return NextResponse.rewrite(rewriteUrl)
  }

  // 2) Protección del panel (lógica existente)
  if (url.pathname.startsWith('/dashboard')) {
    const session = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value)
    if (!session) return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  return NextResponse.next()
}

export const config = {
  // Todas las rutas salvo estáticos de Next, API y archivos con extensión.
  matcher: ['/((?!_next/|api/|.*\\..*).*)'],
}
