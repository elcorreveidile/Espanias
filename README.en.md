# Espanias

[🇪🇸 Español](./README.md) · 🇬🇧 English

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)](https://vercel.com)

**Espanias** ([espanias.com](https://espanias.com)) is the portfolio and web-app catalogue of the agency **Por 2 Duros**. It's a living, bilingual (ES/EN) showcase of real projects —from local-business websites to SaaS and custom apps— with its own management dashboard, a blog, and marketing campaigns such as the *Reto Mundial 2026*.

> "Spain is, literally, in our name." (*España* → *Espanias*.)

It's not a template: every piece (catalogue, dashboard, authentication, multi-tenant demo system) is built from scratch on Next.js.

---

## What's inside?

- **Project catalogue** (`/catalogo`) — bilingual cards with tagline, description, screenshot, category, status and links to the live or demo site. Data is read from the database on every request, with a static fallback list so the site never breaks.
- **Management dashboard** (`/dashboard`) — CRUD for projects, blog, component library and users, protected by session.
- **Blog** (`/blog`) — bilingual posts managed from the dashboard.
- **Multi-tenant demos** (`*.espanias.com`) — each project can be served on its own subdomain (see [Subdomains](#subdomains)).
- **Reto Mundial 2026** (`/mundial`) — a campaign with a penalty mini-game, signed discount coupons, a discount that grows with Spain's wins, lead capture and a prediction pool (*porra*) with a prize.
- **Brand pages** — services, manifesto, AI for businesses, and the legal ones (privacy, cookies, legal notice).

---

## Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 15** (App Router) + **React 19** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS 3.4** (class-based dark mode) |
| Database | **Neon** (serverless Postgres) |
| ORM | **Drizzle ORM** |
| Authentication | **Magic link** with a signed session (`jose`) |
| Email | **Resend** |
| Storage | **Vercel Blob** (image uploads) |
| Analytics | **Vercel Analytics** |
| Deployment | **Vercel** |

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables (see table below)
cp .env.example .env.local   # if it doesn't exist, create it manually

# 3. Run in development
npm run dev                  # http://localhost:3000
```

### Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serves the build |
| `npm run lint` | ESLint (Next config) |
| `npm run gen:setup-sql` | Generates `db/setup.sql` from the schema |

---

## Environment variables

| Variable | Required | What it's for |
|---|---|---|
| `DATABASE_URL` | Yes (in prod) | Neon (Postgres) connection string. Without it, the catalogue uses the static fallback list. |
| `AUTH_SECRET` | Yes | Signs the session cookies. |
| `RESEND_API_KEY` | Yes | Email delivery (magic links, contact, porra). |
| `EMAIL_FROM` | Recommended | Email sender (e.g. `Espanias <hola@espanias.com>`). |
| `ADMIN_EMAIL` | Recommended | Admin email with dashboard access. |
| `BLOB_READ_WRITE_TOKEN` | For image uploads | Vercel Blob token. |
| `MUNDIAL_COUPON_SECRET` | Mundial campaign | HMAC secret to sign the coupons redeemed by por2duros.com. |
| `MUNDIAL_FREEWEB_CAP` | Optional | Global cap of free websites in the campaign (default 3). |
| `MUNDIAL_FORCE_MANUAL` | Optional | Forces manual mode for World Cup results. |
| `API_FOOTBALL_KEY`, `MUNDIAL_LEAGUE_ID`, `MUNDIAL_SEASON`, `MUNDIAL_SPAIN_ID`, `MUNDIAL_REVALIDATE` | Optional | API-Football integration for live results (with manual fallback). |

---

## Database

Uses **Neon** (Postgres) through **Drizzle ORM**. The schema lives in `lib/db/schema.ts`.

The project is **self-healing**: `lib/db/ensure-schema.ts` idempotently creates any missing tables and columns (`CREATE TABLE IF NOT EXISTS`, `ALTER ... ADD COLUMN IF NOT EXISTS`) on the first request that needs them. So adding a field or deploying against a fresh database never breaks anything.

Main tables: `projects`, `posts`, `components`, `users`, `magic_tokens`, and the campaign ones (`mundial_cupones`, `mundial_leads`, `mundial_porra`).

---

## Authentication

Dashboard access uses a **magic link**: the user enters their email, receives a single-use link (a token with an expiry stored in `magic_tokens`) and, once validated, a signed session (`jose`) is created and stored in a cookie. The `middleware.ts` protects everything under `/dashboard`. Only emails registered as admins can sign in.

---

## Subdomains

`middleware.ts` + `lib/demos.ts` allow each project to be served under `<sub>.espanias.com`:

- **`live`** — the demo lives in *this* repo, under `app/demos/<sub>/`. The middleware rewrites `<sub>.espanias.com` → `/demos/<sub>`.
- **`pending`** — the site lives in its own Vercel project. The subdomain is configured there (Settings → Domains) and takes priority over the wildcard, so it never reaches this repo.

---

## Useful endpoints

Some token-protected endpoints for maintenance tasks and integrations:

| Endpoint | What it's for |
|---|---|
| `GET /api/catalog-apply?token=…` | Applies catalogue edits defined in the file itself to the database (UPSERT by slug). Idempotent. |
| `GET /api/agente/projects` | Public list of projects (JSON). |
| `GET /api/agente/export?project=<slug>&format=json\|md` | Exports a project's full card. |
| `GET /api/mundial-reto` | State of the *reto* discount (consumed by por2duros.com). |
| `POST /api/mundial-prize`, `/api/mundial-lead`, `/api/mundial-porra` | World Cup campaign mechanics. |

> The tokens are maintenance secrets; they are not documented here.

---

## Project structure

```
app/
  catalogo/        Public catalogue + each project's card
  dashboard/       Management panel (projects, blog, library, users)
  blog/            Public blog
  mundial/         Reto Mundial 2026 campaign
  demos/           Demos served on subdomains (multi-tenant)
  auth/            Magic-link login
  api/             Endpoints (catalogue, mundial, agente, admin…)
  actions/         Server actions (e.g. contact form)
  servicios/, manifiesto/, ia-empresas/, privacidad/, cookies/, aviso-legal/
lib/
  db/              Schema, client, self-healing and repositories (Drizzle)
  auth/            Magic link and sessions
  projects.ts      Static project list (catalogue fallback)
  mundial*.ts      World Cup campaign logic
  demos.ts         Subdomain registry
  translations.ts  ES/EN copy
middleware.ts      Subdomains + dashboard protection
public/
  projects/        Project screenshots (.webp)
```

---

## Deployment

Deployed on **Vercel**. Every push to `main` deploys automatically. Environment variables are configured in the Vercel project dashboard. The database is Neon (serverless Postgres), also linked from Vercel.

---

## About Por 2 Duros

Espanias is the portfolio of **[Por 2 Duros](https://www.por2duros.com)**, an Andalusian web-development agency that ships digital projects at affordable prices, built from scratch and without templates.
