import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { ensurePostsTable } from "@/lib/db/ensure-schema";

// Endpoint TEMPORAL: añade la versión en inglés al primer artículo del blog.
// Idempotente. Borrar tras usarlo.
export const dynamic = "force-dynamic";

const TOKEN = "espanias-translatepost-2026";

const SLUG = "ia-pequeno-negocio";
const TITULO_EN = "How artificial intelligence can help your small business";
const RESUMEN_EN =
  "You don't need to be a big company to take advantage of AI. We show you, with real examples, how it can save you time and win you more customers.";
const CONTENIDO_EN = `Artificial intelligence is no longer just for big companies. Today, **a small business can use it to save hours of work and serve its customers better**, usually with simple tools and at a very reasonable cost.

At *Espanias* we build real projects with this idea in mind: technology with purpose, no hype. Here are a few concrete ways AI can make a difference.

## 1. Serve your customers around the clock

A conversational assistant can **answer frequent questions, share your opening hours or book an appointment** via WhatsApp or your website, even in the middle of the night. You wake up with a full diary without having touched the phone.

## 2. Save time on repetitive tasks

AI is great at the boring stuff:

- Drafting **quotes** and emails from just a few details.
- Summarising customer **reviews** and spotting what to improve.
- Preparing social media posts or **translating** your website for tourists.

Each of those tasks is minutes you get back every day.

## 3. Make better decisions

With the information you already have (bookings, sales, messages), AI can help you see **patterns**: which days you sell the most, which service is rarely requested, where you're losing customers. Decide with data, not by guesswork.

> It's not about changing everything at once, but about taking a first practical step that your business will already notice.

## Where to start?

The smartest thing is to **start small**: pick *one* task that eats your time and automate it. From there, you expand.

If you'd like, let's look at it together, no strings attached. [Tell us about your case](/contacto) and we'll tell you, honestly, where AI can help you… and where it can't.`;

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("token") !== TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    await ensurePostsTable();
    await db.execute(sql`
      UPDATE posts SET
        titulo_en = ${TITULO_EN},
        resumen_en = ${RESUMEN_EN},
        contenido_en = ${CONTENIDO_EN},
        updated_at = now()
      WHERE slug = ${SLUG}
    `);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
