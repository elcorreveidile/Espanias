'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { ESPANA_PATH, GROUP_H, retoEstado, type MatchStatus } from '@/lib/mundial'

type Dir = 'left' | 'center' | 'right'
type Phase = 'aim' | 'shoot' | 'goal' | 'saved'
interface Prize { pct: number; code: string }

const DIRS: Dir[] = ['left', 'center', 'right']
const POS: Record<Dir, string> = { left: '24%', center: '50%', right: '76%' }

const STATUS_EMOJI: Record<MatchStatus, string> = { ganado: '✅', empate: '🟰', perdido: '❌', proximo: '🔜', eliminado: '🚫' }
const STATUS_COLOR: Record<MatchStatus, string> = { ganado: 'text-emerald-600', empate: 'text-stone-500', perdido: 'text-red-600', proximo: 'text-amber-600', eliminado: 'text-stone-500' }

function pickPrize(): Prize {
  const r = Math.random() * 100
  // Ponderado: los premios gordos salen muy de vez en cuando.
  const pct =
    r < 2 ? 100 : // web GRATIS (muy raro)
    r < 8 ? 80 : // 80% (raro)
    r < 28 ? 20 :
    r < 55 ? 15 :
    r < 82 ? 10 :
    0 // ¡suerte la próxima!
  const code = 'MUNDIAL-' + Math.random().toString(36).slice(2, 6).toUpperCase()
  return { pct, code }
}

