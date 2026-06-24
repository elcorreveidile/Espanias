# Demos multi-tenant (`*.espanias.com`)

Sistema para servir demos en subdominios de `espanias.com` sin crear una URL
nueva en Vercel por cada una (patrón "una app, muchos subdominios").

## Cómo funciona

1. En Vercel se añade **una sola vez** el dominio comodín `*.espanias.com` a
   **este** proyecto (el de espanias.com).
2. `middleware.ts` lee el subdominio de la cabecera `Host`:
   - `www.espanias.com` / `espanias.com` → catálogo normal.
   - `<demo>.espanias.com` con `status: 'live'` en `lib/demos.ts` →
     reescribe internamente a `app/demos/<demo>/`.
3. Cada demo "live" es una carpeta en `app/demos/<subdominio>/` con su propio
   diseño (independiente del catálogo).

## Añadir una demo nueva (servida desde aquí)

1. Crea `app/demos/<subdominio>/page.tsx` con el diseño de la demo.
2. Añade su entrada en `lib/demos.ts` con `status: 'live'`.
3. `git push`. Queda disponible en `<subdominio>.espanias.com`. No se toca Vercel.

Para probar en local: `http://<subdominio>.localhost:3000`.

## Configuración en Vercel (una sola vez)

- Proyecto de espanias.com → **Settings → Domains → Add** → `*.espanias.com`.
- Como el dominio raíz ya está en la cuenta, Vercel crea el DNS y el SSL solo.

## Demos que todavía viven en su propio proyecto (`status: 'pending'`)

Mientras una demo siga en su repo/proyecto aparte, su subdominio concreto se
añade **en ese proyecto** (Settings → Domains → `dentista.espanias.com`, etc.).
Un subdominio concreto tiene prioridad sobre el wildcard, así que esas peticiones
ni siquiera llegan a este repo.

Para migrar una demo aquí: trae su código a `app/demos/<sub>/`, cámbiala a
`status: 'live'` en `lib/demos.ts`, y quita su subdominio del proyecto antiguo.
