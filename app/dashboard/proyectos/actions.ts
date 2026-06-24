'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/current-user'
import { updateProject, deleteProject, createProject, slugExists } from '@/lib/db/projects-repo'

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
}

export async function createProjectAction(formData: FormData): Promise<void> {
  const session = await getSession()
  if (!session || session.rol !== 'admin') redirect('/auth/signin')

  const nombre = String(formData.get('nombre') ?? '').trim()
  if (!nombre) redirect('/dashboard/proyectos/new')

  let slug = slugify(String(formData.get('slug') ?? '') || nombre) || `proyecto-${Date.now()}`
  if (await slugExists(slug)) slug = `${slug}-${Date.now().toString().slice(-4)}`

  await createProject({
    slug,
    nombre,
    category: String(formData.get('category') ?? 'otros').trim() || 'otros',
    estado: String(formData.get('estado') ?? 'idea').trim() || 'idea',
    descripcionEs: opt(formData.get('descripcionEs')),
    descripcionEn: opt(formData.get('descripcionEn')),
  })

  revalidatePath('/catalogo')
  revalidatePath('/dashboard/proyectos')
  // Llevar al editor completo para rellenar el resto (imagen, enlaces, etc.)
  redirect(`/dashboard/proyectos/${slug}`)
}

const opt = (v: FormDataEntryValue | null): string | null => {
  const s = String(v ?? '').trim()
  return s === '' ? null : s
}

export async function saveProject(slug: string, formData: FormData): Promise<void> {
  const session = await getSession()
  if (!session || session.rol !== 'admin') redirect('/auth/signin')

  await updateProject(slug, {
    nombre: String(formData.get('nombre') ?? '').trim(),
    category: String(formData.get('category') ?? '').trim(),
    estado: String(formData.get('estado') ?? '').trim(),
    sector: opt(formData.get('sector')),
    claim: opt(formData.get('claim')),
    url: opt(formData.get('url')),
    demoUrl: opt(formData.get('demoUrl')),
    imagenUrl: opt(formData.get('imagenUrl')),
    descripcionEs: opt(formData.get('descripcionEs')),
    descripcionEn: opt(formData.get('descripcionEn')),
    repositorioUrl: opt(formData.get('repositorioUrl')),
    planMaestroUrl: opt(formData.get('planMaestroUrl')),
    componentesIncluidos: opt(formData.get('componentesIncluidos')),
    paletaPrincipal: opt(formData.get('paletaPrincipal')),
    paletaSecundaria: opt(formData.get('paletaSecundaria')),
    paletaAccion: opt(formData.get('paletaAccion')),
    tipografiaTitulos: opt(formData.get('tipografiaTitulos')),
    tipografiaCuerpo: opt(formData.get('tipografiaCuerpo')),
    notasInternas: opt(formData.get('notasInternas')),
  })

  // Refresca el catálogo público y vuelve al listado.
  revalidatePath('/catalogo')
  revalidatePath(`/catalogo/${slug}`)
  redirect('/dashboard/proyectos')
}

export async function deleteProjectAction(slug: string): Promise<void> {
  const session = await getSession()
  if (!session || session.rol !== 'admin') redirect('/auth/signin')

  await deleteProject(slug)
  revalidatePath('/catalogo')
  revalidatePath('/dashboard/proyectos')
  redirect('/dashboard/proyectos')
}
