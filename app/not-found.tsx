import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-16 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#78716C] dark:text-[#A8A29E]">
          Error 404
        </p>
        <h1 className="mb-4 text-5xl font-black tracking-tight text-[#1C1917] sm:text-6xl dark:text-[#F5F5F4]">
          Espa
          <span className="text-[#BF2638]">n</span>
          <span className="text-[#6D28D9]">ias</span>
        </h1>
        <p className="mb-10 max-w-md text-lg text-[#78716C] dark:text-[#A8A29E]">
          No hemos encontrado esta página. Puede que el enlace haya cambiado o ya no exista.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-gradient-to-r from-[#BF2638] to-[#6D28D9] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#6D28D9]/20 transition hover:brightness-110"
          >
            Volver al inicio
          </Link>
          <Link
            href="/catalogo"
            className="rounded-full border border-stone-300 px-7 py-3 text-sm font-semibold text-[#1C1917] transition-colors hover:border-stone-400 hover:bg-white dark:border-white/20 dark:text-[#F5F5F4] dark:hover:bg-white/5"
          >
            Ver el catálogo
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
