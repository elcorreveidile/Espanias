import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { components, sharedDecisions, learnings, projects, users } from '@/lib/db/schema'

export const listComponents = () => db.select().from(components)
export const listDecisions = () => db.select().from(sharedDecisions)

export async function listLearnings() {
  const [ls, ps] = await Promise.all([
    db.select().from(learnings),
    db.select({ id: projects.id, nombre: projects.nombre }).from(projects),
  ])
  const nameById = new Map(ps.map((p) => [p.id, p.nombre]))
  return ls.map((l) => ({ ...l, proyecto: l.projectId ? nameById.get(l.projectId) ?? null : null }))
}

export const listUsers = () => db.select().from(users)

export async function addUser(email: string, nombre: string | null, rol: string) {
  await db
    .insert(users)
    .values({ email: email.trim().toLowerCase(), nombre, rol })
    .onConflictDoNothing({ target: users.email })
}

export async function deleteUser(email: string) {
  await db.delete(users).where(eq(users.email, email.trim().toLowerCase()))
}
