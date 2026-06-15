import { sql } from "drizzle-orm";
import { db } from "./client";

// Auto-reparación del esquema: crea las tablas si faltan (idempotente, no borra
// nada). Evita que el login (u otras operaciones) fallen si una tabla no se creó
// al montar la base de datos. Se ejecuta una sola vez por instancia del servidor.
let schemaReady: Promise<void> | null = null;

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
