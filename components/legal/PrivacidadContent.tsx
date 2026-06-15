'use client'

import { useLanguage } from '@/context/LanguageContext'
import LegalPage from '@/components/LegalPage'
import { legalInfo as L } from '@/lib/legal'

const h2 = 'text-xl font-bold text-[#1C1917] mb-2'
const ul = 'list-disc space-y-1 pl-5'
const link = 'text-[#BF2638] hover:underline'

function Es() {
  return (
    <LegalPage title="Política de privacidad" updated={L.actualizado}>
      <p>
        Esta política describe cómo {L.titular} (en adelante, «el Responsable») trata los datos
        personales que recaba a través del sitio web {L.sitio}, de conformidad con el Reglamento (UE)
        2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
      </p>
      <section>
        <h2 className={h2}>1. Responsable del tratamiento</h2>
        <ul className={ul}>
          <li><strong>Titular:</strong> {L.titular}</li>
          <li><strong>NIF/CIF:</strong> {L.nif}</li>
          <li><strong>Domicilio:</strong> {L.domicilio}</li>
          <li><strong>Contacto:</strong> <a className={link} href={L.contacto}>formulario de contacto</a></li>
        </ul>
      </section>
      <section>
        <h2 className={h2}>2. Datos que tratamos y finalidad</h2>
        <ul className={ul}>
          <li><strong>Formulario de contacto:</strong> nombre, correo electrónico y el contenido del mensaje, para atender tu consulta y responderte.</li>
          <li><strong>Acceso al panel privado:</strong> dirección de correo electrónico, para autenticar tu identidad mediante un enlace de acceso de un solo uso (magic link).</li>
        </ul>
        <p>No se realiza elaboración de perfiles ni decisiones automatizadas con efectos jurídicos.</p>
      </section>
      <section>
        <h2 className={h2}>3. Base jurídica</h2>
        <ul className={ul}>
          <li><strong>Consentimiento del interesado</strong> (art. 6.1.a RGPD) al enviar el formulario de contacto.</li>
          <li><strong>Interés legítimo / ejecución de una relación</strong> (art. 6.1.f / 6.1.b RGPD) para gestionar el acceso autorizado al panel.</li>
        </ul>
      </section>
      <section>
        <h2 className={h2}>4. Conservación de los datos</h2>
        <p>
          Los datos del formulario de contacto se conservan durante el tiempo necesario para atender tu
          solicitud y los plazos legalmente exigibles. Los datos de acceso al panel se conservan
          mientras se mantenga la autorización. Los tokens de acceso de un solo uso caducan a los 15
          minutos.
        </p>
      </section>
      <section>
        <h2 className={h2}>5. Destinatarios y encargados del tratamiento</h2>
        <p>No se ceden datos a terceros salvo obligación legal. Para prestar el servicio, el Responsable se apoya en proveedores que actúan como encargados del tratamiento:</p>
        <ul className={ul}>
          <li><strong>Alojamiento web:</strong> {L.hosting}.</li>
          <li><strong>Base de datos:</strong> {L.baseDatos}.</li>
          <li><strong>Envío de correo electrónico:</strong> {L.emailProveedor}.</li>
        </ul>
        <p>
          <strong>Transferencias internacionales:</strong> algunos proveedores pueden tratar datos
          fuera del Espacio Económico Europeo, amparándose en las garantías previstas por el RGPD
          (Cláusulas Contractuales Tipo u otros mecanismos adecuados).
        </p>
      </section>
      <section>
        <h2 className={h2}>6. Tus derechos</h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y
          portabilidad a través de nuestro <a className={link} href={L.contacto}>formulario de contacto</a>,
          indicando el derecho que deseas ejercer. También puedes retirar el consentimiento prestado y
          presentar una reclamación ante la <strong>Agencia Española de Protección de Datos</strong>{' '}
          (<a className={link} href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
        </p>
      </section>
      <section>
        <h2 className={h2}>7. Seguridad y menores</h2>
        <p>
          El Responsable adopta medidas técnicas y organizativas apropiadas para garantizar la
          seguridad de los datos. Este sitio no está dirigido a menores de 14 años; en caso de
          detectarse datos de menores sin autorización válida, serán suprimidos.
        </p>
      </section>
    </LegalPage>
  )
}

function En() {
  return (
    <LegalPage title="Privacy policy" updated={L.actualizadoEn} updatedLabel="Last updated">
      <p>
        This policy describes how {L.titular} (the “Controller”) processes the personal data collected
        through the website {L.sitio}, in accordance with Regulation (EU) 2016/679 (GDPR) and Spanish
        Organic Law 3/2018 (LOPDGDD).
      </p>
      <section>
        <h2 className={h2}>1. Data controller</h2>
        <ul className={ul}>
          <li><strong>Owner:</strong> {L.titular}</li>
          <li><strong>Tax ID (NIF):</strong> {L.nif}</li>
          <li><strong>Address:</strong> {L.domicilio}</li>
          <li><strong>Contact:</strong> <a className={link} href={L.contacto}>contact form</a></li>
        </ul>
      </section>
      <section>
        <h2 className={h2}>2. Data we process and purpose</h2>
        <ul className={ul}>
          <li><strong>Contact form:</strong> name, email address and message content, in order to handle and reply to your enquiry.</li>
          <li><strong>Private panel access:</strong> email address, to authenticate your identity via a single-use access link (magic link).</li>
        </ul>
        <p>No profiling or automated decisions with legal effects are carried out.</p>
      </section>
      <section>
        <h2 className={h2}>3. Legal basis</h2>
        <ul className={ul}>
          <li><strong>Consent of the data subject</strong> (Art. 6.1.a GDPR) when submitting the contact form.</li>
          <li><strong>Legitimate interest / performance of a relationship</strong> (Art. 6.1.f / 6.1.b GDPR) to manage authorised access to the panel.</li>
        </ul>
      </section>
      <section>
        <h2 className={h2}>4. Data retention</h2>
        <p>
          Contact form data is kept for as long as necessary to handle your request and for any legally
          required periods. Panel access data is kept while authorisation remains in place. Single-use
          access tokens expire after 15 minutes.
        </p>
      </section>
      <section>
        <h2 className={h2}>5. Recipients and processors</h2>
        <p>Data is not shared with third parties except where legally required. To provide the service, the Controller relies on providers acting as data processors:</p>
        <ul className={ul}>
          <li><strong>Web hosting:</strong> {L.hosting}.</li>
          <li><strong>Database:</strong> {L.baseDatos}.</li>
          <li><strong>Email delivery:</strong> {L.emailProveedor}.</li>
        </ul>
        <p>
          <strong>International transfers:</strong> some providers may process data outside the European
          Economic Area, relying on the safeguards provided by the GDPR (Standard Contractual Clauses or
          other appropriate mechanisms).
        </p>
      </section>
      <section>
        <h2 className={h2}>6. Your rights</h2>
        <p>
          You may exercise your rights of access, rectification, erasure, objection, restriction and
          portability through our <a className={link} href={L.contacto}>contact form</a>, indicating the
          right you wish to exercise. You may also withdraw your consent and lodge a complaint with the{' '}
          <strong>Spanish Data Protection Agency</strong>{' '}
          (<a className={link} href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
        </p>
      </section>
      <section>
        <h2 className={h2}>7. Security and minors</h2>
        <p>
          The Controller adopts appropriate technical and organisational measures to ensure data
          security. This site is not directed at children under 14; any data of minors detected without
          valid authorisation will be deleted.
        </p>
      </section>
    </LegalPage>
  )
}

export default function PrivacidadContent() {
  const { lang } = useLanguage()
  return lang === 'en' ? <En /> : <Es />
}
