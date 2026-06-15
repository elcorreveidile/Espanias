import { requestMagicLink } from '@/app/auth/actions'

export const metadata = { title: 'Acceso', robots: { index: false } }

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAFAF9] px-6">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8">
        <h1 className="mb-2 text-2xl font-black text-[#1C1917]">Panel Espanias</h1>
        <p className="mb-6 text-sm text-[#78716C]">
          Introduce tu email y te enviaremos un enlace de acceso.
        </p>
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error === 'send'
              ? 'No se pudo enviar el enlace ahora mismo. Inténtalo de nuevo en unos segundos.'
              : 'Introduce un email válido.'}
          </p>
        )}
        <form action={requestMagicLink} className="space-y-4">
          <input
            type="email"
            name="email"
            required
            placeholder="tu@email.com"
            autoComplete="email"
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-[#1C1917] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-[#1C1917] px-4 py-2.5 font-semibold text-white transition-colors hover:bg-[#44403C]"
          >
            Enviar enlace mágico
          </button>
        </form>
      </div>
    </main>
  )
}
