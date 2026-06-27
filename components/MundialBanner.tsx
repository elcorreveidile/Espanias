'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'

// Mini-penalti interactivo para la portada: al chutar, lleva a /mundial.
type Dir = 'left' | 'center' | 'right'
const DIRS: Dir[] = ['left', 'center', 'right']
const POS: Record<Dir, string> = { left: '22%', center: '50%', right: '78%' }

export default function MundialBanner() {
  const { lang } = useLanguage()
  const router = useRouter()
  const [shot, setShot] = useState<Dir | null>(null)
  const [keeper, setKeeper] = useState<Dir>('center')

  const shoot = (d: Dir) => {
    if (shot) return
    setShot(d)
    setKeeper(DIRS[Math.floor(Math.random() * 3)])
    window.setTimeout(() => router.push('/mundial'), 850)
  }

  const t =
    lang === 'es'
      ? {
          title: 'Reto Mundial 2026',
          desc: 'Marca tu penalti y gana hasta una WEB GRATIS',
          hint: 'Pulsa la portería para chutar',
          going: '¡Vamos! 🚀',
        }
      : {
          title: 'World Cup 2026 Challenge',
          desc: 'Score your penalty and win up to a FREE website',
          hint: 'Tap the goal to shoot',
          going: "Let's go! 🚀",
        }

  const moving = shot !== null
  const ballLeft = moving ? POS[shot] : '50%'
  const ballBottom = moving ? '72px' : '6px'
  const keeperLeft = moving ? POS[keeper] : '50%'

  return (
    <div className="mx-auto mb-10 w-full max-w-md overflow-hidden rounded-3xl border-2 border-[#FFC400]/40 bg-gradient-to-b from-[#13233b] to-[#0c1626] p-5 text-white shadow-xl">
      <div className="mb-1 flex items-center justify-center gap-2">
        <span className="text-lg leading-none">🇪🇸</span>
        <span className="text-sm font-black uppercase tracking-wider text-[#FFC400]">{t.title}</span>
      </div>
      <p className="mb-4 text-center text-sm font-bold">{t.desc}</p>

      {/* Mini portería */}
      <div className="relative mx-auto h-[130px] w-full max-w-[290px] select-none">
        {/* césped */}
        <div className="absolute bottom-0 h-8 w-full rounded-b-lg bg-[#2f7d4f]" />
        {/* marco + red */}
        <div
          className="absolute left-1/2 top-1 h-[96px] w-[260px] -translate-x-1/2 rounded-t-md border-x-4 border-t-4 border-white/90"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
        {/* zonas de tiro */}
        {!moving &&
          DIRS.map((d) => (
            <button
              key={d}
              onClick={() => shoot(d)}
              aria-label={`Chutar ${d}`}
              className="absolute top-1 h-[96px] w-[84px] rounded-md transition-colors hover:bg-[#FFC400]/20"
              style={{ left: POS[d], transform: 'translateX(-50%)' }}
            >
              <span className="text-xl opacity-40">🎯</span>
            </button>
          ))}
        {/* portero */}
        <div
          className="absolute top-[28px] text-3xl transition-all duration-700 ease-out"
          style={{ left: keeperLeft, transform: `translateX(-50%) ${moving ? 'scale(1.1)' : ''}` }}
        >
          🧤
        </div>
        {/* balón */}
        <div
          className="absolute text-2xl transition-all duration-[850ms] ease-out"
          style={{ left: ballLeft, bottom: ballBottom, transform: 'translateX(-50%)' }}
        >
          ⚽
        </div>
      </div>

      <p className="mt-3 text-center text-xs font-semibold text-white/80">
        {moving ? t.going : `👆 ${t.hint}`}
      </p>
    </div>
  )
}
