import { NextRequest, NextResponse } from "next/server";
import {
  getPost,
  createPost,
  updatePost,
  type PostInput,
} from "@/lib/db/posts-repo";
import { checkAdminToken } from "@/lib/admin-token";

// Endpoint TEMPORAL: publica (upsert) el artículo del Mundial en la BD.
// Abrir una vez con ?token=... tras el deploy. Borrar después.
export const dynamic = "force-dynamic";

const CONTENIDO_ES = `## Esta madrugada arranca el reto: que España nos haga la web más barata (o gratis)

A las **02:00 de la madrugada del viernes** (hora peninsular), España se juega el Mundial 2026 contra Uruguay en Guadalajara. De madrugada, con los bares y las calles a reventar pese a la hora: **ambientazo asegurado**. Y nosotros nos sumamos con un reto que pone a la Roja a jugar… **por tu web**.

## ⚽ El reto: cuanto más gana España, menos pagas

> **Por cada partido que España gane en el Mundial, baja el precio de tu web.**
> **Si España se proclama campeona del Mundo, tu web es GRATIS.**

| Lo que haga España | Tu descuento |
|---|---|
| Gana esta madrugada a Uruguay | **15%** |
| Cada siguiente victoria | **+15%** (acumulable) |
| **Campeona del Mundo** | **100% → web GRATIS** |

Descuento aplicable a una web profesional a medida con [Por 2 Duros](https://www.por2duros.com), nuestro estudio de desarrollo. Acumulable hasta el 100%.

## Cómo entrar

1. **Apúntate ahora**, durante el Mundial: escríbenos por [contacto](/contacto) con la palabra **MUNDIAL**, tu nombre y tu email.
2. **Tu descuento sube solo** con cada victoria de España, desde esta misma madrugada.
3. Cuando quieras tu web, aplicas el descuento acumulado. Y si España es campeona… invita la casa.

## ¿Por qué hacemos esto?

Porque **España está, literalmente, en nuestro nombre**. Léelo despacio: **Espa + Ñ + IA = España + Inteligencia Artificial**. Pasa el cursor por la **N** de nuestro logo… y aparece la **Ñ**. Esa letra que solo es nuestra es el puente entre la **creatividad española** y la **inteligencia artificial**.

España llega líder (4-0 a Arabia Saudí); Uruguay, segundo, va a por todas. Nosotros ya estamos animando: **cada victoria de la Roja es un poco más barata tu web**.

## Brindamos por la Victoria (la de España… y la de Málaga)

Esta noche, "Victoria" tiene doble sentido. Está la victoria de la Roja… y está **Cervezas Victoria**, la cervecera **malagueña** que es la cerveza oficial de la selección española en este Mundial. ¿Y sabes qué? Nuestro estudio de desarrollo también es **de Málaga**. Pura tierra.

Así que esta madrugada brindamos doble: por la **Victoria** que abarata tu web y por la que se toma bien fría viendo el partido. Imagínatelo: España campeona, una Victoria en la mano y tu web nueva, gratis. **Apostamos por la Victoria.** 🍺

👉 Mira [lo que hacemos](/catalogo) mientras esperas el pitido.

🎯 **¿Te atreves?** Marca tu penalti y rasca tu cupón en **[Mundial 2026](/mundial)**.

**¡Vamos, España! 🇪🇸**

---

*Bases rápidas: promoción válida durante el Mundial 2026. Descuento acumulable por cada victoria de España hasta el 100% (web gratis únicamente si España se proclama campeona). Aplicable a una web a medida (landing / one-page); detalles finales acordados con cada participante. Una participación por persona.*`;

const CONTENIDO_EN = `## Tonight the challenge kicks off: let Spain make your website cheaper (or free)

At **2:00 a.m. on Friday** (Spanish peninsular time), Spain face Uruguay at the 2026 World Cup in Guadalajara. In the middle of the night, with bars and streets packed despite the hour: **an unbeatable atmosphere**. And we're joining the party with a challenge that puts *La Roja* to play… **for your website**.

## ⚽ The challenge: the more Spain wins, the less you pay

> **For every match Spain wins at the World Cup, the price of your website drops.**
> **If Spain becomes World Champion, your website is FREE.**

| What Spain does | Your discount |
|---|---|
| Beats Uruguay tonight | **15%** |
| Each further win | **+15%** (stackable) |
| **World Champion** | **100% → FREE website** |

Discount applies to a custom professional website with [Por 2 Duros](https://www.por2duros.com), our development studio. Stackable up to 100%.

## How to join

1. **Sign up now**, during the World Cup: message us via [contact](/contacto) with the word **MUNDIAL**, your name and your email.
2. **Your discount grows on its own** with every Spain win, starting tonight.
3. Whenever you want your website, you apply the accumulated discount. And if Spain are champions… it's on us.

## Why are we doing this?

Because **Spain is, quite literally, in our name**. Read it slowly: **Espa + Ñ + IA = España (Spain) + Artificial Intelligence**. Hover over the **N** in our logo… and the **Ñ** appears. That letter that is uniquely ours is the bridge between **Spanish creativity** and **artificial intelligence**.

Spain top the group (4-0 vs Saudi Arabia); Uruguay, second, will go all in. We're already cheering: **every Spain win makes your website a little cheaper**.

## We're betting on Victoria (Spain's win… and Málaga's beer)

Tonight, "Victoria" has a double meaning. There's *La Roja*'s victory… and there's **Cervezas Victoria**, the **Málaga** brewery that is the official beer of the Spanish national team at this World Cup. And guess what? Our development studio is **from Málaga** too. Same soil.

So tonight we're toasting twice: to the **Victoria** that makes your website cheaper, and to the one you drink ice-cold watching the match. Picture it: Spain champions, a Victoria in hand and your brand-new website, free. **We're betting on Victoria.** 🍺

👉 See [what we do](/catalogo) while you wait for kick-off.

🎯 **Dare to play?** Score your penalty and scratch your coupon at **[World Cup 2026](/mundial)**.

**Vamos, España! 🇪🇸**

---

*Quick terms: promotion valid during the 2026 World Cup. Discount stackable per Spain win up to 100% (free website only if Spain become champions). Applies to a custom website (landing / one-page); final details agreed with each participant. One entry per person.*`;

const POST: PostInput = {
  slug: "mundial-2026-espana-descuento-web-gratis",
  titulo: "Cuanto más gana España, menos cuesta tu web (y si es campeona, gratis)",
  resumen:
    "Esta madrugada España se juega el Mundial contra Uruguay (02:00 h). Lanzamos un reto: por cada partido que gane España, tu web con nosotros cuesta menos. Y si se proclama campeona del Mundo, te la regalamos. Porque España está, literalmente, en nuestro nombre.",
  contenido: CONTENIDO_ES,
  tituloEn:
    "The more Spain wins, the cheaper your website (and if they're champions, it's free)",
  resumenEn:
    "Tonight Spain face Uruguay at the World Cup (2:00 a.m. CET). We're launching a challenge: for every match Spain wins, your website with us costs less. And if they become World Champions, it's on us. Because Spain is, literally, in our name.",
  contenidoEn: CONTENIDO_EN,
  portadaUrl: "/blog/espana-uruguay-mundial.webp",
  publicado: 1,
};

export async function GET(req: NextRequest) {
  if (!checkAdminToken(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const existing = await getPost(POST.slug);
    if (existing) {
      await updatePost(POST.slug, POST);
    } else {
      await createPost(POST);
    }
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, slug: POST.slug, action: "published" });
}
