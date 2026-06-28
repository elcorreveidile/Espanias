// Registro de demos servidas en modo multi-tenant bajo *.espanias.com.
//
// Cómo funciona:
// - status 'live':    la demo vive EN ESTE repo. El middleware reescribe
//                     <subdominio>.espanias.com  ->  /demos/<subdominio>.
//                     Añadir una demo nueva = crear su carpeta en
//                     app/demos/<subdominio>/ + una entrada 'live' aquí, y
//                     hacer push. Vercel la sirve sola (sin tocar el panel).
// - status 'pending': la demo todavía vive en su propio proyecto de Vercel
//                     (otro repo). Su subdominio se añade en ESE proyecto:
//                     el subdominio concreto tiene prioridad sobre el wildcard,
//                     así que ni siquiera llega a este repo. Cuando migremos
//                     su código aquí, se crea app/demos/<sub>/ y pasa a 'live'.

export type DemoStatus = 'live' | 'pending'

export interface DemoSite {
  subdomain: string
  name: string
  catalogSlug: string
  status: DemoStatus
}

export const demoSites: DemoSite[] = [
  // Ejemplo funcional servido desde este repo (prueba del patrón multi-tenant).
  { subdomain: 'ejemplo', name: 'Demo de ejemplo', catalogSlug: '', status: 'live' },

  // Demos reales pendientes de migrar desde sus repos propios.
  { subdomain: 'perruqueria', name: 'Perruquería Canina Realejo', catalogSlug: 'perruqueria-canina', status: 'pending' },
  { subdomain: 'fisioterapia', name: 'Eje Fisioterapia', catalogSlug: 'eje-fisioterapia', status: 'pending' },
  { subdomain: 'dentista', name: 'Dentista de Barrio', catalogSlug: 'clinica-dental', status: 'pending' },
  { subdomain: 'barberia', name: 'Filo Barber Studio', catalogSlug: 'barberia', status: 'pending' },
  { subdomain: 'bardeeric', name: 'El Bar de Eric', catalogSlug: 'bar-de-eric', status: 'pending' },
  { subdomain: 'papaupa', name: 'Papaupa', catalogSlug: 'papaupa', status: 'pending' },
]

export function getDemo(subdomain: string): DemoSite | undefined {
  return demoSites.find((d) => d.subdomain === subdomain)
}

/** Subdominios que SE SIRVEN desde este repo (status 'live'). */
export function isDemoHostedHere(subdomain: string): boolean {
  return demoSites.some((d) => d.subdomain === subdomain && d.status === 'live')
}
