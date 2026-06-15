import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { legalInfo as L } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description:
    'Cómo tratamos tus datos personales conforme al RGPD y la LOPDGDD: finalidad, base jurídica, conservación y tus derechos.',
  alternates: { canonical: 'https://www.espanias.com/privacidad' },
}

const h2 = 'text-xl font-bold text-[#1C1917] mb-2'
const ul = 'list-disc space-y-1 pl-5'

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad" updated={L.actualizado}>
      <p>
        Esta política describe cómo {L.titular} (en adelante, «el Responsable») trata los datos
        personales que recaba a través del sitio web {L.sitio}, de conformidad con el Reglamento (UE)
        2016/679 (RGPD) y la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los
        derechos digitales (LOPDGDD).
      </p>

      <section>
        <h2 className={h2}>1. Responsable del tratamiento</h2>
        <ul className={ul}>
          <li><strong>Titular:</strong> {L.titular}</li>
          <li><strong>NIF/CIF:</strong> {L.nif}</li>
          <li><strong>Domicilio:</strong> {L.domicilio}</li>
          <li>
            <strong>Contacto:</strong>{' '}
            <a className="text-[#BF2638] hover:underline" href={L.contacto}>formulario de contacto</a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className={h2}>2. Datos que tratamos y finalidad</h2>
        <ul className={ul}>
          <li>
            <strong>Formulario de contacto:</strong> nombre, correo electrónico y el contenido del
            mensaje, con la finalidad de atender tu consulta y responderte.
          </li>
          <li>
            <strong>Acceso al panel privado:</strong> dirección de correo electrónico, con la
            finalidad de autenticar tu identidad mediante un enlace de acceso de un solo uso (magic
            link).
          </li>
        </ul>
        <p>No se realiza elaboración de perfiles ni decisiones automatizadas con efectos jurídicos.</p>
      </section>

      <section>
        <h2 className={h2}>3. Base jurídica</h2>
        <ul className={ul}>
          <li>
            <strong>Consentimiento del interesado</strong> (art. 6.1.a RGPD) al enviar el formulario de
            contacto.
          </li>
          <li>
            <strong>Interés legítimo / ejecución de una relación</strong> (art. 6.1.f / 6.1.b RGPD)
            para gestionar el acceso autorizado al panel de administración.
          </li>
        </ul>
      </section>

      <section>
        <h2 className={h2}>4. Conservación de los datos</h2>
        <p>
          Los datos del formulario de contacto se conservan durante el tiempo necesario para atender tu
          solicitud y, posteriormente, durante los plazos legalmente exigibles. Los datos de acceso al
          panel se conservan mientras se mantenga la autorización de acceso. Los tokens de acceso de un
          solo uso caducan a los 15 minutos.
        </p>
      </section>

      <section>
        <h2 className={h2}>5. Destinatarios y encargados del tratamiento</h2>
        <p>
          No se ceden datos a terceros salvo obligación legal. Para prestar el servicio, el Responsable
          se apoya en proveedores que actúan como encargados del tratamiento:
        </p>
        <ul className={ul}>
          <li><strong>Alojamiento web:</strong> {L.hosting}.</li>
          <li><strong>Base de datos:</strong> {L.baseDatos}.</li>
          <li><strong>Envío de correo electrónico:</strong> {L.emailProveedor}.</li>
        </ul>
        <p>
          <strong>Transferencias internacionales:</strong> algunos de estos proveedores pueden tratar
          datos fuera del Espacio Económico Europeo. En tales casos, las transferencias se amparan en
          las garantías previstas por el RGPD (Cláusulas Contractuales Tipo de la Comisión Europea u
          otros mecanismos adecuados).
        </p>
      </section>

      <section>
        <h2 className={h2}>6. Tus derechos</h2>
        <p>
          Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión,
          oposición, limitación del tratamiento y portabilidad a través de nuestro{' '}
          <a className="text-[#BF2638] hover:underline" href={L.contacto}>formulario de contacto</a>,
          indicando el derecho que deseas ejercer. También tienes derecho a retirar el consentimiento
          prestado y a presentar una reclamación ante la{' '}
          <strong>Agencia Española de Protección de Datos</strong>{' '}
          (<a className="text-[#BF2638] hover:underline" href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>) si consideras que el tratamiento no se ajusta a la normativa.
        </p>
      </section>

      <section>
        <h2 className={h2}>7. Seguridad y menores</h2>
        <p>
          El Responsable adopta las medidas técnicas y organizativas apropiadas para garantizar la
          seguridad de los datos personales y evitar su alteración, pérdida o acceso no autorizado.
          Este sitio no está dirigido a menores de 14 años; en caso de detectarse datos de menores sin
          autorización válida, serán suprimidos.
        </p>
      </section>
    </LegalPage>
  )
}
