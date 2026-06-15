import { sql } from "drizzle-orm";
import { db } from "./client";

// Auto-reparación del esquema: crea las tablas si faltan (idempotente, no borra
// nada). Evita que el login (u otras operaciones) fallen si una tabla no se creó
// al montar la base de datos. Se ejecuta una sola vez por instancia del servidor.
let schemaReady: Promise<void> | null = null;

// Email del admin con acceso al panel. Configurable por entorno; si no, el
// mismo que siembra db/setup.sql, para que un arranque en BD nueva no deje el
// login inservible (whitelist vacía → ningún email se enviaría).
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'informa@blablaele.com')
  .trim()
  .toLowerCase()

// Cada sentencia por separado: el driver HTTP de Neon ejecuta una por petición.
const STATEMENTS = [
  sql`CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    email varchar(255) UNIQUE NOT NULL,
    nombre varchar(255),
    rol varchar(50) DEFAULT 'viewer',
    creado_por integer,
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now()
  )`,
  sql`CREATE TABLE IF NOT EXISTS magic_tokens (
    id serial PRIMARY KEY,
    email varchar(255) NOT NULL,
    token varchar(255) UNIQUE NOT NULL,
    expires_at timestamp NOT NULL,
    created_at timestamp DEFAULT now()
  )`,
  // Garantiza que el admin existe y tiene rol admin (no pisa otros datos).
  sql`INSERT INTO users (email, nombre, rol)
      VALUES (${ADMIN_EMAIL}, 'Javier', 'admin')
      ON CONFLICT (email) DO UPDATE SET rol = 'admin'`,
];

async function run(): Promise<void> {
  for (const stmt of STATEMENTS) {
    await db.execute(stmt);
  }
}

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = run().catch((err) => {
      // No cacheamos el fallo: permitimos reintentar en la siguiente llamada.
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

// Auto-migración idempotente de columnas nuevas en projects (p. ej. imagen_url),
// para que añadir campos no rompa las lecturas en una BD ya existente.
let projectCols: Promise<void> | null = null;

export function ensureProjectColumns(): Promise<void> {
  if (!projectCols) {
    projectCols = db
      .execute(sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS imagen_url text`)
      .then(() => undefined)
      .catch((err) => {
        projectCols = null;
        throw err;
      });
  }
  return projectCols;
}

// Crea la tabla del blog si no existe (idempotente).
let postsReady: Promise<void> | null = null;

export function ensurePostsTable(): Promise<void> {
  if (!postsReady) {
    postsReady = run_posts().catch((err) => {
      postsReady = null;
      throw err;
    });
  }
  return postsReady;
}

async function run_posts(): Promise<void> {
  await db.execute(sql`CREATE TABLE IF NOT EXISTS posts (
    id serial PRIMARY KEY,
    slug varchar(160) UNIQUE NOT NULL,
    titulo varchar(255) NOT NULL,
    resumen varchar(500),
    contenido text,
    portada_url text,
    publicado integer DEFAULT 0,
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now()
  )`);
  // Columnas bilingües (añadidas a posteriori; idempotente).
  await db.execute(sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS titulo_en varchar(255)`);
  await db.execute(sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS resumen_en varchar(500)`);
  await db.execute(sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS contenido_en text`);
}
