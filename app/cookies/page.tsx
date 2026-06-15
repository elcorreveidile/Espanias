import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { legalInfo as L } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Política de cookies',
  description:
    'Información sobre las cookies que utiliza este sitio web. Solo se emplean cookies técnicas estrictamente necesarias.',
  alternates: { canonical: 'https://www.espanias.com/cookies' },
}

const h2 = 'text-xl font-bold text-[#1C1917] mb-2'

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies" updated={L.actualizado}>
      <section>
        <h2 className={h2}>1. ¿Qué son las cookies?</h2>
        <p>
          Una cookie es un pequeño archivo de texto que un sitio web almacena en tu navegador para
          recordar información sobre tu visita, como mantener tu sesión iniciada.
        </p>
      </section>

      <section>
        <h2 className={h2}>2. Cookies que utiliza este sitio</h2>
        <p>
          Este sitio web <strong>únicamente utiliza cookies técnicas estrictamente necesarias</strong>{' '}
          para su funcionamiento. <strong>No utilizamos cookies de analítica, de publicidad ni de
          terceros</strong>, ni rastreamos tu navegación.
        </p>
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-wider text-[#A8A29E]">
                <th className="px-4 py-3 font-semibold">Cookie</th>
                <th className="px-4 py-3 font-semibold">Finalidad</th>
                <th className="px-4 py-3 font-semibold">Duración</th>
                <th className="px-4 py-3 font-semibold">Tipo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-stone-100">
                <td className="px-4 py-3 font-medium text-[#1C1917]">espanias_session</td>
                <td className="px-4 py-3">
                  Mantener la sesión iniciada en el panel de administración (autenticación).
                </td>
                <td className="px-4 py-3">7 días</td>
                <td className="px-4 py-3">Técnica / necesaria (propia)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className={h2}>3. Base legal</h2>
        <p>
          Conforme al artículo 22.2 de la LSSI-CE, las cookies técnicas o necesarias están exentas del
          deber de obtener el consentimiento previo, ya que son imprescindibles para la prestación del
          servicio expresamente solicitado por el usuario (el acceso al panel). Por ello, este sitio no
          muestra un banner de consentimiento de cookies.
        </p>
      </section>

      <section>
        <h2 className={h2}>4. Cómo gestionar o desactivar las cookies</h2>
        <p>
          Puedes permitir, bloquear o eliminar las cookies instaladas mediante la configuración de tu
          navegador (Chrome, Firefox, Safari, Edge, etc.). Ten en cuenta que, si desactivas la cookie
          técnica de sesión, no podrás mantener el acceso al panel de administración. El resto del sitio
          web funcionará con normalidad.
        </p>
      </section>

      <section>
        <h2 className={h2}>5. Más información</h2>
        <p>
          Para cualquier duda sobre esta política de cookies puedes usar nuestro{' '}
          <a className="text-[#BF2638] hover:underline" href={L.contacto}>formulario de contacto</a>.
          Consulta también nuestra{' '}
          <a className="text-[#BF2638] hover:underline" href="/privacidad">política de privacidad</a>.
        </p>
      </section>
    </LegalPage>
  )
}
