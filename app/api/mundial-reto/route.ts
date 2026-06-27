import { NextResponse } from 'next/server'
import { getMundialData } from '@/lib/mundial-live'
import { retoEstado } from '@/lib/mundial'

// Descuento del RETO en vivo (crece con cada victoria de España). Lo consume
// por2duros para aplicar el descuento al pedido de quien se apuntó al reto.
// Público y de solo lectura (el mismo % para todos). CORS abierto para que
// por2duros pueda llamarlo.
export const dynamic = 'force-dynamic'

export async function GET() {
  const { path } = await getMundialData()
  const r = retoEstado(path)
  return NextResponse.json(
    { pct: r.pct, champion: r.champion, wins: r.wins },
    { headers: { 'Access-Control-Allow-Origin': '*' } }
  )
}
