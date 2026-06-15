import { desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { ensurePostsTable } from '@/lib/db/ensure-schema'
import { posts } from '@/lib/db/schema'

export type PostRow = typeof posts.$inferSelect

/** Artículos publicados, más recientes primero (web pública). */
export async function listPublishedPosts(): Promise<PostRow[]> {
  await ensurePostsTable()
  return db
    .select()
    .from(posts)
    .where(eq(posts.publicado, 1))
    .orderBy(desc(posts.createdAt))
}

/** Todos los artículos (panel). */
export async function listAllPosts(): Promise<PostRow[]> {
  await ensurePostsTable()
  return db.select().from(posts).orderBy(desc(posts.createdAt))
}

export async function getPost(slug: string): Promise<PostRow | undefined> {
  await ensurePostsTable()
  const rows = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1)
  return rows[0]
}

export interface PostInput {
  slug: string
  titulo: string
  resumen: string | null
  contenido: string | null
  tituloEn: string | null
  resumenEn: string | null
  contenidoEn: string | null
  portadaUrl: string | null
  publicado: number
}

export async function createPost(data: PostInput): Promise<void> {
  await ensurePostsTable()
  await db.insert(posts).values(data)
}

export async function updatePost(
  originalSlug: string,
  data: PostInput
): Promise<void> {
  await ensurePostsTable()
  await db
    .update(posts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(posts.slug, originalSlug))
}

export async function deletePost(slug: string): Promise<void> {
  await ensurePostsTable()
  await db.delete(posts).where(eq(posts.slug, slug))
}
