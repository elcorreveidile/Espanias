/**
 * Genera db/setup.sql: crea las tablas y siembra los proyectos a partir de
 * la lista estática de lib/projects.ts. Ejecutar con:
 *   npx tsx scripts/gen-setup-sql.ts
 * El SQL resultante se pega tal cual en la consola SQL de Neon.
 */
import { writeFileSync, mkdirSync } from 'fs'
import { projects } from '../lib/projects'

const ADMIN_EMAIL = 'informa@blablaele.com'
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

// ============================================================
// Biblioteca: componentes, patrones (decisiones) y learnings.
// Da contenido real a /api/agente/context y /export.
// ============================================================
const componentes = [
  ['booking-engine', 'Motor de Reservas', 'reservas', 'Sistema de citas con anti-solapamiento, confirmación por email y gestión de clientes.', '/dashboard/biblioteca/componentes#booking-engine'],
  ['admin-panel', 'Panel de Administración', 'admin', 'Panel CRUD usable desde móvil para gestionar el negocio.', '/dashboard/biblioteca/componentes#admin-panel'],
  ['calculator', 'Calculadora de Presupuestos', 'calcular', 'Presupuestos interactivos en tiempo real.', '/dashboard/biblioteca/componentes#calculator'],
  ['fidelization', 'Fidelización', 'pauta', 'Sistema de bonos y fidelización automática de clientes.', '/dashboard/biblioteca/componentes#fidelization'],
  ['whatsapp-agent', 'Agente de WhatsApp', 'ia', 'Bot conversacional con Claude (tool use) que da citas por WhatsApp: entiende lenguaje natural, consulta huecos y reserva contra la misma base de datos que la web.', '/dashboard/biblioteca/componentes#whatsapp-agent'],
]

const decisiones = [
  ['Anti-solapamiento de reservas', 'database', 'EXCLUDE USING gist constraint en Postgres', 'Garantía a nivel de base de datos, no de aplicación.', 'perruqueria-canina,eje-fisioterapia'],
  ['Magic link sin contraseñas', 'auth', 'Token de un solo uso enviado por email (Resend)', 'Menos fricción para el usuario y sin gestión de contraseñas.', 'espanias-main'],
  ['Reservas conversacionales por WhatsApp', 'ia', 'Claude (claude-opus-4-8) con tool use; las herramientas ejecutan la lógica de reserva contra Postgres', 'Un solo cerebro conversacional; las reglas de negocio y el anti-solapamiento viven en la base de datos, no en el prompt.', 'barberia'],
]

const learningsSeed = [
  ['perruqueria-canina', 'Panel admin usable desde móvil', 'El negocio gestiona las citas desde el móvil; el panel debe ser mobile-first.', 'what-worked'],
  ['eje-fisioterapia', 'Notas de tratamiento', 'Las notas estructuradas por sesión agilizan el seguimiento del paciente.', 'what-worked'],
]

const bibliotecaSql = `

-- ============================================================
-- Biblioteca · componentes reutilizables
-- ============================================================
${componentes
  .map(
    ([slug, nombre, categoria, descripcion, docUrl]) =>
      `INSERT INTO components (slug, nombre, categoria, descripcion, doc_url) VALUES (${q(slug)}, ${q(nombre)}, ${q(categoria)}, ${q(descripcion)}, ${q(docUrl)})\nON CONFLICT (slug) DO NOTHING;`
  )
  .join('\n')}

-- ============================================================
-- Biblioteca · patrones / decisiones compartidas
-- ============================================================
${decisiones
  .map(
    ([titulo, categoria, decision, razon, ref]) =>
      `INSERT INTO shared_decisions (titulo, categoria, decision, razon, referencia_proyectos)\nSELECT ${q(titulo)}, ${q(categoria)}, ${q(decision)}, ${q(razon)}, ${q(ref)}\nWHERE NOT EXISTS (SELECT 1 FROM shared_decisions WHERE titulo = ${q(titulo)});`
  )
  .join('\n')}

-- ============================================================
-- Biblioteca · learnings (vinculados por slug)
-- ============================================================
${learningsSeed
  .map(
    ([slug, titulo, contenido, tipo]) =>
      `INSERT INTO learnings (project_id, titulo, contenido, tipo)\nSELECT p.id, ${q(titulo)}, ${q(contenido)}, ${q(tipo)} FROM projects p WHERE p.slug = ${q(slug)}\nAND NOT EXISTS (SELECT 1 FROM learnings l WHERE l.titulo = ${q(titulo)});`
  )
  .join('\n')}

-- ============================================================
-- Ejemplo: identidad visual + componentes en perru y fisio
-- (solo si están vacíos, para no pisar ediciones del panel)
-- ============================================================
UPDATE projects SET componentes_incluidos = 'booking-engine,fidelization',
  paleta_principal = '#A8D8F0', paleta_secundaria = '#FFF7EA', paleta_accion = '#E8436B',
  tipografia_titulos = 'Fraunces', tipografia_cuerpo = 'Nunito Sans',
  claim = COALESCE(claim, 'Peluquería canina en positivo')
WHERE slug = 'perruqueria-canina' AND componentes_incluidos IS NULL;

UPDATE projects SET componentes_incluidos = 'booking-engine,admin-panel',
  claim = COALESCE(claim, 'Entiende tu dolor')
WHERE slug = 'eje-fisioterapia' AND componentes_incluidos IS NULL;

-- Barbería: reservas web + agente de WhatsApp
UPDATE projects SET componentes_incluidos = 'booking-engine,whatsapp-agent',
  claim = COALESCE(claim, 'Tu cita, por la web o por WhatsApp'),
  repositorio_url = COALESCE(repositorio_url, 'https://github.com/elcorreveidile/barberia-demo')
WHERE slug = 'barberia' AND componentes_incluidos IS NULL;
`

mkdirSync('db', { recursive: true })
writeFileSync('db/setup.sql', ddl + inserts + bibliotecaSql + '\n')
console.log(`✅ db/setup.sql generado con ${projects.length} proyectos + biblioteca`)