const copy = {
  es: {
    badge: 'Mundial 2026',
    heroTitle: 'Cuanto más gana España, menos cuesta tu web',
    heroSub:
      'Por cada partido que gane España en el Mundial 2026, baja el precio de tu web con nosotros. Si se proclama campeona, te la regalamos. España está, literalmente, en nuestro nombre.',
    ladder: [
      { k: 'Por cada victoria de España', v: '+15%' },
      { k: 'Tope acumulado', v: '90%' },
      { k: 'Campeona del Mundo', v: 'GRATIS' },
    ],
    panelTitle: 'El camino de España',
    panelSub: 'Cada victoria sube tu descuento. Este es el marcador del reto.',
    discountNow: 'Tu descuento ahora',
    ofFree: 'hacia la web gratis',
    champBanner: '¡CAMPEONA! Tu web es GRATIS 🏆',
    st: { ganado: 'Ganado', empate: 'Empate', perdido: 'Perdido', proximo: 'Próximo', eliminado: 'Eliminada' } as Record<MatchStatus, string>,
    tbd: 'Por determinar',
    vs: 'vs',
    groupTitle: 'Grupo H',
    pts: 'pts',
    signupNote: 'Apúntate ahora: tu descuento crece solo con cada victoria de España.',
    signupBtn: 'Apuntarme al reto',
    victoria:
      'Y brindamos por la Victoria: la de la Roja y la de Cervezas Victoria, la malagueña que patrocina a la selección. Nuestro estudio también es de Málaga. 🍺',
    gameTitle: 'Marca el penalti y rasca tu premio',
    gameSub: 'Elige a dónde chutar. Si marcas, rascas tu cupón.',
    aimHint: 'Pulsa una zona de la portería para chutar 👇',
    goal: '¡GOOOL! 🎉',
    saved: '¡Paradón del portero! 🧤',
    retry: 'Volver a chutar',
    scratchHere: 'RASCA AQUÍ',
    scratchInstr: 'Rasca con el dedo o el ratón para descubrir tu cupón',
    noluck: '¡Suerte la próxima!',
    discount: (p: number) => `${p}% de descuento`,
    freeWeb: '¡ENHORABUENA! Has ganado una WEB GRATIS 🏆',
    bigWin: (p: number) => `¡ENHORABUENA! Has conseguido un ${p}% de descuento 🎉`,
    yourCode: 'Tu código',
    claim: 'Conseguir mi cupón',
    claimNote: 'Escríbenos con tu código y te lo aplicamos en tu web.',
    playAgain: 'Jugar otra vez',
    ctaTitle: '¿Te apuntas al reto?',
    ctaText:
      'Mándanos «MUNDIAL» y tu email por contacto. Tu descuento sube solo con cada victoria de España.',
    ctaBtn: 'Apuntarme',
    ctaCatalog: 'Ver el catálogo',
    vamos: '¡Vamos, España! 🇪🇸',
  },
  en: {
    badge: 'World Cup 2026',
    heroTitle: 'The more Spain wins, the cheaper your website',
    heroSub:
      'For every match Spain wins at the 2026 World Cup, the price of your website with us drops. If they become World Champions, it’s on us. Spain is, literally, in our name.',
    ladder: [
      { k: 'Per Spain win', v: '+15%' },
      { k: 'Max stacked', v: '90%' },
      { k: 'World Champions', v: 'FREE' },
    ],
    panelTitle: 'Spain’s road',
    panelSub: 'Every win raises your discount. This is the challenge scoreboard.',
    discountNow: 'Your discount now',
    ofFree: 'towards the free website',
    champBanner: 'CHAMPIONS! Your website is FREE 🏆',
    st: { ganado: 'Won', empate: 'Draw', perdido: 'Lost', proximo: 'Upcoming', eliminado: 'Out' } as Record<MatchStatus, string>,
    tbd: 'TBD',
    vs: 'vs',
    groupTitle: 'Group H',
    pts: 'pts',
    signupNote: 'Sign up now: your discount grows on its own with every Spain win.',
    signupBtn: 'Join the challenge',
    victoria:
      'And we toast to Victoria: La Roja’s win and Cervezas Victoria, the Málaga brewery sponsoring the national team. Our studio is from Málaga too. 🍺',
    gameTitle: 'Score the penalty and scratch your prize',
    gameSub: 'Pick where to shoot. If you score, you scratch your coupon.',
    aimHint: 'Tap a zone of the goal to shoot 👇',
    goal: 'GOOOAL! 🎉',
    saved: 'Great save by the keeper! 🧤',
    retry: 'Shoot again',
    scratchHere: 'SCRATCH HERE',
    scratchInstr: 'Scratch with your finger or mouse to reveal your coupon',
    noluck: 'Better luck next time!',
    discount: (p: number) => `${p}% off`,
    freeWeb: 'CONGRATULATIONS! You won a FREE WEBSITE 🏆',
    bigWin: (p: number) => `CONGRATULATIONS! You got ${p}% off 🎉`,
    yourCode: 'Your code',
    claim: 'Claim my coupon',
    claimNote: 'Message us with your code and we’ll apply it to your website.',
    playAgain: 'Play again',
    ctaTitle: 'Join the challenge?',
    ctaText:
      'Send us “MUNDIAL” and your email via contact. Your discount grows on its own with every Spain win.',
    ctaBtn: 'Sign me up',
    ctaCatalog: 'See the catalogue',
    vamos: 'Vamos, España! 🇪🇸',
  },
}

type Copy = typeof copy.es

