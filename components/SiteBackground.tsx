// Fondo decorativo global de la web pública: manchas de color de marca
// (rojo, oro, violeta) mediante degradados radiales en UNA sola capa, SIN filtro
// de desenfoque (blur), que en móvil es muy costoso y saturaba la memoria.
// Los degradados radiales ya se difuminan solos hasta transparente.
export default function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-100 dark:opacity-50"
      style={{
        background: [
          'radial-gradient(60% 48% at 10% 6%, rgba(191,38,56,0.20), transparent 72%)',
          'radial-gradient(58% 46% at 92% 4%, rgba(109,40,217,0.18), transparent 72%)',
          'radial-gradient(52% 42% at 50% 40%, rgba(212,172,13,0.12), transparent 72%)',
          'radial-gradient(58% 48% at 6% 98%, rgba(212,172,13,0.16), transparent 72%)',
          'radial-gradient(58% 48% at 98% 96%, rgba(109,40,217,0.18), transparent 72%)',
        ].join(', '),
      }}
    />
  )
}
