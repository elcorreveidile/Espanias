import {
  projects as staticProjects,
  type Project,
  type Category,
} from '@/lib/projects'

// Capa de acceso a datos del catálogo.
// Lee de Neon (Postgres) cuando hay DATABASE_URL y tablas con datos;
// si la BD no está disponible o está vacía, cae automáticamente a la
// lista estática de lib/projects.ts para que la web pública nunca falle.

const VALID_CATEGORIES: Category[] = [
  'ia', 'educacion', 'literatura', 'personal', 'salud', 'derecho',
  'inmobiliaria', 'hosteleria', 'comercio', 'deporte', 'eventos', 'saas',
  'gestion', 'mascotas', 'belleza', 'desarrollo-web', 'otros',
]

const VALID_STATUS: Project['status'][] = ['idea', 'planeado', 'desarrollo', 'hecho']

type DbRow = Record<string, unknown>

const str = (v: unknown): string => (typeof v === 'string' ? v : '')

function mapRow(row: DbRow): Project {
  const rawCategory = str(row.category)
  const rawStatus = str(row.estado)
  const category: Category = (VALID_CATEGORIES as string[]).includes(rawCategory)
    ? (rawCategory as Category)
    : 'otros'
  const status: Project['status'] = (VALID_STATUS as string[]).includes(rawStatus)
    ? (rawStatus as Project['status'])
    : 'idea'

  const es = str(row.descripcionEs) || str(row.descripcion)
  const en = str(row.descripcionEn) || es
  const demo = str(row.demoUrl)
  const sector = str(row.sector)
  const image = str(row.imagenUrl)
  const claim = str(row.claim)

  // Categorías adicionales: columna `categories` (lista separada por comas).
  // Se filtran las válidas y se excluye la principal para no duplicar.
  const extraCategories = str(row.categories)
    .split(',')
    .map((s) => s.trim())
    .filter((s): s is Category =>
      (VALID_CATEGORIES as string[]).includes(s) && s !== category
    )

  return {
    id: str(row.slug),
    name: str(row.nombre),
    slug: str(row.slug),
    url: str(row.url),
    claim: claim || undefined,
    demo: demo || undefined,
    description: { es, en },
    category,
    categories: extraCategories.length ? extraCategories : undefined,
    status,
    sector: sector || undefined,
    image: image || undefined,
  }
}

async function fetchFromDb(): Promise<Project[] | null> {
  if (!process.env.DATABASE_URL) return null
  try {
    const { db } = await import('@/lib/db/client')
    const { projects: projectsTable } = await import('@/lib/db/schema')
    const { ensureProjectColumns } = await import('@/lib/db/ensure-schema')
    await ensureProjectColumns()
    const rows = await db.select().from(projectsTable)
    if (!rows.length) return null
    return rows.map(mapRow)
  } catch (err) {
    console.error('[catalog-data] Fallo al leer de la BD, usando estático:', err)
    return null
  }
}

export async function getCatalogProjects(): Promise<Project[]> {
  const fromDb = await fetchFromDb()
  return fromDb ?? staticProjects
}

export async function getCatalogProject(
  slug: string
): Promise<Project | undefined> {
  const all = await getCatalogProjects()
  return all.find((p) => p.slug === slug)
}
