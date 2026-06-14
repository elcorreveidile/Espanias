import type { Lang } from '@/lib/translations'

export type PageKey = 'manifiesto' | 'servicios' | 'ia' | 'contacto'

interface Card {
  title: string
  desc: string
}

export interface Block {
  eyebrow: string
  title: string
  intro?: string
  paragraphs?: string[]
  cards?: Card[]
  cols?: 3 | 4
  numbered?: boolean
  cta?: string
  ctaHref?: string
  dark?: boolean
}

export const pageContent: Record<Lang, Record<PageKey, Block[]>> = {
  es: {
    manifiesto: [
      {
        eyebrow: 'Nuestra visión',
        title: 'Tecnología con propósito, hecha en España',
        paragraphs: [
          'No creemos en la tecnología por la tecnología. Creemos en herramientas que resuelven problemas reales de personas y negocios reales, sin humo y sin tecnicismos.',
          'La inteligencia artificial ha dejado de ser cosa de grandes corporaciones. Hoy, una peluquería de barrio, una clínica o una asociación cultural pueden tener las mismas capacidades que una multinacional, a una fracción del coste.',
          'Nuestro trabajo es tender ese puente: traducir lo que la IA puede hacer al lenguaje de tu día a día, y construir contigo lo que de verdad necesitas.',
          'Espanias es la casa grande: el lugar desde el que reunimos, mostramos y gestionamos todos nuestros proyectos relacionados con la inteligencia artificial. Y cada web o aplicación que ves aquí se construye a través de nuestra agencia, Por 2 Duros.',
        ],
        cards: [
          { title: 'Cercanía', desc: 'Hablamos claro, sin jerga. Te acompañamos en cada paso.' },
          { title: 'Honestidad', desc: 'Si algo no te hace falta, te lo decimos. Sin sobrevender.' },
          { title: 'Resultados', desc: 'Webs y herramientas que funcionan y que usas de verdad.' },
        ],
        cols: 3,
        cta: 'Hablemos',
        ctaHref: '/contacto',
      },
    ],
    servicios: [
      {
        eyebrow: 'Cómo trabajamos',
        title: 'De la idea a la web, sin complicaciones',
        intro:
          'Un proceso sencillo y transparente, pensado para que tú te dediques a lo tuyo mientras nosotros nos encargamos de la tecnología.',
        cards: [
          { title: 'Escuchamos', desc: 'Entendemos tu negocio, tus clientes y qué necesitas de verdad.' },
          { title: 'Diseñamos', desc: 'Proponemos una solución a tu medida, con un presupuesto claro.' },
          { title: 'Construimos', desc: 'Desarrollamos tu web o herramienta, rápido y con calidad.' },
          { title: 'Acompañamos', desc: 'Te formamos y damos soporte para que saques el máximo partido.' },
        ],
        cols: 4,
        numbered: true,
        cta: 'Solicita tu presupuesto',
        ctaHref: '/contacto',
      },
    ],
    ia: [
      {
        eyebrow: 'IA para empresas',
        title: 'Integra la inteligencia artificial en tu negocio',
        intro:
          'Te ayudamos a entender, adoptar y aprovechar la IA — sin necesidad de tener un departamento técnico. Desde una primera auditoría hasta herramientas a medida que te ahorran horas cada semana.',
        cta: 'Solicita una auditoría gratuita',
        ctaHref: '/contacto',
      },
      {
        eyebrow: 'Qué hacemos',
        title: 'Soluciones reales, no promesas',
        cards: [
          { title: 'Auditoría y consultoría', desc: 'Analizamos tus procesos y detectamos dónde la IA te ahorra tiempo y dinero.' },
          { title: 'Formación a medida', desc: 'Talleres prácticos para tu equipo y formación de formadores: prompts, herramientas y buenas prácticas.' },
          { title: 'Automatizaciones', desc: 'Tareas repetitivas resueltas solas: emails, citas, atención al cliente, informes.' },
          { title: 'Herramientas a medida', desc: 'Chatbots, asistentes y apps construidos para tu negocio concreto.' },
        ],
        cols: 4,
      },
      {
        eyebrow: 'Quién está detrás',
        title: 'Formación que nace de la experiencia real',
        paragraphs: [
          'Contamos con personal con formación específica en la implementación de tecnologías en el sector productivo: no solo sabemos de IA, sabemos cómo encaja en el día a día de una empresa real.',
          'Y formamos a quienes forman: ofrecemos formación de formadores, para que tu organización multiplique el conocimiento por dentro y no dependa de nadie.',
        ],
      },
      {
        eyebrow: 'Acreditaciones',
        title: 'Formación oficial que lo respalda',
        cards: [
          { title: 'Digitalización Aplicada al Sector Productivo', desc: 'Ministerio de Educación y FP · UGT · Alianza por la FP. Financiado por la Unión Europea (NextGenerationEU).' },
          { title: 'Formación de Formadores', desc: 'Diseñar e impartir talleres de formación. Ministerio de Educación · Instituto Cervantes.' },
          { title: 'Apple Teacher', desc: 'Certificación oficial de Apple en el uso educativo de su tecnología. Centro de Lenguas Modernas, Granada.' },
        ],
        cols: 3,
      },
      {
        eyebrow: 'Cómo lo hacemos',
        title: 'Un método claro, paso a paso',
        dark: true,
        numbered: true,
        cards: [
          { title: 'Auditoría', desc: 'Vemos juntos dónde están las oportunidades reales.' },
          { title: 'Formación', desc: 'Tu equipo aprende a usar la IA con confianza.' },
          { title: 'Implementación', desc: 'Construimos e integramos las herramientas en tu día a día.' },
          { title: 'Acompañamiento', desc: 'Medimos, ajustamos y seguimos a tu lado.' },
        ],
        cols: 4,
        cta: '¿Listo para dar el paso?',
        ctaHref: '/contacto',
      },
    ],
    contacto: [
      {
        eyebrow: 'Atención',
        title: 'Online en toda España · Presencial en Granada',
        intro:
          'Cuéntanos tu proyecto por el formulario y te respondemos en 24-48 horas. La primera conversación siempre es gratis y sin compromiso.',
      },
    ],
  },
  en: {
    manifiesto: [
      {
        eyebrow: 'Our vision',
        title: 'Technology with purpose, made in Spain',
        paragraphs: [
          'We don’t believe in technology for its own sake. We believe in tools that solve real problems for real people and businesses — no hype, no jargon.',
          'Artificial intelligence is no longer just for big corporations. Today a neighbourhood barbershop, a clinic or a cultural association can have the same capabilities as a multinational, at a fraction of the cost.',
          'Our job is to build that bridge: translate what AI can do into the language of your everyday work, and build with you what you actually need.',
          'Espanias is the big house: the place from which we gather, showcase and manage all our AI-related projects. And every website or app you see here is built through our agency, Por 2 Duros.',
        ],
        cards: [
          { title: 'Closeness', desc: 'We speak plainly, no jargon. We’re with you every step.' },
          { title: 'Honesty', desc: 'If you don’t need something, we’ll tell you. No overselling.' },
          { title: 'Results', desc: 'Websites and tools that work and that you actually use.' },
        ],
        cols: 3,
        cta: 'Let’s talk',
        ctaHref: '/contacto',
      },
    ],
    servicios: [
      {
        eyebrow: 'How we work',
        title: 'From idea to website, hassle-free',
        intro:
          'A simple, transparent process so you can focus on your business while we handle the technology.',
        cards: [
          { title: 'We listen', desc: 'We understand your business, your clients and what you really need.' },
          { title: 'We design', desc: 'We propose a tailored solution with a clear quote.' },
          { title: 'We build', desc: 'We develop your website or tool, fast and with quality.' },
          { title: 'We support', desc: 'We train you and provide support to get the most out of it.' },
        ],
        cols: 4,
        numbered: true,
        cta: 'Request a quote',
        ctaHref: '/contacto',
      },
    ],
    ia: [
      {
        eyebrow: 'AI for business',
        title: 'Bring artificial intelligence into your business',
        intro:
          'We help you understand, adopt and leverage AI — without needing a tech department. From a first audit to custom tools that save you hours every week.',
        cta: 'Request a free audit',
        ctaHref: '/contacto',
      },
      {
        eyebrow: 'What we do',
        title: 'Real solutions, not promises',
        cards: [
          { title: 'Audit & consulting', desc: 'We analyse your processes and find where AI saves you time and money.' },
          { title: 'Tailored training', desc: 'Hands-on workshops for your team and train-the-trainer programmes: prompts, tools and best practices.' },
          { title: 'Automations', desc: 'Repetitive tasks handled on their own: emails, bookings, support, reports.' },
          { title: 'Custom tools', desc: 'Chatbots, assistants and apps built for your specific business.' },
        ],
        cols: 4,
      },
      {
        eyebrow: 'Who’s behind it',
        title: 'Training born from real-world experience',
        paragraphs: [
          'We have staff specifically trained in implementing technology in the productive sector: we don’t just know AI, we know how it fits into the day-to-day of a real business.',
          'And we train the trainers: we offer train-the-trainer programmes so your organisation can multiply knowledge internally and depend on no one.',
        ],
      },
      {
        eyebrow: 'Credentials',
        title: 'Backed by official training',
        cards: [
          { title: 'Digital Skills for the Productive Sector', desc: 'Spanish Ministry of Education & VET · UGT · Alliance for VET. Funded by the European Union (NextGenerationEU).' },
          { title: 'Train-the-Trainer Certification', desc: 'Designing and delivering training workshops. Ministry of Education · Instituto Cervantes.' },
          { title: 'Apple Teacher', desc: 'Official Apple certification in the educational use of its technology. Modern Languages Centre, Granada.' },
        ],
        cols: 3,
      },
      {
        eyebrow: 'How we do it',
        title: 'A clear, step-by-step method',
        dark: true,
        numbered: true,
        cards: [
          { title: 'Audit', desc: 'We find the real opportunities together.' },
          { title: 'Training', desc: 'Your team learns to use AI with confidence.' },
          { title: 'Implementation', desc: 'We build and integrate the tools into your day-to-day.' },
          { title: 'Support', desc: 'We measure, adjust and stay by your side.' },
        ],
        cols: 4,
        cta: 'Ready to take the step?',
        ctaHref: '/contacto',
      },
    ],
    contacto: [
      {
        eyebrow: 'Support',
        title: 'Online across Spain · In person in Granada',
        intro:
          'Tell us about your project through the form and we’ll reply within 24-48 hours. The first conversation is always free, no strings attached.',
      },
    ],
  },
}
