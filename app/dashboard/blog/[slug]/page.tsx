import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost } from '@/lib/db/posts-repo'
import { savePost, deletePostAction } from '@/app/dashboard/blog/actions'
import ImageField from '@/components/dashboard/ImageField'

export const dynamic = 'force-dynamic'

const label = 'block text-sm font-medium text-[#1C1917] mb-1.5'
const field =
  'w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-[#1C1917] focus:border-[#BF2638] focus:outline-none'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function PostEditor({ params }: Props) {
  const { slug } = await params
  const isNew = slug === 'new'

  const post = isNew ? null : await getPost(slug)
  if (!isNew && !post) notFound()

  const save = savePost.bind(null, isNew ? null : slug)

  return (
    <div className="max-w-2xl">
      <Link
        href="/dashboard/blog"
        className="mb-6 inline-block text-sm font-medium text-[#78716C] hover:text-[#6D28D9]"
      >
        ← Volver al blog
      </Link>

      <h1 className="mb-8 text-3xl font-black text-[#1C1917]">
        {isNew ? 'Nuevo artículo' : 'Editar artículo'}
      </h1>

      <form action={save} className="space-y-5">
        <div>
          <label className={label} htmlFor="titulo">Título</label>
          <input id="titulo" name="titulo" required defaultValue={post?.titulo ?? ''} className={field} />
        </div>

        <div>
          <label className={label} htmlFor="slug">Slug (URL)</label>
          <input id="slug" name="slug" defaultValue={post?.slug ?? ''} placeholder="se genera del título si se deja vacío" className={field} />
        </div>

        <div>
          <label className={label} htmlFor="resumen">Resumen</label>
          <textarea id="resumen" name="resumen" rows={2} defaultValue={post?.resumen ?? ''} className={field} />
        </div>

        <div>
          <label className={label} htmlFor="portadaUrl">Imagen de portada</label>
          <ImageField name="portadaUrl" defaultValue={post?.portadaUrl ?? ''} />
        </div>

        <div>
          <label className={label} htmlFor="contenido">Contenido</label>
          <textarea id="contenido" name="contenido" rows={16} defaultValue={post?.contenido ?? ''} placeholder={'Escribe el artículo.\n\nSepara los párrafos con una línea en blanco.'} className={`${field} font-mono`} />
          <div className="mt-2 rounded-lg bg-stone-50 p-3 text-xs leading-relaxed text-[#78716C]">
            <p className="mb-1 font-semibold text-[#57534E]">Puedes dar formato (Markdown):</p>
            <code>**negrita**</code> · <code>*cursiva*</code> · <code>## Subtítulo</code> ·{' '}
            <code>- elemento de lista</code> · <code>[texto](https://enlace)</code> ·{' '}
            <code>&gt; cita</code>. Deja una línea en blanco entre párrafos.
          </div>
        </div>

        {/* Versión en inglés (opcional; si se deja vacía, se usa la española) */}
        <div className="space-y-5 rounded-2xl border border-stone-200 bg-stone-50/50 p-5">
          <p className="text-sm font-bold uppercase tracking-wider text-[#78716C]">
            🇬🇧 Versión en inglés <span className="font-normal normal-case">(opcional)</span>
          </p>
          <div>
            <label className={label} htmlFor="tituloEn">Title (EN)</label>
            <input id="tituloEn" name="tituloEn" defaultValue={post?.tituloEn ?? ''} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="resumenEn">Summary (EN)</label>
            <textarea id="resumenEn" name="resumenEn" rows={2} defaultValue={post?.resumenEn ?? ''} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="contenidoEn">Content (EN)</label>
            <textarea id="contenidoEn" name="contenidoEn" rows={16} defaultValue={post?.contenidoEn ?? ''} placeholder="Same Markdown formatting. Leave blank to show the Spanish version to English visitors." className={`${field} font-mono`} />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-[#1C1917]">
          <input type="checkbox" name="publicado" defaultChecked={!!post?.publicado} className="h-4 w-4" />
          Publicado (visible en la web)
        </label>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-[#1C1917] px-6 py-2.5 font-semibold text-white transition-colors hover:bg-[#44403C]"
          >
            Guardar
          </button>
          <Link href="/dashboard/blog" className="text-sm font-medium text-[#78716C] hover:text-[#1C1917]">
            Cancelar
          </Link>
        </div>
      </form>

      {!isNew && post && (
        <form action={deletePostAction.bind(null, post.slug)} className="mt-10 border-t border-stone-200 pt-6">
          <button
            type="submit"
            className="text-sm font-medium text-[#BF2638] hover:underline"
          >
            Eliminar artículo
          </button>
        </form>
      )}
    </div>
  )
}
