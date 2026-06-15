'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/current-user'
import { createPost, updatePost, deletePost, getPost } from '@/lib/db/posts-repo'

const opt = (v: FormDataEntryValue | null): string | null => {
  const s = String(v ?? '').trim()
  return s === '' ? null : s
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 150)
}

export async function savePost(
  originalSlug: string | null,
  formData: FormData
): Promise<void> {
  const session = await getSession()
  if (!session || session.rol !== 'admin') redirect('/auth/signin')

  const titulo = String(formData.get('titulo') ?? '').trim()
  if (!titulo) redirect('/dashboard/blog')

  const slug = slugify(String(formData.get('slug') ?? '') || titulo) || `post-${Date.now()}`

  const data = {
    slug,
    titulo,
    resumen: opt(formData.get('resumen')),
    contenido: opt(formData.get('contenido')),
    portadaUrl: opt(formData.get('portadaUrl')),
    publicado: formData.get('publicado') ? 1 : 0,
  }

  if (originalSlug) {
    await updatePost(originalSlug, data)
  } else {
    const existing = await getPost(slug)
    if (existing) {
      data.slug = `${slug}-${Date.now().toString().slice(-4)}`
    }
    await createPost(data)
  }

  revalidatePath('/blog')
  revalidatePath(`/blog/${data.slug}`)
  redirect('/dashboard/blog')
}

export async function deletePostAction(slug: string): Promise<void> {
  const session = await getSession()
  if (!session || session.rol !== 'admin') redirect('/auth/signin')

  await deletePost(slug)
  revalidatePath('/blog')
  revalidatePath('/dashboard/blog')
  redirect('/dashboard/blog')
}
