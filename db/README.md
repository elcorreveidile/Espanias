# Base de datos — Espanias (Neon / Postgres)

## Arranque (una sola vez)

1. Entra en tu proyecto de **Neon** → pestaña **SQL Editor**.
2. Abre el archivo [`db/setup.sql`](./setup.sql) de este repo, **copia todo su contenido** y pégalo en el editor SQL de Neon.
3. Pulsa **Run**. Esto crea las tablas y siembra los 50 proyectos + tu usuario admin.

El script es **idempotente**: puedes ejecutarlo más de una vez sin duplicar datos
(las tablas usan `IF NOT EXISTS` y los proyectos `ON CONFLICT (slug) DO NOTHING`).

Una vez ejecutado, `https://www.espanias.com/catalogo` empezará a leer de la base
de datos. Hasta entonces (o si la BD falla) el catálogo cae automáticamente a la
lista estática de `lib/projects.ts`, así que la web pública nunca se queda en blanco.

## Regenerar el SQL

Si cambian los datos en `lib/projects.ts`, regenera el archivo con:

```bash
npm run gen:setup-sql
```

## Variables de entorno necesarias (en Vercel)

- `DATABASE_URL` — cadena de conexión de Neon (ya configurada).
- `RESEND_API_KEY` — para el magic link del dashboard (Fase 2B, ya configurada).
