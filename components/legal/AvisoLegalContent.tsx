'use client'

import { useLanguage } from '@/context/LanguageContext'
import LegalPage from '@/components/LegalPage'
import { legalInfo as L } from '@/lib/legal'

const h2 = 'text-xl font-bold text-[#1C1917] mb-2'
const ul = 'list-disc space-y-1 pl-5'
const link = 'text-[#BF2638] hover:underline'

function Es() {
  return (
    <LegalPage title="Aviso legal" updated={L.actualizado}>
      <section>
        <h2 className={h2}>1. Datos identificativos</h2>
        <p>
          En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de
          11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico
          (LSSI-CE), se facilitan los siguientes datos del titular de este sitio web:
        </p>
        <ul className={ul}>
          <li><strong>Titular:</strong> {L.titular}</li>
          <li><strong>NIF/CIF:</strong> {L.nif}</li>
          <li><strong>Domicilio:</strong> {L.domicilio}</li>
          <li><strong>Contacto:</strong> <a className={link} href={L.contacto}>formulario de contacto</a></li>
          <li><strong>Sitio web:</strong> {L.sitio}</li>
          <li><strong>Actividad:</strong> {L.actividad}</li>
        </ul>
      </section>
      <section>
        <h2 className={h2}>2. Objeto y condiciones de uso</h2>
        <p>
          El presente aviso legal regula el acceso, navegación y uso de este sitio web. El acceso al
          mismo atribuye la condición de usuario e implica la aceptación plena de todas las cláusulas
          incluidas en este aviso legal. El usuario se compromete a utilizar el sitio web y sus
          contenidos de conformidad con la ley, el orden público y el presente aviso legal.
        </p>
      </section>
      <section>
        <h2 className={h2}>3. Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos del sitio web (textos, fotografías, gráficos, imágenes, iconos,
          tecnología, software, diseño gráfico, marca {L.marca} y código fuente) constituyen una obra
          cuya propiedad pertenece al titular, sin que puedan entenderse cedidos al usuario ninguno de
          los derechos de explotación sobre los mismos. Queda prohibida su reproducción, distribución,
          comunicación pública o transformación sin autorización expresa del titular.
        </p>
      </section>
      <section>
        <h2 className={h2}>4. Responsabilidad</h2>
        <p>
          El titular no se hace responsable de los daños y perjuicios que pudieran derivarse de
          interferencias, omisiones, interrupciones, virus informáticos, averías o desconexiones en el
          funcionamiento del sistema electrónico, motivadas por causas ajenas a su control. Tampoco
          garantiza la ausencia de errores en los contenidos, si bien adoptará las medidas razonables
          para corregirlos cuando tenga conocimiento de ellos.
        </p>
      </section>
      <section>
        <h2 className={h2}>5. Enlaces a terceros</h2>
        <p>
          Este sitio puede contener enlaces a páginas de terceros. El titular no asume responsabilidad
          alguna sobre los contenidos, políticas o prácticas de dichos sitios externos.
        </p>
      </section>
      <section>
        <h2 className={h2}>6. Legislación aplicable y jurisdicción</h2>
        <p>
          Las presentes condiciones se rigen por la legislación española. Para la resolución de
          cualquier controversia, las partes se someterán a los juzgados y tribunales que correspondan
          conforme a derecho.
        </p>
      </section>
    </LegalPage>
  )
}

function En() {
  return (
    <LegalPage title="Legal notice" updated={L.actualizadoEn} updatedLabel="Last updated">
      <section>
        <h2 className={h2}>1. Identifying information</h2>
        <p>
          In compliance with the duty of information set out in Article 10 of Spanish Law 34/2002, of
          11 July, on Information Society Services and Electronic Commerce (LSSI-CE), the following
          details of the owner of this website are provided:
        </p>
        <ul className={ul}>
          <li><strong>Owner:</strong> {L.titular}</li>
          <li><strong>Tax ID (NIF):</strong> {L.nif}</li>
          <li><strong>Address:</strong> {L.domicilio}</li>
          <li><strong>Contact:</strong> <a className={link} href={L.contacto}>contact form</a></li>
          <li><strong>Website:</strong> {L.sitio}</li>
          <li><strong>Activity:</strong> Web application design and development, and AI training and consulting.</li>
        </ul>
      </section>
      <section>
        <h2 className={h2}>2. Purpose and terms of use</h2>
        <p>
          This legal notice governs the access, browsing and use of this website. Accessing it grants
          the condition of user and implies full acceptance of all the clauses included in this legal
          notice. The user undertakes to use the website and its contents in accordance with the law,
          public order and this legal notice.
        </p>
      </section>
      <section>
        <h2 className={h2}>3. Intellectual and industrial property</h2>
        <p>
          All website content (texts, photographs, graphics, images, icons, technology, software,
          graphic design, the {L.marca} brand and source code) constitutes a work owned by the owner.
          No exploitation rights over it are assigned to the user. Its reproduction, distribution,
          public communication or transformation is prohibited without the owner&apos;s express
          authorisation.
        </p>
      </section>
      <section>
        <h2 className={h2}>4. Liability</h2>
        <p>
          The owner is not liable for any damages arising from interference, omissions, interruptions,
          computer viruses, breakdowns or disconnections in the operation of the electronic system due
          to causes beyond its control. Nor does it guarantee the absence of errors in the content,
          although it will take reasonable measures to correct them once it becomes aware of them.
        </p>
      </section>
      <section>
        <h2 className={h2}>5. Third-party links</h2>
        <p>
          This site may contain links to third-party pages. The owner assumes no responsibility for the
          content, policies or practices of such external sites.
        </p>
      </section>
      <section>
        <h2 className={h2}>6. Applicable law and jurisdiction</h2>
        <p>
          These terms are governed by Spanish law. For the resolution of any dispute, the parties shall
          submit to the courts and tribunals that apply under the law.
        </p>
      </section>
    </LegalPage>
  )
}

export default function AvisoLegalContent() {
  const { lang } = useLanguage()
  return lang === 'en' ? <En /> : <Es />
}