function ScratchCard({ prize, t, muted }: { prize: Prize; t: Copy; muted: boolean }) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const drawing = useRef(false)
  const [revealed, setRevealed] = useState(false)

  // Vibración de celebración al destapar un premio gordo (80% o web gratis).
  useEffect(() => {
    if (revealed && prize.pct >= 80 && !muted && typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate([60, 40, 60, 40, 140]) } catch { /* no-op */ }
    }
  }, [revealed, prize.pct, muted])

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const g = ctx.createLinearGradient(0, 0, c.width, c.height)
    g.addColorStop(0, '#E0BD86')
    g.addColorStop(1, '#B8893F')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, c.width, c.height)
    ctx.fillStyle = 'rgba(28,24,20,0.6)'
    ctx.font = 'bold 22px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(t.scratchHere, c.width / 2, c.height / 2)
  }, [t.scratchHere])

  const at = (e: React.PointerEvent) => {
    const c = ref.current!
    const r = c.getBoundingClientRect()
    return {
      x: (e.clientX - r.left) * (c.width / r.width),
      y: (e.clientY - r.top) * (c.height / r.height),
    }
  }

  const scratch = (e: React.PointerEvent) => {
    if (!drawing.current || revealed) return
    const c = ref.current!
    const ctx = c.getContext('2d')!
    const { x, y } = at(e)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 22, 0, Math.PI * 2)
    ctx.fill()
    // muestreo disperso del canal alfa para ver cuánto se ha rascado
    const data = ctx.getImageData(0, 0, c.width, c.height).data
    let clear = 0
    let total = 0
    for (let i = 3; i < data.length; i += 4 * 50) {
      total++
      if (data[i] === 0) clear++
    }
    if (total > 0 && clear / total > 0.45) setRevealed(true)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-[150px] w-[300px] overflow-hidden rounded-xl border border-[#FFC400]/40 shadow-lg">
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center px-3 text-center ${
            prize.pct >= 80
              ? 'bg-gradient-to-br from-[#C60B1E] to-[#7a0712]'
              : prize.pct > 0
                ? 'bg-[#0e7d4d]'
                : 'bg-[#3b2f2a]'
          }`}
        >
          {prize.pct >= 100 ? (
            <span className="text-lg font-black leading-tight text-[#FFC400]">{t.freeWeb}</span>
          ) : prize.pct >= 80 ? (
            <span className="text-base font-black leading-tight text-[#FFC400]">{t.bigWin(prize.pct)}</span>
          ) : prize.pct > 0 ? (
            <>
              <span className="text-3xl font-black text-white">{t.discount(prize.pct)}</span>
              <span className="mt-1 text-xs uppercase tracking-wider text-white/70">
                {t.yourCode}: <strong className="text-[#FFC400]">{prize.code}</strong>
              </span>
            </>
          ) : (
            <span className="px-4 text-xl font-black text-white/90">{t.noluck}</span>
          )}
          {prize.pct >= 80 && (
            <span className="mt-2 text-[11px] uppercase tracking-wider text-white/80">
              {t.yourCode}: <strong className="text-white">{prize.code}</strong>
            </span>
          )}
        </div>
        <canvas
          ref={ref}
          width={300}
          height={150}
          onPointerDown={(e) => {
            drawing.current = true
            scratch(e)
          }}
          onPointerMove={scratch}
          onPointerUp={() => (drawing.current = false)}
          onPointerLeave={() => (drawing.current = false)}
          className={`absolute inset-0 cursor-crosshair transition-opacity duration-500 ${
            revealed ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
          style={{ touchAction: 'none' }}
        />
      </div>
      {!revealed ? (
        <p className="max-w-[300px] text-center text-xs text-[#A8A29E]">{t.scratchInstr}</p>
      ) : (
        <div className="flex flex-col items-center gap-2">
          {prize.pct > 0 && (
            <Link
              href="/contacto"
              className="rounded-lg bg-[#FFC400] px-5 py-2.5 text-sm font-bold text-[#1C1917] transition-colors hover:bg-[#e0ad00]"
            >
              {t.claim}
            </Link>
          )}
          <p className="max-w-[300px] text-center text-xs text-[#A8A29E]">
            {prize.pct > 0 ? t.claimNote : t.ctaText}
          </p>
        </div>
      )}
    </div>
  )
}

