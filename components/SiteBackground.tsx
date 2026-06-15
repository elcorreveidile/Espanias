// Fondo decorativo global de la web pública: manchas de color de marca
// (rojo, oro, violeta) difuminadas y fijas. Da un ambiente cálido y colorido
// presente en todas las páginas. El panel de administración tiene su propio
// fondo opaco, así que no se ve afectado.
export default function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute -top-32 -left-32 h-[540px] w-[540px] rounded-full blur-3xl opacity-40"
        style={{ background: 'radial-gradient(circle, #BF2638 0%, transparent 70%)' }}
      />
      <div
        className="absolute -top-24 right-[-12%] h-[580px] w-[580px] rounded-full blur-3xl opacity-35"
        style={{ background: 'radial-gradient(circle, #6D28D9 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full blur-3xl opacity-25"
        style={{ background: 'radial-gradient(circle, #D4AC0D 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-15%] left-[8%] h-[520px] w-[520px] rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, #D4AC0D 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-10%] right-[-8%] h-[500px] w-[500px] rounded-full blur-3xl opacity-35"
        style={{ background: 'radial-gradient(circle, #6D28D9 0%, transparent 70%)' }}
      />
    </div>
  )
}
