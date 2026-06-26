// Camino de España en el Mundial 2026 y cálculo del descuento del reto.
//
// FUENTE DE VERDAD (manual): tras cada partido, actualiza el `estado` (y el
// `marcador`) de la fila correspondiente y, en el caso de eliminatorias, el
// `rival`. El panel recalcula el descuento y el avance automáticamente.
//   estado: 'ganado' | 'empate' | 'perdido' | 'proximo' | 'eliminado'
// El descuento = 15% por cada victoria de España (tope 90%); si España es
// campeona (final 'ganado'), 100% → web gratis.

export type MatchStatus = 'ganado' | 'empate' | 'perdido' | 'proximo' | 'eliminado'

export interface EspMatch {
  faseEs: string
  faseEn: string
  /** Rival; vacío = por determinar */
  rival: string
  fechaEs: string
  fechaEn: string
  estado: MatchStatus
  marcador?: string
  /** true en la final, para detectar el título */
  esFinal?: boolean
}

export const ESPANA_PATH: EspMatch[] = [
  { faseEs: 'Fase de grupos · J1', faseEn: 'Group stage · MD1', rival: 'Cabo Verde', fechaEs: '—', fechaEn: '—', estado: 'empate', marcador: '0–0' },
  { faseEs: 'Fase de grupos · J2', faseEn: 'Group stage · MD2', rival: 'Arabia Saudí', fechaEs: '—', fechaEn: '—', estado: 'ganado', marcador: '4–0' },
  { faseEs: 'Fase de grupos · J3', faseEn: 'Group stage · MD3', rival: 'Uruguay', fechaEs: '26 jun', fechaEn: 'Jun 26', estado: 'proximo' },
  { faseEs: 'Dieciseisavos', faseEn: 'Round of 32', rival: '', fechaEs: '—', fechaEn: '—', estado: 'proximo' },
  { faseEs: 'Octavos', faseEn: 'Round of 16', rival: '', fechaEs: '—', fechaEn: '—', estado: 'proximo' },
  { faseEs: 'Cuartos', faseEn: 'Quarter-final', rival: '', fechaEs: '—', fechaEn: '—', estado: 'proximo' },
  { faseEs: 'Semifinal', faseEn: 'Semi-final', rival: '', fechaEs: '—', fechaEn: '—', estado: 'proximo' },
  { faseEs: 'FINAL', faseEn: 'FINAL', rival: '', fechaEs: '—', fechaEn: '—', estado: 'proximo', esFinal: true },
]

export const WIN_DISCOUNT = 15
export const MAX_NON_CHAMPION = 90

export function retoEstado(path: EspMatch[] = ESPANA_PATH) {
  const wins = path.filter((m) => m.estado === 'ganado').length
  const champion = path.some((m) => m.esFinal && m.estado === 'ganado')
  const pct = champion ? 100 : Math.min(MAX_NON_CHAMPION, wins * WIN_DISCOUNT)
  return { wins, champion, pct }
}

export interface GroupRow {
  team: string
  flag: string
  pts: number
  es: boolean
}

// Clasificación del Grupo H (manual). Actualiza los puntos tras cada jornada.
export const GROUP_H: GroupRow[] = [
  { team: 'España', flag: '🇪🇸', pts: 4, es: true },
  { team: 'Uruguay', flag: '🇺🇾', pts: 2, es: false },
  { team: 'Cabo Verde', flag: '🇨🇻', pts: 2, es: false },
  { team: 'Arabia Saudí', flag: '🇸🇦', pts: 1, es: false },
]
