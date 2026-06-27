import { sql } from "drizzle-orm";
import { serial, varchar, text, timestamp, integer, pgTable } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).unique().notNull(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  // Campos para el catálogo público (bilingüe + categoría)
  category: varchar("category", { length: 50 }),
  // Lista completa de categorías separadas por comas (multi-categoría).
  categories: text("categories"),
  descripcionEs: text("descripcion_es"),
  descripcionEn: text("descripcion_en"),
  url: text("url"),
  claim: varchar("claim", { length: 500 }),
  sector: varchar("sector", { length: 100 }),
  descripcion: text("descripcion"),
  estado: varchar("estado", { length: 50 }),
  paletaPrincipal: varchar("paleta_principal", { length: 7 }),
  paletaSecundaria: varchar("paleta_secundaria", { length: 7 }),
  paletaAccion: varchar("paleta_accion", { length: 7 }),
  tipografiaTitulos: varchar("tipografia_titulos", { length: 100 }),
  tipografiaCuerpo: varchar("tipografia_cuerpo", { length: 100 }),
  backend: varchar("backend", { length: 50 }),
  orm: varchar("orm", { length: 50 }),
  authProvider: varchar("auth_provider", { length: 50 }),
  planMaestroUrl: text("plan_maestro_url"),
  repositorioUrl: text("repositorio_url"),
  demoUrl: text("demo_url"),
  imagenUrl: text("imagen_url"),
  notasInternas: text("notas_internas"),
  componentesIncluidos: varchar("componentes_incluidos", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).unique().notNull(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  resumen: varchar("resumen", { length: 500 }),
  contenido: text("contenido"),
  tituloEn: varchar("titulo_en", { length: 255 }),
  resumenEn: varchar("resumen_en", { length: 500 }),
  contenidoEn: text("contenido_en"),
  portadaUrl: text("portada_url"),
  publicado: integer("publicado").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const components = pgTable("components", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).unique().notNull(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  descripcion: text("descripcion"),
  categoria: varchar("categoria", { length: 100 }),
  projectsUsing: varchar("projects_using", { length: 500 }),
  docUrl: text("doc_url"),
  esquemaBd: text("esquema_bd"),
  componentesReact: varchar("componentes_react", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sharedDecisions = pgTable("shared_decisions", {
  id: serial("id").primaryKey(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  descripcion: text("descripcion"),
  categoria: varchar("categoria", { length: 100 }),
  decision: text("decision"),
  razon: text("razon"),
  referenciaProyectos: varchar("referencia_proyectos", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const learnings = pgTable("learnings", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  titulo: varchar("titulo", { length: 255 }),
  contenido: text("contenido"),
  tipo: varchar("tipo", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  nombre: varchar("nombre", { length: 255 }),
  rol: varchar("rol", { length: 50 }).default("viewer"),
  creadoPor: integer("creado_por"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const magicTokens = pgTable("magic_tokens", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).unique().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Cupones del juego del Mundial: un registro por email (candado real anti-abuso).
export const mundialCupones = pgTable("mundial_cupones", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  code: varchar("code", { length: 40 }).notNull(),
  pct: integer("pct").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Leads del juego del Mundial: email de quien canjea su cupón (uno por email).
export const mundialLeads = pgTable("mundial_leads", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  code: varchar("code", { length: 40 }),
  pct: integer("pct"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Porra del Mundial: pronósticos por partido (un pronóstico por email y partido).
// `desempate` = minuto del primer gol (criterio de desempate entre acertantes).
export const mundialPorra = pgTable("mundial_porra", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  partido: varchar("partido", { length: 80 }).notNull(),
  golesEs: integer("goles_es").notNull(),
  golesRival: integer("goles_rival").notNull(),
  desempate: integer("desempate"), // minuto del primer gol dentro de la parte
  desempateFase: integer("desempate_fase"), // 1=1ª parte, 2=2ª parte, 3=prórroga
  createdAt: timestamp("created_at").defaultNow(),
});

export type Project = typeof projects.$inferSelect;
