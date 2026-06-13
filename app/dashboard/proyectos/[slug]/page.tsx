import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectRow } from '@/lib/db/projects-repo'
import { categoryLabels, statusLabels } from '@/lib/catalogo-labels'
import { saveProject } from '@/app/dashboard/proyectos/actions'

export const dynamic = 'force-dynamic'

const field =
  'w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-[#1C1917] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20'
const label = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-[#78716C]'

export default async function EditProject({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = await getProjectRow(slug)
  if (!p) notFound()

  const action = saveProject.bind(null, slug)

  return (
    <div className="max-w-2xl">
      <Link
        href="/dashboard/proyectos"
        className="mb-6 inline-block text-sm text-[#78716C] hover:text-[#6D28D9]"
      >
        ← Volver
      </Link>
      <h1 className="mb-1 text-3xl font-black text-[#1C1917]">{p.nombre}</h1>
      <p className="mb-4 text-sm text-[#A8A29E]">/{p.slug}</p>

      {/* Exportar contexto para el agente */}
      <div className="mb-8 flex flex-wrap gap-2">
        <a
          href={`/api/agente/export?project=${p.slug}&format=md`}
          className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-[#57534E] hover:bg-stone-50"
        >
          ⬇ Exportar Markdown
        </a>
        <a
          href={`/api/agente/export?project=${p.slug}&format=json`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-[#57534E] hover:bg-stone-50"
        >
          ⬇ Exportar JSON
        </a>
        <a
          href={`/api/agente/context?project=${p.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-[#57534E] hover:bg-stone-50"
        >
          🔗 Ver contexto API
        </a>
      </div>

      <form action={action} className="space-y-5">
        <div>
          <label className={label} htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" defaultValue={p.nombre} required className={field} />
        </div>

        <div>
          <label className={label} htmlFor="claim">Claim</label>
          <input id="claim" name="claim" defaultValue={p.claim ?? ''} className={field} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label} htmlFor="category">Categoría</label>
            <select id="category" name="category" defaultValue={p.category ?? 'otros'} className={field}>
              {Object.entries(categoryLabels.es).map(([key, val]) => (
                <option key={key} value={key}>{val}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="estado">Estado</label>
            <select id="estado" name="estado" defaultValue={p.estado ?? 'idea'} className={field}>
              {Object.entries(statusLabels.es).map(([key, val]) => (
                <option key={key} value={key}>{val}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={label} htmlFor="sector">Sector</label>
          <input id="sector" name="sector" defaultValue={p.sector ?? ''} className={field} />
        </div>

        <div>
          <label className={label} htmlFor="descripcionEs">Descripción (ES)</label>
          <textarea id="descripcionEs" name="descripcionEs" rows={3} defaultValue={p.descripcionEs ?? ''} className={field} />
        </div>

        <div>
          <label className={label} htmlFor="descripcionEn">Descripción (EN)</label>
          <textarea id="descripcionEn" name="descripcionEn" rows={3} defaultValue={p.descripcionEn ?? ''} className={field} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label} htmlFor="url">URL del sitio</label>
            <input id="url" name="url" defaultValue={p.url ?? ''} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="demoUrl">URL demo</label>
            <input id="demoUrl" name="demoUrl" defaultValue={p.demoUrl ?? ''} className={field} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label} htmlFor="repositorioUrl">Repositorio (GitHub)</label>
            <input id="repositorioUrl" name="repositorioUrl" defaultValue={p.repositorioUrl ?? ''} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="planMaestroUrl">Plan maestro (URL)</label>
            <input id="planMaestroUrl" name="planMaestroUrl" defaultValue={p.planMaestroUrl ?? ''} className={field} />
          </div>
        </div>

        <div>
          <label className={label} htmlFor="componentesIncluidos">Componentes incluidos</label>
          <input id="componentesIncluidos" name="componentesIncluidos" defaultValue={p.componentesIncluidos ?? ''} placeholder="booking-engine,admin-panel" className={field} />
          <p className="mt-1 text-xs text-[#A8A29E]">Slugs separados por comas. Aparecen en la API del agente.</p>
        </div>

        <fieldset className="rounded-xl border border-stone-200 p-4">
          <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-[#78716C]">Identidad visual</legend>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label} htmlFor="paletaPrincipal">Paleta principal</label>
              <input id="paletaPrincipal" name="paletaPrincipal" defaultValue={p.paletaPrincipal ?? ''} placeholder="#A8D8F0" className={field} />
            </div>
            <div>
              <label className={label} htmlFor="paletaSecundaria">Secundaria</label>
              <input id="paletaSecundaria" name="paletaSecundaria" defaultValue={p.paletaSecundaria ?? ''} placeholder="#FFF7EA" className={field} />
            </div>
            <div>
              <label className={label} htmlFor="paletaAccion">Acción</label>
              <input id="paletaAccion" name="paletaAccion" defaultValue={p.paletaAccion ?? ''} placeholder="#E8436B" className={field} />
            </div>
            <div className="col-span-3 grid grid-cols-2 gap-3">
              <div>
                <label className={label} htmlFor="tipografiaTitulos">Tipografía titulares</label>
                <input id="tipografiaTitulos" name="tipografiaTitulos" defaultValue={p.tipografiaTitulos ?? ''} placeholder="Fraunces" className={field} />
              </div>
              <div>
                <label className={label} htmlFor="tipografiaCuerpo">Tipografía cuerpo</label>
                <input id="tipografiaCuerpo" name="tipografiaCuerpo" defaultValue={p.tipografiaCuerpo ?? ''} placeholder="Nunito Sans" className={field} />
              </div>
            </div>
          </div>
        </fieldset>

        <div>
          <label className={label} htmlFor="notasInternas">Notas internas</label>
          <textarea id="notasInternas" name="notasInternas" rows={3} defaultValue={p.notasInternas ?? ''} className={field} />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="rounded-lg bg-[#1C1917] px-5 py-2.5 font-semibold text-white transition-colors hover:bg-[#44403C]">
            Guardar
          </button>
          <Link href="/dashboard/proyectos" className="rounded-lg border border-stone-300 px-5 py-2.5 font-semibold text-[#57534E] hover:bg-stone-50">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
