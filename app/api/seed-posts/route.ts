import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { ensurePostsTable } from "@/lib/db/ensure-schema";

// Endpoint TEMPORAL: inserta 5 artículos del blog como BORRADOR (publicado=0),
// bilingües (ES/EN). Idempotente (ON CONFLICT DO NOTHING). Borrar tras usarlo.
export const dynamic = "force-dynamic";

const TOKEN = "espanias-seedposts-2026";

type Post = {
  slug: string;
  titulo: string;
  resumen: string;
  contenido: string;
  tituloEn: string;
  resumenEn: string;
  contenidoEn: string;
};

const POSTS: Post[] = [
  {
    slug: "gemini-chatgpt-claude-copilot-tu-negocio",
    titulo: "Gemini, ChatGPT, Claude o Copilot: ¿cuál le conviene a tu negocio?",
    resumen:
      "Cuatro asistentes de IA, cuatro estilos. Te contamos en cristiano para qué sirve cada uno y cómo elegir sin volverte loco.",
    contenido: `La inteligencia artificial está en todas las búsquedas, pero ante tantos nombres —**ChatGPT, Gemini, Claude, Copilot**— es normal perderse. La buena noticia: para un negocio pequeño **no necesitas todos; necesitas el adecuado** para lo que haces.

## ChatGPT (OpenAI)
El más conocido y polivalente. Va muy bien para *redactar textos*, responder dudas, generar ideas y crear imágenes. Si solo vas a probar uno, suele ser un buen punto de partida.

## Gemini (Google)
Integrado con el mundo Google (Gmail, Docs, búsqueda). Cómodo si **ya trabajas con herramientas de Google** y quieres la IA donde ya tienes tu correo y tus documentos.

## Claude (Anthropic)
Destaca redactando y razonando con **textos largos** y un tono natural. Muy bueno para documentos, resúmenes cuidados y tareas donde importa la calidad de la escritura. *(Spoiler: es con quien construimos buena parte de Espanias.)*

## Copilot (Microsoft)
La IA dentro de **Word, Excel y Outlook**. Si tu día a día es Office, te ayuda sin salir de donde ya trabajas.

## Entonces, ¿cuál elijo?
- Quieres **algo general para empezar** → ChatGPT.
- Vives en **Google** → Gemini.
- Te importa la **calidad del texto** y los documentos largos → Claude.
- Trabajas con **Office** → Copilot.

> No se trata de tener la "mejor" IA, sino la que encaja con tus herramientas y tu forma de trabajar.

Lo importante no es la herramienta, sino **para qué la usas**: atender clientes, ahorrar tiempo, vender más. Si quieres, [te ayudamos a elegir y a montarlo](/contacto) según tu caso.`,
    tituloEn: "Gemini, ChatGPT, Claude or Copilot: which one is right for your business?",
    resumenEn:
      "Four AI assistants, four styles. We explain in plain language what each one is good for and how to choose without the headache.",
    contenidoEn: `Artificial intelligence is everywhere in search right now, but with so many names —**ChatGPT, Gemini, Claude, Copilot**— it's easy to get lost. The good news: a small business **doesn't need all of them; it needs the right one** for what you do.

## ChatGPT (OpenAI)
The best known and most versatile. Great for *writing copy*, answering questions, brainstorming and creating images. If you're only going to try one, it's a solid starting point.

## Gemini (Google)
Built into the Google world (Gmail, Docs, Search). Handy if you **already work with Google tools** and want AI where your email and documents already live.

## Claude (Anthropic)
Stands out at writing and reasoning over **long texts** with a natural tone. Excellent for documents, careful summaries and anything where writing quality matters. *(Spoiler: it's who we built much of Espanias with.)*

## Copilot (Microsoft)
AI inside **Word, Excel and Outlook**. If your day runs on Office, it helps without leaving where you already work.

## So which one do I pick?
- You want **something general to start** → ChatGPT.
- You live in **Google** → Gemini.
- You care about **writing quality** and long documents → Claude.
- You work in **Office** → Copilot.

> It's not about having the "best" AI, but the one that fits your tools and the way you work.

What matters isn't the tool, but **what you use it for**: serving customers, saving time, selling more. If you like, [we'll help you choose and set it up](/contacto) for your case.`,
  },
  {
    slug: "mundial-2026-tu-negocio-ia",
    titulo: "El Mundial 2026 también es para tu negocio (y la IA te ayuda a aprovecharlo)",
    resumen:
      "El torneo del año va a llenar bares, tiendas y reservas. Te contamos cómo prepararte —y cómo la IA te quita trabajo— para no dejar pasar la oportunidad.",
    contenido: `El **Mundial 2026** ya es de lo más buscado en España, y eso se traduce en gente con ganas de salir, comprar y celebrar. Para un negocio local —un bar, una tienda, un alojamiento— es una **oportunidad enorme**… si llegas preparado.

## 1. Prepáralo con tiempo
- Una **carta o promoción especial** para los días de partido.
- **Reservas** de mesa o de aforo para los encuentros importantes.
- Horarios ampliados, bien comunicados.

## 2. Deja que la IA te quite trabajo
La IA puede **redactar tus publicaciones** para redes, crear el cartel de la promo, **traducir** tu carta para los turistas que vendrán y montar **reservas por WhatsApp** que se confirman solas.

## 3. Captura al cliente para después
Un Mundial trae clientes nuevos. Aprovecha para **quedarte con su contacto** (una lista de avisos, una tarjeta de fidelización) y que vuelvan cuando acabe el torneo.

> La diferencia entre un buen mes y un mes histórico suele estar en la preparación, no en la suerte.

¿Quieres llegar al Mundial con la web, las reservas y las promos a punto? [Hablemos de tu negocio](/contacto) y lo dejamos listo.`,
    tituloEn: "The 2026 World Cup is for your business too (and AI helps you make the most of it)",
    resumenEn:
      "The event of the year will fill bars, shops and bookings. Here's how to get ready —and how AI takes the work off your hands— so you don't miss out.",
    contenidoEn: `The **2026 World Cup** is already one of the most-searched topics in Spain, and that means people eager to go out, buy and celebrate. For a local business —a bar, a shop, a guesthouse— it's a **huge opportunity**… if you arrive prepared.

## 1. Plan ahead
- A **special menu or promotion** for match days.
- **Bookings** for tables or capacity on the big games.
- Extended opening hours, clearly communicated.

## 2. Let AI take the load
AI can **write your social posts**, design the promo, **translate** your menu for the tourists who'll come, and set up **WhatsApp bookings** that confirm on their own.

## 3. Capture customers for later
A World Cup brings new customers. Use it to **keep their contact** (an updates list, a loyalty card) so they come back when the tournament ends.

> The difference between a good month and a record one is usually preparation, not luck.

Want to reach the World Cup with your website, bookings and promos ready? [Let's talk about your business](/contacto) and we'll get it sorted.`,
  },
  {
    slug: "segunda-mano-wallapop-vinted-tu-tienda",
    titulo: "Wallapop y Vinted arrasan: súbete a la segunda mano con tu propia tienda",
    resumen:
      "La compra de segunda mano está en máximos. Te explicamos por qué y cómo aprovecharla sin depender solo de las plataformas.",
    contenido: `**Wallapop** y **Vinted** están entre lo que más sube en España. La segunda mano ya no es cosa de unos pocos: es **tendencia, ahorro y sostenibilidad** a la vez. Y eso abre una puerta para cualquier negocio.

## Por qué funciona
- **Precio**: la gente busca gastar mejor.
- **Sostenibilidad**: alargar la vida de las cosas convence.
- **Cercanía**: comprar local y de segunda mano gusta.

## El problema de depender solo de plataformas
Vender en Wallapop o Vinted está bien para empezar, pero **las comisiones, las normas y la competencia** las ponen ellas… y los clientes son suyos, no tuyos. Tener **tu propia tienda online** te da marca, datos y margen.

## Dónde entra la IA
La IA puede **escribir las descripciones** de cada producto en segundos, sugerir precios, **traducir** el catálogo y responder dudas de los compradores. Menos trabajo manual, más ventas.

> Plataformas para que te descubran; tu web para que se queden.

Si vendes (o quieres vender) productos —nuevos o de segunda mano— [te montamos tu tienda](/contacto) y la IA que la hace fácil.`,
    tituloEn: "Wallapop and Vinted are booming: ride the second-hand wave with your own shop",
    resumenEn:
      "Second-hand shopping is at an all-time high. Here's why —and how to take advantage without relying only on the platforms.",
    contenidoEn: `**Wallapop** and **Vinted** are among the fastest-rising searches in Spain. Second-hand is no longer niche: it's **trend, savings and sustainability** all at once. And that opens a door for any business.

## Why it works
- **Price**: people want to spend smarter.
- **Sustainability**: extending the life of things sells.
- **Local**: buying nearby and second-hand appeals.

## The problem with relying only on platforms
Selling on Wallapop or Vinted is fine to start, but **the fees, the rules and the competition** are set by them… and the customers are theirs, not yours. Having **your own online shop** gives you brand, data and margin.

## Where AI comes in
AI can **write each product description** in seconds, suggest prices, **translate** the catalogue and answer buyers' questions. Less manual work, more sales.

> Platforms to get discovered; your website to make them stay.

If you sell (or want to sell) products —new or second-hand— [we'll build your shop](/contacto) and the AI that makes it easy.`,
  },
  {
    slug: "ia-renta-citas-papeleo",
    titulo: "Renta, citas y papeleo: deja que la IA haga el trabajo aburrido",
    resumen:
      "Trámites, presupuestos, recordatorios… el papeleo se come tus horas. Te contamos qué puedes automatizar hoy mismo con IA.",
    contenido: `Cada año, búsquedas como **renta**, **AEAT** o **seguridad social** se disparan: el papeleo nos persigue a todos. En un negocio, esas tareas administrativas son **horas que no dedicas a tus clientes**. La IA puede encargarse de buena parte.

## Lo que ya puedes automatizar
- **Presupuestos y facturas**: a partir de cuatro datos, la IA redacta el documento.
- **Recordatorios**: de citas, pagos o renovaciones, automáticos por email o WhatsApp.
- **Respuestas frecuentes**: un asistente que contesta lo de siempre por ti.
- **Resúmenes**: de correos largos, contratos o reuniones.

## Lo que NO debes automatizar a ciegas
Las decisiones fiscales o legales **importantes** siguen necesitando a un profesional. La IA te **prepara y ordena** el trabajo; el criterio final es humano.

> Automatiza lo repetitivo para tener tiempo para lo que de verdad importa.

¿Cuánto tiempo pierdes al mes en papeleo? [Cuéntanoslo](/contacto) y vemos qué se puede automatizar en tu caso.`,
    tituloEn: "Tax returns, appointments and paperwork: let AI do the boring work",
    resumenEn:
      "Admin, quotes, reminders… paperwork eats your hours. Here's what you can automate today with AI.",
    contenidoEn: `Every year, searches like **tax return**, **tax office** or **social security** spike: paperwork follows us all. In a business, those admin tasks are **hours you're not spending on your customers**. AI can handle a big chunk of it.

## What you can already automate
- **Quotes and invoices**: from a few details, AI drafts the document.
- **Reminders**: for appointments, payments or renewals, automatically by email or WhatsApp.
- **Frequent answers**: an assistant that replies to the usual questions for you.
- **Summaries**: of long emails, contracts or meetings.

## What you should NOT automate blindly
**Important** tax or legal decisions still need a professional. AI **prepares and organises** the work; the final judgement is human.

> Automate the repetitive so you have time for what really matters.

How many hours a month do you lose to paperwork? [Tell us](/contacto) and we'll see what can be automated in your case.`,
  },
  {
    slug: "web-que-traduce-sola-turistas-ia",
    titulo: "Tu web que traduce sola: atrae al turista con IA",
    resumen:
      "Si tu negocio vive del turismo, una web en varios idiomas ya no es un lujo. Te contamos cómo hacerlo fácil con IA.",
    contenido: `**Traductor** y **traductor inglés** están entre lo más buscado en España, y no es casualidad: vienen millones de turistas y **buscan en su idioma**. Si tu web solo está en español, te están encontrando a medias.

## Por qué una web multilingüe vende más
- El turista **confía** en lo que entiende.
- Apareces en **búsquedas en otros idiomas**.
- Reservas y pedidos sin barreras.

## Cómo lo hace fácil la IA
La IA puede **traducir tu web y tu carta** de forma natural (no el típico traductor robótico), mantener las versiones al día y hasta **atender en varios idiomas** por chat. Tú escribes una vez; la IA se encarga del resto.

> No vendes solo a quien habla tu idioma: vendes a quien te entiende.

Esta misma web que estás leyendo es bilingüe. Si la tuya aún no lo es, [te ayudamos](/contacto) a abrir tu negocio al cliente internacional.`,
    tituloEn: "A website that translates itself: attract tourists with AI",
    resumenEn:
      "If your business lives on tourism, a multilingual website is no longer a luxury. Here's how to make it easy with AI.",
    contenidoEn: `**Translator** and **English translator** are among the most-searched terms in Spain, and it's no accident: millions of tourists arrive and **search in their own language**. If your website is only in Spanish, they're only half-finding you.

## Why a multilingual website sells more
- Tourists **trust** what they understand.
- You show up in **searches in other languages**.
- Bookings and orders with no barriers.

## How AI makes it easy
AI can **translate your website and menu** naturally (not the usual robotic translator), keep the versions up to date and even **handle chat in several languages**. You write once; AI does the rest.

> You don't only sell to those who speak your language: you sell to those who understand you.

This very website you're reading is bilingual. If yours isn't yet, [we'll help you](/contacto) open your business to international customers.`,
  },
];

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("token") !== TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const created: string[] = [];
  try {
    await ensurePostsTable();
    for (const p of POSTS) {
      await db.execute(sql`
        INSERT INTO posts (slug, titulo, resumen, contenido, titulo_en, resumen_en, contenido_en, publicado)
        VALUES (${p.slug}, ${p.titulo}, ${p.resumen}, ${p.contenido}, ${p.tituloEn}, ${p.resumenEn}, ${p.contenidoEn}, 0)
        ON CONFLICT (slug) DO NOTHING
      `);
      created.push(p.slug);
    }
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e), created },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, created });
}
