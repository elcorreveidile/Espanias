import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { ensureProjectColumns } from '@/lib/db/ensure-schema'
import { projects, learnings } from '@/lib/db/schema'

export type ProjectRow = typeof projects.$inferSelect

export async function listProjects(): Promise<ProjectRow[]> {
  await ensureProjectColumns()
  return db.select().from(projects)
}

export async function getProjectRow(slug: string): Promise<ProjectRow | undefined> {
  await ensureProjectColumns()
  const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1)
  return rows[0]
}

/** Elimina un proyecto y sus learnings dependientes. */
export async function deleteProject(slug: string): Promise<void> {
  const rows = await db.select({ id: projects.id }).from(projects).where(eq(projects.slug, slug)).limit(1)
  const p = rows[0]
  if (!p) return
  await db.delete(learnings).where(eq(learnings.projectId, p.id))
  await db.delete(projects).where(eq(projects.slug, slug))
}

export interface ProjectUpdate {
  nombre?: string
  category?: string
  estado?: string
  sector?: string | null
  claim?: string | null
  descripcionEs?: string | null
  descripcionEn?: string | null
  url?: string | null
  demoUrl?: string | null
  repositorioUrl?: string | null
  planMaestroUrl?: string | null
  componentesIncluidos?: string | null
  imagenUrl?: string | null
  paletaPrincipal?: string | null
  paletaSecundaria?: string | null
  paletaAccion?: string | null
  tipografiaTitulos?: string | null
  tipografiaCuerpo?: string | null
  notasInternas?: string | null
}

export async function updateProject(slug: string, data: ProjectUpdate): Promise<void> {
  await ensureProjectColumns()
  await db
    .update(projects)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(projects.slug, slug))
}

export async function getStats() {
  const rows = await listProjects()
  const byStatus: Record<string, number> = {}
  for (const r of rows) {
    const s = r.estado ?? 'idea'
    byStatus[s] = (byStatus[s] ?? 0) + 1
  }
  return { total: rows.length, byStatus }
}
