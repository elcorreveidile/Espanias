/** @type {import('next').NextConfig} */

// CSP: permite lo que la app usa hoy (estilos/inline scripts de Next, Vercel
// Analytics, imágenes https) y refuerza object-src/frame-ancestors/base-uri/
// form-action. Es defensa en profundidad; las entradas de usuario ya se escapan.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live",
  "connect-src 'self' https:",
  "frame-src 'self' https:",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const nextConfig = {
  images: {
    // Restringido a los hosts que usamos (Vercel Blob para subidas + espanias).
    // Antes era un comodín `**`, que convertía el optimizador en un proxy de
    // imágenes abierto. Si un proyecto usa otro host, añádelo aquí.
    remotePatterns: [
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: 'espanias.com' },
      { protocol: 'https', hostname: '**.espanias.com' },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
