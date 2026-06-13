/**
 * Genera db/setup.sql: crea las tablas y siembra los proyectos a partir de
 * la lista estática de lib/projects.ts. Ejecutar con:
 *   npx tsx scripts/gen-setup-sql.ts
 * El SQL resultante se pega tal cual en la consola SQL de Neon.
 */
import { writeFileSync, mkdirSync } from 'fs'
import { projects } from '../lib/projects'

const ADMIN_EMAIL = 'javier@blablaele.com'
const ADMIN_NAME = 'Javier'

const q = (v: string | undefined | null): string =>
  v === undefined || v === null ? 'NULL' : `'${v.replace(/'/g, "''")}'`

const ddl = `-- ============================================================
-- Espanias · setup de base de datos (Neon / Postgres)
-- Pega TODO este archivo en la consola SQL de Neon y ejecútalo.
-- Es idempotente: se puede ejecutar varias veces sin duplicar.
-- ============================================================

CREATE TABLE IF NOT EXISTS projects (
  id serial PRIMARY KEY,
  slug varchar(100) UNIQUE NOT NULL,
  nombre varchar(255) NOT NULL,
  category varchar(50),
  descripcion_es text,
  descripcion_en text,
  url text,
  claim varchar(500),
  sector varchar(100),
  descripcion text,
  estado varchar(50),
  paleta_principal varchar(7),
  paleta_secundaria varchar(7),
  paleta_accion varchar(7),
  tipografia_titulos varchar(100),
  tipografia_cuerpo varchar(100),
  backend varchar(50),
  orm varchar(50),
  auth_provider varchar(50),
  plan_maestro_url text,
  repositorio_url text,
  demo_url text,
  notas_internas text,
  componentes_incluidos varchar(500),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS components (
  id serial PRIMARY KEY,
  slug varchar(100) UNIQUE NOT NULL,
  nombre varchar(255) NOT NULL,
  descripcion text,
  categoria varchar(100),
  projects_using varchar(500),
  doc_url text,
  esquema_bd text,
  componentes_react varchar(500),
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS shared_decisions (
  id serial PRIMARY KEY,
  titulo varchar(255) NOT NULL,
  descripcion text,
  categoria varchar(100),
  decision text,
  razon text,
  referencia_proyectos varchar(500),
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS learnings (
  id serial PRIMARY KEY,
  project_id integer REFERENCES projects(id),
  titulo varchar(255),
  contenido text,
  tipo varchar(50),
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  email varchar(255) UNIQUE NOT NULL,
  nombre varchar(255),
  rol varchar(50) DEFAULT 'viewer',
  creado_por integer,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS magic_tokens (
  id serial PRIMARY KEY,
  email varchar(255) NOT NULL,
  token varchar(255) UNIQUE NOT NULL,
  expires_at timestamp NOT NULL,
  created_at timestamp DEFAULT now()
);

-- Auth.js (next-auth) tablas para el adaptador de BD
CREATE TABLE IF NOT EXISTS verification_token (
  identifier text NOT NULL,
  token text NOT NULL,
  expires timestamptz NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- ============================================================
-- Usuario admin
-- ============================================================
INSERT INTO users (email, nombre, rol) VALUES (${q(ADMIN_EMAIL)}, ${q(ADMIN_NAME)}, 'admin')
ON CONFLICT (email) DO UPDATE SET rol = 'admin';

-- ============================================================
-- Proyectos (${projects.length})
-- ============================================================
`

const inserts = projects
  .map((p) => {
    const cols = ['slug', 'nombre', 'category', 'estado', 'sector', 'descripcion_es', 'descripcion_en', 'url', 'demo_url']
    const vals = [
      q(p.slug),
      q(p.name),
      q(p.category),
      q(p.status),
      q(p.sector),
      q(p.description.es),
      q(p.description.en),
      q(p.url),
      q(p.demo),
    ]
    return `INSERT INTO projects (${cols.join(', ')}) VALUES (${vals.join(', ')})\nON CONFLICT (slug) DO NOTHING;`
  })
  .join('\n')

mkdirSync('db', { recursive: true })
writeFileSync('db/setup.sql', ddl + inserts + '\n')
console.log(`✅ db/setup.sql generado con ${projects.length} proyectos`)
