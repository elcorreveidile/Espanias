# Espanias

🇪🇸 Español · [🇬🇧 English](./README.en.md)

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)](https://vercel.com)

**Espanias** ([espanias.com](https://espanias.com)) es el portfolio y catálogo de aplicaciones web de la agencia **Por 2 Duros**. Es un escaparate vivo y bilingüe (ES/EN) de proyectos reales —desde webs de negocio local hasta SaaS y apps a medida— con un panel de gestión propio, blog, y campañas de marketing como el *Reto Mundial 2026*.

> «España está, literalmente, en nuestro nombre.»

No es una plantilla: cada pieza (catálogo, panel, autenticación, sistema multi-tenant de demos) está construida a medida sobre Next.js.

---

## ¿Qué incluye?

- **Catálogo de proyectos** (`/catalogo`) — fichas bilingües con eslogan, descripción, captura, categoría, estado y enlaces a la web en producción o demo. Los datos se leen de la base de datos en cada petición, con una lista estática de respaldo para que la web nunca falle.
- **Panel de gestión** (`/dashboard`) — CRUD de proyectos, blog, biblioteca de componentes y usuarios, protegido por sesión.
- **Blog** (`/blog`) — entradas bilingües gestionadas desde el panel.
- **Demos multi-tenant** (`*.espanias.com`) — cada proyecto puede servirse en su propio subdominio (ver [Subdominios](#subdominios)).
- **Reto Mundial 2026** (`/mundial`) — campaña con mini-juego de penaltis, cupones de descuento firmados, un descuento que crece con las victorias de España, captación de leads y una porra con premio.
- **Páginas de marca** — servicios, manifiesto, IA para empresas, y las legales (privacidad, cookies, aviso legal).

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | **Next.js 15** (App Router) + **React 19** |
| Lenguaje | **TypeScript** |
| Estilos | **Tailwind CSS 3.4** (modo oscuro por clase) |
| Base de datos | **Neon** (Postgres serverless) |
| ORM | **Drizzle ORM** |
| Autenticación | **Magic link** (enlace mágico) con sesión firmada (`jose`) |
| Email | **Resend** |
| Almacenamiento | **Vercel Blob** (subida de imágenes) |
| Analítica | **Vercel Analytics** |
| Despliegue | **Vercel** |

---

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno (ver tabla abajo)
cp .env.example .env.local   # si no existe, créalo a mano

# 3. Arrancar en desarrollo
npm run dev                  # http://localhost:3000
```

### Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build |
| `npm run lint` | ESLint (config de Next) |
| `npm run gen:setup-sql` | Genera `db/setup.sql` a partir del esquema |

---

## Variables de entorno

| Variable | Obligatoria | Para qué sirve |
|---|---|---|
| `DATABASE_URL` | Sí (en prod) | Cadena de conexión de Neon (Postgres). Sin ella, el catálogo usa la lista estática de respaldo. |
| `AUTH_SECRET` | Sí | Firma de las cookies de sesión. |
| `RESEND_API_KEY` | Sí | Envío de emails (enlaces mágicos, contacto, porra). |
| `EMAIL_FROM` | Recomendada | Remitente de los emails (p. ej. `Espanias <hola@espanias.com>`). |
| `ADMIN_EMAIL` | Recomendada | Email del administrador con acceso al panel. |
| `BLOB_READ_WRITE_TOKEN` | Para subir imágenes | Token de Vercel Blob. |
| `MUNDIAL_COUPON_SECRET` | Campaña Mundial | Secreto HMAC para firmar los cupones que canjea por2duros.com. |
| `MUNDIAL_FREEWEB_CAP` | Opcional | Tope global de webs gratis de la campaña (por defecto 3). |
| `MUNDIAL_FORCE_MANUAL` | Opcional | Fuerza el modo manual de resultados del Mundial. |
| `API_FOOTBALL_KEY`, `MUNDIAL_LEAGUE_ID`, `MUNDIAL_SEASON`, `MUNDIAL_SPAIN_ID`, `MUNDIAL_REVALIDATE` | Opcional | Integración con API-Football para resultados en vivo (con fallback manual). |

---

## Base de datos

Usa **Neon** (Postgres) a través de **Drizzle ORM**. El esquema vive en `lib/db/schema.ts`.

El proyecto se **auto-repara**: `lib/db/ensure-schema.ts` crea las tablas y columnas que falten de forma idempotente (`CREATE TABLE IF NOT EXISTS`, `ALTER ... ADD COLUMN IF NOT EXISTS`) en la primera petición que las necesite. Así, añadir un campo o desplegar sobre una base de datos nueva no rompe nada.

Tablas principales: `projects`, `posts`, `components`, `users`, `magic_tokens`, y las de la campaña (`mundial_cupones`, `mundial_leads`, `mundial_porra`).

---

## Autenticación

Acceso al panel mediante **enlace mágico**: el usuario introduce su email, recibe un enlace de un solo uso (token con caducidad en `magic_tokens`) y, al validarlo, se crea una sesión firmada (`jose`) guardada en cookie. El `middleware.ts` protege todo lo que cuelga de `/dashboard`. Solo los emails dados de alta como administradores pueden entrar.

---

## Subdominios

`middleware.ts` + `lib/demos.ts` permiten servir cada proyecto bajo `<sub>.espanias.com`:

- **`live`** — la demo vive en *este* repo, en `app/demos/<sub>/`. El middleware reescribe `<sub>.espanias.com` → `/demos/<sub>`.
- **`pending`** — la web vive en su propio proyecto de Vercel. El subdominio se configura allí (Settings → Domains) y tiene prioridad sobre el comodín, así que ni llega a este repo.

---

## Endpoints útiles

Algunos endpoints con token para tareas de mantenimiento y para integraciones:

| Endpoint | Para qué |
|---|---|
| `GET /api/catalog-apply?token=…` | Aplica a la base de datos (UPSERT por slug) las ediciones del catálogo definidas en el propio archivo. Idempotente. |
| `GET /api/agente/projects` | Lista pública de proyectos (JSON). |
| `GET /api/agente/export?project=<slug>&format=json\|md` | Exporta la ficha completa de un proyecto. |
| `GET /api/mundial-reto` | Estado del descuento del reto (lo consume por2duros.com). |
| `POST /api/mundial-prize`, `/api/mundial-lead`, `/api/mundial-porra` | Mecánicas de la campaña del Mundial. |

> Los tokens son secretos de mantenimiento; no se documentan aquí.

---

## Estructura del proyecto

```
app/
  catalogo/        Catálogo público + ficha de cada proyecto
  dashboard/       Panel de gestión (proyectos, blog, biblioteca, usuarios)
  blog/            Blog público
  mundial/         Campaña Reto Mundial 2026
  demos/           Demos servidas en subdominios (multi-tenant)
  auth/            Login con enlace mágico
  api/             Endpoints (catálogo, mundial, agente, admin…)
  actions/         Server actions (p. ej. formulario de contacto)
  servicios/, manifiesto/, ia-empresas/, privacidad/, cookies/, aviso-legal/
lib/
  db/              Esquema, cliente, auto-reparación y repositorios (Drizzle)
  auth/            Enlace mágico y sesiones
  projects.ts      Lista estática de proyectos (respaldo del catálogo)
  mundial*.ts      Lógica de la campaña del Mundial
  demos.ts         Registro de subdominios
  translations.ts  Textos ES/EN
middleware.ts      Subdominios + protección del panel
public/
  projects/        Capturas de los proyectos (.webp)
```

---

## Despliegue

Desplegado en **Vercel**. Cada push a `main` despliega automáticamente. Las variables de entorno se configuran en el panel del proyecto en Vercel. La base de datos es Neon (Postgres serverless), también vinculada desde Vercel.

---

## Sobre Por 2 Duros

Espanias es el portfolio de **[Por 2 Duros](https://www.por2duros.com)**, agencia de desarrollo web andaluza que entrega proyectos digitales a precios accesibles, construidos desde cero y sin plantillas.
