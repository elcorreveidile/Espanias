import type { Metadata } from 'next'
import Link from 'next/link'

// Demo de ejemplo: prueba el patrón multi-tenant.
// Se sirve en ejemplo.espanias.com (vía middleware) y es totalmente
// independiente del catálogo: su propio diseño, sin Nav/Footer de Espanias.
export const metadata: Metadata = {
  title: 'Demo de ejemplo · Espanias',
  description: 'Demostración del sistema multi-tenant de subdominios de Espanias.',
  robots: { index: false, follow: false },
}

export default function EjemploDemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E1B4B] text-white">
      {/* Cinta: vuelve al catálogo */}
      <div className="flex items-center justify-center gap-2 bg-black/30 px-4 py-2 text-center text-xs text-white/70">
        <span>Demo servida desde el host multi-tenant de</span>
        <Link href="https://www.espanias.com/catalogo" className="font-semibold text-white underline">
          Espanias
        </Link>
      </div>

      <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center">
        <span className="mb-6 rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white/70">
          ejemplo.espanias.com
        </span>
        <h1 className="mb-6 text-4xl font-black leading-tight md:text-6xl">
          Esto se sirve en un subdominio<br />sin tocar Vercel
        </h1>
        <p className="mb-10 max-w-xl text-lg text-white/70">
          Esta página vive en el repositorio de <strong>espanias.com</strong>. El
          <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm">middleware</code>
          detecta el subdominio y la entrega en
          <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm">ejemplo.espanias.com</code>.
          Para publicar una demo nueva basta con crear su carpeta y añadir una línea
          al registro: el wildcard hace el resto.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="https://www.espanias.com/catalogo"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-[#1E1B4B] transition-colors hover:bg-white/90"
          >
            Ver el catálogo
          </Link>
          <Link
            href="https://www.por2duros.com/#precio"
            className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Quiero una web así
          </Link>
        </div>
      </section>
    </main>
  )
}
