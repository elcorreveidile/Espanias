import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { ensurePostsTable } from "@/lib/db/ensure-schema";

// Endpoint TEMPORAL: inserta el primer artículo del blog como BORRADOR
// (publicado=0). El admin solo tiene que revisarlo y darle a Publicar.
// Idempotente (no duplica). Borrar tras usarlo.
export const dynamic = "force-dynamic";

const TOKEN = "espanias-seedpost-2026";

const SLUG = "ia-pequeno-negocio";
const TITULO = "Cómo la inteligencia artificial puede ayudar a tu pequeño negocio";
const RESUMEN =
  "No hace falta ser una gran empresa para aprovechar la IA. Te contamos, con ejemplos reales, cómo puede ahorrarte tiempo y conseguirte más clientes.";
const CONTENIDO = `La inteligencia artificial dejó de ser cosa de grandes empresas. Hoy, **un pequeño negocio puede usarla para ahorrar horas de trabajo y atender mejor a sus clientes**, normalmente con herramientas sencillas y a un coste muy razonable.

En *Espanias* construimos proyectos reales con esta idea: tecnología con propósito, sin humo. Aquí van algunas formas concretas en las que la IA puede marcar la diferencia.

## 1. Atender a tus clientes a cualquier hora

Un asistente conversacional puede **responder preguntas frecuentes, dar tu horario o reservar una cita** por WhatsApp o por la web, también de madrugada. Tú te despiertas con la agenda llena, sin haber tocado el teléfono.

## 2. Ahorrar tiempo en tareas repetitivas

La IA es buenísima en lo aburrido:

- Redactar **presupuestos** y correos a partir de cuatro datos.
- Resumir las **opiniones** de tus clientes y detectar qué mejorar.
- Preparar publicaciones para redes o **traducir** tu web para turistas.

Cada una de esas tareas son minutos que recuperas cada día.

## 3. Tomar mejores decisiones

Con la información que ya tienes (reservas, ventas, mensajes), la IA puede ayudarte a ver **patrones**: qué días vendes más, qué servicio se pide poco, dónde estás perdiendo clientes. Decidir con datos, no a ojo.

> No se trata de cambiarlo todo de golpe, sino de dar un primer paso práctico que ya note tu negocio.

## ¿Por dónde empezar?

Lo más sensato es **empezar pequeño**: elige *una* tarea que te quite tiempo y automatízala. A partir de ahí, se va ampliando.

Si quieres, lo vemos juntos sin compromiso. [Cuéntanos tu caso](/contacto) y te decimos, con sinceridad, en qué puede ayudarte la IA… y en qué no.`;

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("token") !== TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    await ensurePostsTable();
    await db.execute(sql`
      INSERT INTO posts (slug, titulo, resumen, contenido, publicado)
      VALUES (${SLUG}, ${TITULO}, ${RESUMEN}, ${CONTENIDO}, 0)
      ON CONFLICT (slug) DO NOTHING
    `);
    return NextResponse.json({ ok: true, slug: SLUG, estado: "borrador" });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
