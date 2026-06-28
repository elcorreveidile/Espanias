'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import type { Project } from '@/lib/projects'
import ProjectCard from '@/components/catalogo/ProjectCard'
import SelloECR, { barrioNombre } from '@/components/marca/SelloECR'
import SimboloQPQ from '@/components/marca/SimboloQPQ'

interface PayMethod {
  icon: string
  name: string
  price: string
  desc: string
  featured?: boolean
}

const copy = {
  es: {
    eyebrow: 'Economía Circular Realejo',
    title: 'Tu negocio del Realejo, con web propia.\nY paga como mejor te venga.',
    intro:
      'En el Realejo nos cuidamos entre vecinos. Por eso ponemos web profesional a tu alcance sin descapitalizarte: al contado, a plazos sin intereses… o pagando con tu propio producto. Bienvenido a la Economía Circular Realejo.',
    payTitle: 'Cómo puedes pagar tu web',
    payNote: 'Ejemplo: web estándar, 2.000 €',
    pay: [
      { icon: '💶', name: 'Al contado', price: '1.800 €', desc: '10 % de descuento sobre el precio normal.' },
      { icon: '🗓️', name: 'A plazos, sin intereses', price: '4 × 500 €', desc: 'El precio normal, fraccionado y sin coste añadido.' },
      { icon: '♻️', name: 'Con QPQ', price: '300 € + el resto en QPQ', desc: 'Paga parte de tu web con bonos de tu propio negocio. 1 QPQ = 30 €.', featured: true },
    ] as PayMethod[],
    qpqTitle: '¿Qué es el QPQ?',
    qpqBody:
      'La moneda circular del Realejo: un bono de tu negocio que vale 30 €, al portador y sin caducidad. Pagas parte de tu web con ellos y esos bonos circulan por el barrio. Trueque justo, del siglo XXI. El QPQ es un método de pago entre el negocio y la agencia: no se vende al consumidor.',
    selloTitle: 'El sello ECR',
    selloBody:
      'Tu web lucirá el sello Economía Circular Realejo: la señal de que formas parte de la red de negocios del barrio que se apoyan entre sí.',
    dirTitle: 'Directorio ECR',
    dirSub: 'Negocios del barrio adheridos a la Economía Circular.',
    dirEmpty: 'Pronto aparecerán aquí los negocios adheridos del barrio.',
    ctaTitle: '¿Tienes un negocio en el Realejo?',
    ctaBody: 'Escríbenos y te montamos tu web. Súmate al ECR.',
    ctaBtn: 'Quiero sumarme al ECR',
  },
  en: {
    eyebrow: 'Realejo Circular Economy',
    title: 'Your Realejo business, with its own website.\nPay however suits you best.',
    intro:
      'In the Realejo we look after our neighbours. That’s why we make a professional website affordable without draining your cash: pay upfront, in interest-free instalments… or with your own product. Welcome to the Realejo Circular Economy.',
    payTitle: 'Ways to pay for your website',
    payNote: 'Example: standard site, €2,000',
    pay: [
      { icon: '💶', name: 'Upfront', price: '€1,800', desc: '10% off the standard price.' },
      { icon: '🗓️', name: 'Interest-free instalments', price: '4 × €500', desc: 'The standard price, split with no added cost.' },
      { icon: '♻️', name: 'With QPQ', price: '€300 + the rest in QPQ', desc: 'Pay part of your site with vouchers from your own business. 1 QPQ = €30.', featured: true },
    ] as PayMethod[],
    qpqTitle: 'What is QPQ?',
    qpqBody:
      'The Realejo’s circular currency: a €30 voucher from your business, to the bearer and with no expiry date. Part of your website is paid with them, and those vouchers circulate around the neighbourhood. Fair, 21st-century bartering. QPQ is a payment method between the business and the agency: it is not sold to consumers.',
    selloTitle: 'The ECR seal',
    selloBody:
      'Your site will carry the Realejo Circular Economy seal — proof that you’re part of the local network of businesses that support each other.',
    dirTitle: 'ECR Directory',
    dirSub: 'Neighbourhood businesses that are part of the Circular Economy.',
    dirEmpty: 'The neighbourhood’s member businesses will appear here soon.',
    ctaTitle: 'Run a business in the Realejo?',
    ctaBody: 'Get in touch and we’ll build your site. Join the ECR.',
    ctaBtn: 'I want to join the ECR',
  },
}

type Copy = typeof copy.es

