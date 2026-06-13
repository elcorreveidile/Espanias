import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import {
  projects,
  components,
  sharedDecisions,
  learnings,
} from '@/lib/db/schema'
import type { ProjectRow } from '@/lib/db/projects-repo'

export interface AgenteContext {
  project: ProjectRow
  componentes: Array<typeof components.$inferSelect>
  patrones: Array<typeof sharedDecisions.$inferSelect>
  learnings: Array<typeof learnings.$inferSelect>
}

const splitList = (v: string | null): string[] =>
  (v ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

/** Reúne todo el contexto de un proyecto: datos, componentes, patrones y learnings. */
export async function getFullContext(slug: string): Promise<AgenteContext | null> {
  const projRows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1)
  const project = projRows[0]
  if (!project) return null

  // Componentes reutilizables incluidos en este proyecto (por slug).
  const wantedComponentSlugs = splitList(project.componentesIncluidos)
  const allComponents = wantedComponentSlugs.length
    ? await db.select().from(components)
    : []
  const componentes = allComponents.filter((c) => wantedComponentSlugs.includes(c.slug))

  // Decisiones/patrones que referencian este proyecto.
  const allDecisions = await db.select().from(sharedDecisions)
  const patrones = allDecisions.filter((d) =>
    splitList(d.referenciaProyectos).includes(slug)
  )

  // Learnings de este proyecto.
  const projectLearnings = await db
    .select()
    .from(learnings)
    .where(eq(learnings.projectId, project.id))

  return { project, componentes, patrones, learnings: projectLearnings }
}
