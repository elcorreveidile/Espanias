export const metadata = { title: 'Revisa tu correo', robots: { index: false } }

export default function VerifyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAFAF9] px-6">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 text-center">
        <div className="mb-4 text-4xl">📬</div>
        <h1 className="mb-2 text-2xl font-black text-[#1C1917]">Revisa tu correo</h1>
        <p className="text-sm text-[#78716C]">
          Si tu email está autorizado, te hemos enviado un enlace de acceso. Caduca
          en 15 minutos. Puedes cerrar esta pestaña.
        </p>
      </div>
    </main>
  )
}
