import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { legalInfo as L } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Información legal del titular del sitio web, condiciones de uso y propiedad intelectual.',
  alternates: { canonical: 'https://www.espanias.com/aviso-legal' },
}

const h2 = 'text-xl font-bold text-[#1C1917] mb-2'
const ul = 'list-disc space-y-1 pl-5'

export default function AvisoLegalPage() {
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
          <li><strong>Correo electrónico:</strong> {L.email}</li>
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
          contenidos de conformidad con la ley, el orden público y el presente aviso legal,
          absteniéndose de realizar un uso ilícito o lesivo de los mismos.
        </p>
      </section>

      <section>
        <h2 className={h2}>3. Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos del sitio web (textos, fotografías, gráficos, imágenes, iconos,
          tecnología, software, diseño gráfico, marca {L.marca} y código fuente) constituyen una obra
          cuya propiedad pertenece al titular, sin que puedan entenderse cedidos al usuario ninguno de
          los derechos de explotación sobre los mismos más allá de lo estrictamente necesario para el
          correcto uso de la web. Queda prohibida su reproducción, distribución, comunicación pública o
          transformación sin autorización expresa del titular.
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
