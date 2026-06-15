'use client'

import { useState } from 'react'

interface Proj {
  slug: string
  nombre: string
}

function EndpointRow({ label, url }: { label: string; url: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard no disponible */
    }
  }
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#78716C]">{label}</p>
        <code className="block truncate font-mono text-sm text-[#1C1917]">{url}</code>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          onClick={copy}
          className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-[#57534E] hover:bg-stone-50"
        >
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-[#1C1917] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#44403C]"
        >
          Abrir
        </a>
      </div>
    </div>
  )
}

export default function ApiConsole({
  baseUrl,
  projects,
}: {
  baseUrl: string
  projects: Proj[]
}) {
  const [slug, setSlug] = useState(projects[0]?.slug ?? '')

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-1 text-lg font-black text-[#1C1917]">Endpoints generales</h2>
        <p className="mb-4 text-sm text-[#78716C]">Públicos, sin autenticación.</p>
        <EndpointRow label="Listado de proyectos" url={`${baseUrl}/api/agente/projects`} />
      </section>

      <section>
        <h2 className="mb-1 text-lg font-black text-[#1C1917]">Por proyecto</h2>
        <p className="mb-4 text-sm text-[#78716C]">Elige un proyecto y copia la URL que necesites.</p>

        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mb-5 w-full max-w-sm rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-[#1C1917] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20"
        >
          {projects.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.nombre}
            </option>
          ))}
        </select>

        <div className="space-y-3">
          <EndpointRow
            label="Contexto (JSON)"
            url={`${baseUrl}/api/agente/context?project=${slug}`}
          />
          <EndpointRow
            label="Exportar Markdown"
            url={`${baseUrl}/api/agente/export?project=${slug}&format=md`}
          />
          <EndpointRow
            label="Exportar JSON"
            url={`${baseUrl}/api/agente/export?project=${slug}&format=json`}
          />
        </div>
      </section>
    </div>
  )
}
