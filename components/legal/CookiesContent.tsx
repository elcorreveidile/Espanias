'use client'

import { useLanguage } from '@/context/LanguageContext'
import LegalPage from '@/components/LegalPage'
import { legalInfo as L } from '@/lib/legal'

const h2 = 'text-xl font-bold text-[#1C1917] mb-2 dark:text-[#F5F5F4]'
const link = 'text-[#BF2638] hover:underline'
const th = 'px-4 py-3 font-semibold'
const td = 'px-4 py-3'

function CookieTable({ headers, row }: { headers: string[]; row: string[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-white/10">
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-wider text-[#A8A29E]">
            {headers.map((h) => (
              <th key={h} className={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-stone-100">
            <td className={`${td} font-medium text-[#1C1917] dark:text-[#F5F5F4]`}>{row[0]}</td>
            <td className={td}>{row[1]}</td>
            <td className={td}>{row[2]}</td>
            <td className={td}>{row[3]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function Es() {
  return (
    <LegalPage title="Política de cookies" updated={L.actualizado}>
      <section>
        <h2 className={h2}>1. ¿Qué son las cookies?</h2>
        <p>Una cookie es un pequeño archivo de texto que un sitio web almacena en tu navegador para recordar información sobre tu visita, como mantener tu sesión iniciada.</p>
      </section>
      <section>
        <h2 className={h2}>2. Cookies que utiliza este sitio</h2>
        <p>
          Este sitio web <strong>únicamente utiliza cookies técnicas estrictamente necesarias</strong>{' '}
          para su funcionamiento. <strong>No utilizamos cookies de analítica, de publicidad ni de
          terceros</strong>, ni rastreamos tu navegación.
        </p>
        <CookieTable
          headers={['Cookie', 'Finalidad', 'Duración', 'Tipo']}
          row={['espanias_session', 'Mantener la sesión iniciada en el panel de administración (autenticación).', '7 días', 'Técnica / necesaria (propia)']}
        />
      </section>
      <section>
        <h2 className={h2}>3. Base legal</h2>
        <p>
          Conforme al artículo 22.2 de la LSSI-CE, las cookies técnicas o necesarias están exentas del
          deber de obtener el consentimiento previo, al ser imprescindibles para prestar el servicio
          solicitado por el usuario (el acceso al panel). Por ello, este sitio no muestra un banner de
          consentimiento de cookies.
        </p>
      </section>
      <section>
        <h2 className={h2}>4. Cómo gestionar o desactivar las cookies</h2>
        <p>
          Puedes permitir, bloquear o eliminar las cookies mediante la configuración de tu navegador
          (Chrome, Firefox, Safari, Edge, etc.). Si desactivas la cookie técnica de sesión, no podrás
          mantener el acceso al panel; el resto del sitio funcionará con normalidad.
        </p>
      </section>
      <section>
        <h2 className={h2}>5. Más información</h2>
        <p>
          Para cualquier duda sobre esta política puedes usar nuestro{' '}
          <a className={link} href={L.contacto}>formulario de contacto</a>. Consulta también nuestra{' '}
          <a className={link} href="/privacidad">política de privacidad</a>.
        </p>
      </section>
    </LegalPage>
  )
}

function En() {
  return (
    <LegalPage title="Cookie policy" updated={L.actualizadoEn} updatedLabel="Last updated">
      <section>
        <h2 className={h2}>1. What are cookies?</h2>
        <p>A cookie is a small text file that a website stores in your browser to remember information about your visit, such as keeping you signed in.</p>
      </section>
      <section>
        <h2 className={h2}>2. Cookies used by this site</h2>
        <p>
          This website <strong>only uses strictly necessary technical cookies</strong> for its
          operation. <strong>We do not use analytics, advertising or third-party cookies</strong>, nor
          do we track your browsing.
        </p>
        <CookieTable
          headers={['Cookie', 'Purpose', 'Duration', 'Type']}
          row={['espanias_session', 'Keep you signed in to the admin panel (authentication).', '7 days', 'Technical / necessary (first-party)']}
        />
      </section>
      <section>
        <h2 className={h2}>3. Legal basis</h2>
        <p>
          Under Article 22.2 of the LSSI-CE, technical or necessary cookies are exempt from the duty to
          obtain prior consent, as they are essential to provide the service requested by the user
          (panel access). For this reason, this site does not display a cookie consent banner.
        </p>
      </section>
      <section>
        <h2 className={h2}>4. How to manage or disable cookies</h2>
        <p>
          You can allow, block or delete cookies via your browser settings (Chrome, Firefox, Safari,
          Edge, etc.). If you disable the technical session cookie, you will not be able to stay signed
          in to the panel; the rest of the site will work normally.
        </p>
      </section>
      <section>
        <h2 className={h2}>5. More information</h2>
        <p>
          For any questions about this policy you can use our{' '}
          <a className={link} href={L.contacto}>contact form</a>. See also our{' '}
          <a className={link} href="/privacidad">privacy policy</a>.
        </p>
      </section>
    </LegalPage>
  )
}

export default function CookiesContent() {
  const { lang } = useLanguage()
  return lang === 'en' ? <En /> : <Es />
}
