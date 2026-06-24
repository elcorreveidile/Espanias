import Link from 'next/link'
import { categoryLabels, statusLabels } from '@/lib/catalogo-labels'
import { createProjectAction } from '@/app/dashboard/proyectos/actions'

export const dynamic = 'force-dynamic'

const field =
  'w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-[#1C1917] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20'
const label = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-[#78716C]'

export default function NewProjectPage() {
  const categorias = Object.entries(categoryLabels.es)
  const estados = Object.entries(statusLabels.es)

  return (
    <div className="max-w-2xl">
      <Link
        href="/dashboard/proyectos"
        className="mb-6 inline-block text-sm text-[#78716C] hover:text-[#6D28D9]"
      >
        ← Volver
      </Link>
      <h1 className="mb-2 text-3xl font-black text-[#1C1917]">Nuevo proyecto</h1>
      <p className="mb-8 text-sm text-[#78716C]">
        Rellena lo básico para crearlo. Después se abre el editor completo para añadir imagen, enlaces y más detalles.
      </p>

      <form action={createProjectAction} className="space-y-5">
        <div>
          <label className={label} htmlFor="nombre">Nombre *</label>
          <input id="nombre" name="nombre" required className={field} />
        </div>

        <div>
          <label className={label} htmlFor="slug">Slug (URL)</label>
          <input id="slug" name="slug" placeholder="se genera del nombre si se deja vacío" className={field} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="category">Categoría</label>
            <select id="category" name="category" defaultValue="otros" className={field}>
              {categorias.map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="estado">Estado</label>
            <select id="estado" name="estado" defaultValue="idea" className={field}>
              {estados.map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={label} htmlFor="descripcionEs">Descripción (ES)</label>
          <textarea id="descripcionEs" name="descripcionEs" rows={3} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="descripcionEn">Descripción (EN)</label>
          <textarea id="descripcionEn" name="descripcionEn" rows={3} className={field} />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-[#1C1917] px-6 py-2.5 font-semibold text-white transition-colors hover:bg-[#44403C]"
          >
            Crear y continuar
          </button>
          <Link href="/dashboard/proyectos" className="text-sm font-medium text-[#78716C] hover:text-[#1C1917]">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
