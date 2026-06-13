import { getCatalogProjects } from '@/lib/catalog-data'
import CatalogClient from '@/components/catalogo/CatalogClient'

// Lee de la BD en cada petición (con fallback estático). Datos siempre frescos.
export const dynamic = 'force-dynamic'

export default async function CatalogoPage() {
  const projects = await getCatalogProjects()
  return <CatalogClient projects={projects} />
}