function PenaltyGame({ t }: { t: Copy }) {
  const [phase, setPhase] = useState<Phase>('aim')
  const [shot, setShot] = useState<Dir>('center')
  const [keeper, setKeeper] = useState<Dir>('center')
  const [prize, setPrize] = useState<Prize | null>(null)
  const [muted, setMuted] = useState(false)
  const acRef = useRef<AudioContext | null>(null)

  // Audio sintetizado (Web Audio API): sin archivos, se crea en el primer chut.
  const ac = (): AudioContext | null => {
    if (typeof window === 'undefined') return null
    if (!acRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AC) return null
      acRef.current = new AC()
    }
    if (acRef.current.state === 'suspended') void acRef.current.resume()
    return acRef.current
  }
  const tone = (c: AudioContext, freq: number, t0: number, dur: number, type: OscillatorType, vol: number) => {
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = type
    o.frequency.setValueAtTime(freq, t0)
    g.gain.setValueAtTime(0.0001, t0)
    g.gain.linearRampToValueAtTime(vol, t0 + 0.012)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
    o.connect(g).connect(c.destination)
    o.start(t0)
    o.stop(t0 + dur)
  }
  const noise = (c: AudioContext, t0: number, dur: number, vol: number) => {
    const buffer = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    const src = c.createBufferSource()
    src.buffer = buffer
    const filt = c.createBiquadFilter()
    filt.type = 'highpass'
    filt.frequency.value = 700
    const g = c.createGain()
    g.gain.setValueAtTime(vol, t0)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
    src.connect(filt).connect(g).connect(c.destination)
    src.start(t0)
    src.stop(t0 + dur)
  }
  const sKick = () => { const c = ac(); if (!c || muted) return; const t = c.currentTime; noise(c, t, 0.1, 0.35); tone(c, 200, t, 0.12, 'triangle', 0.25) }
  const sGoal = () => { const c = ac(); if (!c || muted) return; const t = c.currentTime;[523, 659, 784, 1047].forEach((f, i) => tone(c, f, t + i * 0.085, 0.32, 'sawtooth', 0.16)); noise(c, t, 0.45, 0.12) }
  const sSave = () => { const c = ac(); if (!c || muted) return; const t = c.currentTime; tone(c, 150, t, 0.16, 'square', 0.25); tone(c, 95, t + 0.07, 0.22, 'square', 0.2) }
  const vibrate = (p: number | number[]) => {
    if (muted || typeof navigator === 'undefined' || !navigator.vibrate) return
    try { navigator.vibrate(p) } catch { /* no-op */ }
  }

  const shoot = (dir: Dir) => {
    if (phase !== 'aim') return
    // 1 de cada 3 es gol. Colocamos al portero para que la animación cuadre:
    // parada → se lanza a tu zona; gol → se lanza a otra.
    const isGoal = Math.random() < 1 / 3
    const kdir = isGoal
      ? (() => {
          const others = DIRS.filter((d) => d !== dir)
          return others[Math.floor(Math.random() * others.length)]
        })()
      : dir
    setShot(dir)
    setKeeper(kdir)
    setPhase('shoot')
    sKick()
    vibrate(20)
    window.setTimeout(() => {
      if (isGoal) {
        setPrize(pickPrize())
        setPhase('goal')
        sGoal()
        vibrate([40, 40, 90])
      } else {
        setPhase('saved')
        sSave()
        vibrate(60)
      }
    }, 950)
  }

  const reset = () => {
    setPhase('aim')
    setShot('center')
    setKeeper('center')
    setPrize(null)
  }

  const moving = phase !== 'aim'
  const ballLeft = moving ? POS[shot] : '50%'
  const ballBottom = moving ? '116px' : '8px'
  const keeperLeft = moving ? POS[keeper] : '50%'

  return (
    <div className="flex flex-col items-center">
      {/* Sonido / vibración */}
      <div className="mb-1 flex w-full max-w-[360px] justify-end">
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? 'Activar sonido' : 'Silenciar'}
          className="rounded-full px-2 py-1 text-lg transition-opacity hover:opacity-80"
        >
          {muted ? '🔇' : '🔊'}
        </button>
      </div>
      {/* Portería */}
      <div className="relative h-[210px] w-full max-w-[360px] select-none">
        {/* césped */}
        <div className="absolute bottom-0 h-10 w-full rounded-b-lg bg-[#2f7d4f]" />
        {/* marco + red */}
        <div
          className="absolute left-1/2 top-2 h-[150px] w-[300px] -translate-x-1/2 rounded-t-md border-x-4 border-t-4 border-white/90"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* zonas de tiro */}
        {phase === 'aim' &&
          DIRS.map((d) => (
            <button
              key={d}
              onClick={() => shoot(d)}
              aria-label={d}
              className="absolute top-2 h-[150px] w-[100px] rounded-md transition-colors hover:bg-[#FFC400]/15"
              style={{ left: POS[d], transform: 'translateX(-50%)' }}
            >
              <span className="text-2xl opacity-40">🎯</span>
            </button>
          ))}
        {/* portero */}
        <div
          className="absolute top-[44px] text-4xl transition-all duration-700 ease-out"
          style={{ left: keeperLeft, transform: `translateX(-50%) ${moving ? 'scale(1.1)' : ''}` }}
        >
          🧤
        </div>
        {/* balón */}
        <div
          className="absolute text-3xl transition-all duration-[900ms] ease-out"
          style={{ left: ballLeft, bottom: ballBottom, transform: 'translateX(-50%)' }}
        >
          ⚽
        </div>
        {/* resultado */}
        {phase === 'goal' && (
          <div className="absolute inset-x-0 top-1 text-center text-2xl font-black text-[#FFC400] drop-shadow">
            {t.goal}
          </div>
        )}
        {phase === 'saved' && (
          <div className="absolute inset-x-0 top-1 text-center text-2xl font-black text-white drop-shadow">
            {t.saved}
          </div>
        )}
      </div>

      {/* estado bajo la portería */}
      <div className="mt-4 flex min-h-[180px] flex-col items-center justify-start">
        {phase === 'aim' && <p className="text-sm text-[#A8A29E]">{t.aimHint}</p>}
        {phase === 'shoot' && <p className="text-sm text-[#A8A29E]">…</p>}
        {phase === 'saved' && (
          <button
            onClick={reset}
            className="rounded-lg border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {t.retry}
          </button>
        )}
        {phase === 'goal' && prize && (
          <div className="flex flex-col items-center gap-3">
            <ScratchCard prize={prize} t={t} muted={muted} />
            <button onClick={reset} className="text-xs font-medium text-[#A8A29E] underline hover:text-white">
              {t.playAgain}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MundialClient() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const reto = retoEstado()

  return (
    <>
      <Nav />
      <main className="min-h-screen px-6 py-28 md:py-32">
        <div className="mx-auto max-w-3xl">
          {/* Cabecera campaña */}
          <div className="mb-10 text-center">
            <span className="mb-4 inline-block rounded-full bg-[#BF2638] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
              🇪🇸 {t.badge}
            </span>
            <h1 className="mb-5 text-4xl font-black leading-tight text-[#1C1917] md:text-5xl dark:text-[#F5F5F4]">
              {t.heroTitle}
            </h1>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#78716C] dark:text-[#A8A29E]">
              {t.heroSub}
            </p>
          </div>

          {/* Escalera de descuento */}
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {t.ladder.map((row, i) => (
              <div
                key={i}
                className="rounded-2xl border border-stone-200 bg-white p-5 text-center dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="mb-1 text-3xl font-black text-[#BF2638]">{row.v}</div>
                <div className="text-sm text-[#78716C] dark:text-[#A8A29E]">{row.k}</div>
              </div>
            ))}
          </div>

          <p className="mb-12 rounded-xl bg-[#FFC400]/15 px-5 py-4 text-center text-sm font-medium text-[#1C1917] dark:text-[#F5F5F4]">
            {t.victoria}
          </p>

          {/* Juego */}
          <div className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-b from-[#13233b] to-[#0c1626] p-8 text-white shadow-xl">
            <h2 className="mb-1 text-center text-2xl font-black md:text-3xl">{t.gameTitle}</h2>
            <p className="mb-8 text-center text-sm text-white/70">{t.gameSub}</p>
            <PenaltyGame t={t} />
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-[#1C1917] p-10 text-center text-white">
            <h2 className="mb-3 text-2xl font-black md:text-3xl">{t.ctaTitle}</h2>
            <p className="mx-auto mb-6 max-w-md text-stone-300">{t.ctaText}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#camino"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-[#1C1917] transition-colors hover:bg-stone-200"
              >
                {t.ctaBtn}
              </Link>
              <Link
                href="/catalogo"
                className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t.ctaCatalog}
              </Link>
            </div>
            <p className="mt-6 text-sm font-bold text-[#FFC400]">{t.vamos}</p>
          </div>

          {/* Panel del reto: el camino de España */}
          <div
            id="camino"
            className="mt-12 scroll-mt-24 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <h2 className="mb-1 text-center text-2xl font-black text-[#1C1917] md:text-3xl dark:text-[#F5F5F4]">
              {t.panelTitle}
            </h2>
            <p className="mb-8 text-center text-sm text-[#78716C] dark:text-[#A8A29E]">{t.panelSub}</p>

            {/* Descuento actual */}
            <div className="mb-8 rounded-2xl bg-[#1C1917] p-6 text-center text-white">
              {reto.champion ? (
                <div className="text-2xl font-black text-[#FFC400]">{t.champBanner}</div>
              ) : (
                <>
                  <div className="text-xs uppercase tracking-wider text-stone-400">{t.discountNow}</div>
                  <div className="my-1 text-5xl font-black text-[#FFC400]">{reto.pct}%</div>
                  <div className="mx-auto mt-3 h-2 max-w-sm overflow-hidden rounded-full bg-white/15">
                    <div className="h-full rounded-full bg-[#FFC400] transition-all" style={{ width: `${reto.pct}%` }} />
                  </div>
                  <div className="mt-2 text-xs text-stone-400">{reto.pct}% {t.ofFree}</div>
                </>
              )}
            </div>

            {/* Cronología de partidos */}
            <ol className="mb-8 space-y-2">
              {ESPANA_PATH.map((m, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 dark:border-white/10"
                >
                  <span className="text-lg">{STATUS_EMOJI[m.estado]}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-[#1C1917] dark:text-[#F5F5F4]">
                      {lang === 'es' ? m.faseEs : m.faseEn}
                    </div>
                    <div className="truncate text-xs text-[#78716C] dark:text-[#A8A29E]">
                      {t.vs} {m.rival || t.tbd} · {lang === 'es' ? m.fechaEs : m.fechaEn}
                    </div>
                  </div>
                  <div className="text-right">
                    {m.marcador && (
                      <div className="text-sm font-black text-[#1C1917] dark:text-[#F5F5F4]">{m.marcador}</div>
                    )}
                    <div className={`text-xs font-semibold ${STATUS_COLOR[m.estado]}`}>{t.st[m.estado]}</div>
                  </div>
                </li>
              ))}
            </ol>

            {/* Grupo H */}
            <div className="mb-8">
              <h3 className="mb-2 text-sm font-black uppercase tracking-wider text-[#78716C] dark:text-[#A8A29E]">
                {t.groupTitle}
              </h3>
              <div className="overflow-hidden rounded-xl border border-stone-200 dark:border-white/10">
                {GROUP_H.map((r, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-4 py-2 text-sm ${
                      r.es ? 'bg-[#FFC400]/15 font-bold' : ''
                    } ${i > 0 ? 'border-t border-stone-100 dark:border-white/5' : ''}`}
                  >
                    <span className="text-[#1C1917] dark:text-[#F5F5F4]">
                      {r.flag} {r.team}
                    </span>
                    <span className="text-[#78716C] dark:text-[#A8A29E]">
                      {r.pts} {t.pts}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Apuntarse */}
            <div className="text-center">
              <p className="mx-auto mb-4 max-w-md text-sm text-[#78716C] dark:text-[#A8A29E]">{t.signupNote}</p>
              <Link
                href="/contacto"
                className="inline-block rounded-lg bg-[#BF2638] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#a01f2e]"
              >
                {t.signupBtn}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
