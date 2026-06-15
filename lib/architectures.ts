// Arquitecturas reutilizables servidas por la API de agentes.
// Clave = slug del proyecto. La API /api/agente/context las devuelve en el
// campo "arquitectura" y /api/agente/export las incluye en el Markdown.

export const architectures: Record<string, string> = {
  'bar-de-eric': `# Arquitectura "El Bar de Eric" — web completa replicable

La base técnica es idéntica entre clones; el diseño visual debe ser 100% original
y adaptado a cada negocio.

## Stack técnico (no cambiar)
- Framework: Next.js 16 (App Router)
- Lenguaje: TypeScript estricto
- CSS: Tailwind CSS v4 (config vía @theme inline en globals.css, NO tailwind.config.js)
- Base de datos: Drizzle ORM + Neon PostgreSQL (serverless HTTP)
- Autenticación: Magic link por email (Next-Auth 5 beta + Resend)
- Pagos: Stripe Checkout (redirect mode)
- Email: Resend (dominio propio, p. ej. noreply@espanias.com)
- Imágenes: Vercel Blob (@vercel/blob)
- Validación: Zod v4
- Despliegue: Vercel
- Mapas (opcional): Leaflet + react-leaflet (dynamic import, sin SSR)

## Estructura de carpetas (replicar)
- app/(public)/[secciones]/page.tsx + [slug]/page.tsx  (listado + detalle por sección)
- app/(public)/tienda/{page,carrito,checkout,confirmacion}
- app/api/admin/[entidad]/route.ts (CRUD), upload/route.ts (Vercel Blob), seed/route.ts
- app/api/auth/{signin,signout,verify}/route.ts
- app/api/checkout/route.ts (crea sesión Stripe)
- app/api/tienda/{verify-email,verify-token}/route.ts
- app/api/reservas/route.ts
- app/auth/{signin,verify}/page.tsx
- app/dashboard/{layout,page}.tsx + [entidad]/page.tsx (admin protegido)
- app/{globals.css,layout.tsx,page.tsx}
- components/{dashboard,home,shared,tienda,[seccion]}/
- context/CarritoContext.tsx
- lib/db/{client,schema,queries/index,seed}.ts, lib/{email,stripe,utils,validators}.ts
- middleware.ts (protege /dashboard con cookie + redirect)

## Patrón del carrito (copiar exacto)
- Map<string, number> (id → cantidad); localStorage key "carrito-tienda".
- useRef(true) como guard anti race-condition: primer useEffect lee localStorage y
  pone skipWrite.current=false; segundo useEffect escribe solo si skipWrite es false.
- Estado "mounted" para evitar flash de carrito vacío en SSR.
- Métodos: agregar(id), quitar(id), vaciar(), totalItems. Provider en layout.tsx.

## Flujo de autenticación (magic link)
1. POST /api/auth/signin → token UUID + expiresAt (15 min) en tabla magicTokens → email (Resend).
2. Email enlaza a /auth/verify?token={uuid}.
3. GET /auth/verify → POST /api/auth/verify → valida token + crea cookie de sesión.
4. middleware.ts protege /dashboard/* comprobando la cookie.

## Flujo de pago (Stripe)
1. Carrito en localStorage (CarritoContext).
2. /tienda/checkout pide email → POST /api/tienda/verify-email → magic link.
3. Vuelta con token → POST /api/tienda/verify-token → valida.
4. Submit datos → POST /api/checkout → crea Stripe session → redirect a Stripe.
5. Success → /tienda/confirmacion → vaciar() carrito.
6. NO vaciar el carrito antes del redirect a Stripe (si el usuario vuelve, conserva items).

## Base de datos (precios SIEMPRE en céntimos, integer)
- users (id uuid, email unique, role, createdAt)
- magicTokens (id uuid, email, token unique, expiresAt, createdAt)
- [entidad_principal], [entidad_galeria] (Blob URLs), [entidad_eventos]
- reservas (nombre, email, telefono, fecha, hora, estado)
- pedidos (referencia, cliente, total_centimos, estado)
- pedidoItems (pedidoId, productoId, cantidad, precioUnitario)

## Tailwind v4 (globals.css)
@import "tailwindcss"; con @theme inline. Paleta y tipografías 100% originales por
sector (restaurante: crema/burdeos/serif; clínica: blanco/azul/sans; bar: oscuro/ámbar/display).

## Navbar
Logo izq · links centro/dcha · icono carrito siempre visible con badge totalItems ·
hamburguesa móvil → overlay fullscreen · sticky top-0 con backdrop-blur.

## Variables de entorno
DATABASE_URL, AUTH_SECRET, NEXTAUTH_URL, RESEND_API_KEY, ADMIN_EMAIL, STRIPE_SECRET_KEY,
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, NEXT_PUBLIC_BASE_URL, BLOB_READ_WRITE_TOKEN, CRON_SECRET.

## Reglas de código
- Server Components por defecto; "use client" solo con interactividad real.
- Precios en céntimos; formatear con Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR"}).
- Slugs con función slugify propia. Queries DB centralizadas en lib/db/queries/index.ts.
- Validar solo en fronteras (inputs de usuario, APIs externas). Sin docs ni comentarios innecesarios.
- Imágenes como placeholders SVG reemplazables; uploads admin vía Vercel Blob.

## Resultado esperado
Home con hero + secciones · 4-5 secciones públicas (listado + detalle) · tienda con
carrito persistente + Stripe · panel admin protegido (CRUD + upload) · reservas con
email · auth magic link · Neon · responsive mobile-first · SEO básico (meta + OG).`,
}
