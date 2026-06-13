import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { projects } from '@/lib/db/schema'

export type ProjectRow = typeof projects.$inferSelect

export async function listProjects(): Promise<ProjectRow[]> {
  return db.select().from(projects)
}

export async function getProjectRow(slug: string): Promise<ProjectRow | undefined> {
  const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1)
  return rows[0]
}

export interface ProjectUpdate {
  nombre?: string
  category?: string
  estado?: string
  sector?: string | null
  descripcionEs?: string | null
  descripcionEn?: string | null
  url?: string | null
  demoUrl?: string | null
  repositorioUrl?: string | null
  notasInternas?: string | null
}

export async function updateProject(slug: string, data: ProjectUpdate): Promise<void> {
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
