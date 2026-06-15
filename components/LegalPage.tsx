import type { ReactNode } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <article className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-black text-[#1C1917] sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-[#A8A29E]">Última actualización: {updated}</p>
          <div className="legal-prose mt-10 space-y-6 text-[#44403C] leading-relaxed">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