export default function EcrClient({ adheridos }: { adheridos: Project[] }) {
  const { lang } = useLanguage()
  const t: Copy = copy[lang]

  // Agrupa los negocios adheridos por barrio (ECR, ECZ…).
  const barrios = Array.from(new Set(adheridos.map((p) => p.ecrBarrio).filter(Boolean) as string[]))

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      {/* Hero */}
      <header className="mb-16 text-center">
        <div className="mb-6 flex justify-center">
          <SelloECR barrio="ECR" size={108} className="dark:rounded-full dark:bg-white/90 dark:p-1" />
        </div>
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#BF2638]">{t.eyebrow}</p>
        <h1 className="mx-auto max-w-3xl whitespace-pre-line text-3xl font-black leading-tight text-[#1C1917] md:text-5xl dark:text-[#F5F5F4]">
          {t.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#78716C] dark:text-[#A8A29E]">{t.intro}</p>
      </header>

      {/* Formas de pago */}
      <section className="mb-20">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-black text-[#1C1917] md:text-3xl dark:text-[#F5F5F4]">{t.payTitle}</h2>
          <span className="shrink-0 text-sm text-[#A8A29E]">{t.payNote}</span>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {t.pay.map((m) => (
            <div
              key={m.name}
              className={`flex flex-col rounded-2xl border p-6 ${
                m.featured
                  ? 'border-transparent bg-gradient-to-br from-[#6D28D9] to-[#BF2638] text-white shadow-lg'
                  : 'border-stone-200 bg-white dark:border-white/10 dark:bg-[#1C1917]'
              }`}
            >
              <span className="text-3xl">{m.icon}</span>
              <h3 className={`mt-3 text-lg font-black ${m.featured ? 'text-white' : 'text-[#1C1917] dark:text-[#F5F5F4]'}`}>{m.name}</h3>
              <p className={`mt-1 text-2xl font-black ${m.featured ? 'text-[#FFC400]' : 'text-[#6D28D9] dark:text-[#A78BFA]'}`}>{m.price}</p>
              <p className={`mt-2 text-sm leading-relaxed ${m.featured ? 'text-white/90' : 'text-[#78716C] dark:text-[#A8A29E]'}`}>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ¿Qué es el QPQ? */}
      <section className="mb-20 grid items-center gap-8 rounded-3xl bg-[#1C1917] p-8 md:grid-cols-[auto,1fr] md:p-12">
        <div className="flex justify-center">
          <SimboloQPQ size={120} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white md:text-3xl">{t.qpqTitle}</h2>
          <p className="mt-4 text-lg leading-relaxed text-stone-300">{t.qpqBody}</p>
        </div>
      </section>

      {/* El sello ECR */}
      <section className="mb-20 grid items-center gap-8 md:grid-cols-[1fr,auto]">
        <div>
          <h2 className="text-2xl font-black text-[#1C1917] md:text-3xl dark:text-[#F5F5F4]">{t.selloTitle}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[#78716C] dark:text-[#A8A29E]">{t.selloBody}</p>
        </div>
        <div className="flex justify-center md:order-first">
          <SelloECR barrio="ECR" size={140} className="dark:rounded-full dark:bg-white/90 dark:p-2" />
        </div>
      </section>

      {/* Directorio ECR */}
      <section className="mb-20">
        <h2 className="text-2xl font-black text-[#1C1917] md:text-3xl dark:text-[#F5F5F4]">{t.dirTitle}</h2>
        <p className="mt-2 text-[#78716C] dark:text-[#A8A29E]">{t.dirSub}</p>

        {adheridos.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-stone-300 p-8 text-center text-[#A8A29E] dark:border-white/15">
            {t.dirEmpty}
          </p>
        ) : (
          barrios.map((b) => (
            <div key={b} className="mt-8">
              <div className="mb-4 flex items-center gap-3">
                <SelloECR barrio={b} size={40} className="dark:rounded-full dark:bg-white/90" />
                <h3 className="text-lg font-black text-[#1C1917] dark:text-[#F5F5F4]">
                  {t.dirTitle} · {barrioNombre(b)}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {adheridos
                  .filter((p) => p.ecrBarrio === b)
                  .map((p) => (
                    <ProjectCard key={p.id} project={p} lang={lang} />
                  ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-gradient-to-br from-[#6D28D9] to-[#BF2638] p-10 text-center text-white md:p-14">
        <h2 className="text-2xl font-black md:text-3xl">{t.ctaTitle}</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-white/90">{t.ctaBody}</p>
        <Link
          href="/contacto"
          className="mt-6 inline-block rounded-lg bg-white px-7 py-3 font-bold text-[#1C1917] transition-colors hover:bg-stone-100"
        >
          {t.ctaBtn}
        </Link>
      </section>
    </div>
  )
}
