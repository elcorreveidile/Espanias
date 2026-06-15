import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db/client";

// Endpoint TEMPORAL: convierte las fichas de relleno (proyecto-16..25) en ideas
// de apps reales (estado "idea") en la base de datos de producción.
// Idempotente: actualiza por el slug antiguo o el nuevo. Borrar tras usarlo.
export const dynamic = "force-dynamic";

const TOKEN = "espanias-ideas-2026";

const IDEAS = [
  { old: "proyecto-16", slug: "resenas-plus", nombre: "Reseñas+", cat: "comercio",
    es: "Centraliza las reseñas de Google y redes en un único panel y responde más rápido con borradores sugeridos por IA. Más reputación local con menos esfuerzo.",
    en: "Brings your Google and social reviews into one dashboard and helps you reply faster with AI-suggested drafts. More local reputation, less effort." },
  { old: "proyecto-17", slug: "carta-viva", nombre: "Carta Viva", cat: "hosteleria",
    es: "Carta digital por QR con fotos, alérgenos y un recomendador con IA. Traducción automática para turistas y cambios de precios al instante.",
    en: "QR digital menu with photos, allergens and an AI recommender. Automatic translation for tourists and instant price updates." },
  { old: "proyecto-18", slug: "presu-ia", nombre: "Presu IA", cat: "saas",
    es: "Presupuestos profesionales en minutos para autónomos: la IA redacta los conceptos y sugiere precios a partir de una breve descripción.",
    en: "Professional quotes in minutes for freelancers: AI drafts the line items and suggests prices from a short description." },
  { old: "proyecto-19", slug: "turno-claro", nombre: "TurnoClaro", cat: "gestion",
    es: "Cuadrantes y turnos para equipos pequeños, con avisos automáticos y cambios entre compañeros sin llamadas ni hojas de cálculo.",
    en: "Shifts and rotas for small teams, with automatic reminders and swaps between coworkers — no calls or spreadsheets." },
  { old: "proyecto-20", slug: "voz-cliente", nombre: "VozCliente", cat: "saas",
    es: "Encuestas de satisfacción por WhatsApp tras cada servicio y un panel que resume las opiniones con IA para detectar qué mejorar.",
    en: "Post-service satisfaction surveys via WhatsApp and a dashboard that summarises feedback with AI to spot what to improve." },
  { old: "proyecto-21", slug: "raices", nombre: "Raíces", cat: "personal",
    es: "Crea la biografía o el libro de recuerdos de tu familia conversando con una IA que entrevista, ordena las historias y las maqueta.",
    en: "Create your family's biography or memory book by talking to an AI that interviews, organises the stories and lays them out." },
  { old: "proyecto-22", slug: "anfitrion-ia", nombre: "Anfitrión IA", cat: "otros",
    es: "Guía digital para alojamientos turísticos: normas de la casa, recomendaciones del barrio y un chat con IA que responde a los huéspedes 24/7.",
    en: "Digital guide for holiday rentals: house rules, neighbourhood tips and an AI chat that answers guests 24/7." },
  { old: "proyecto-23", slug: "mercado-local", nombre: "MercadoLocal", cat: "comercio",
    es: "Tienda online compartida para el comercio de un barrio o pueblo, con catálogo común, recogida en tienda y reparto local.",
    en: "Shared online shop for a neighbourhood's local stores, with a common catalogue, in-store pickup and local delivery." },
  { old: "proyecto-24", slug: "cuida-mayores", nombre: "CuidaMayores", cat: "salud",
    es: "Coordina en familia el cuidado de un mayor: medicación, citas médicas y turnos, con recordatorios y un historial compartido.",
    en: "Coordinate eldercare as a family: medication, medical appointments and shifts, with reminders and a shared history." },
  { old: "proyecto-25", slug: "evento-facil", nombre: "EventoFácil", cat: "eventos",
    es: "Web para tu evento con invitaciones, confirmaciones de asistencia (RSVP), información práctica y galería de fotos compartida.",
    en: "A website for your event with invitations, RSVPs, practical info and a shared photo gallery." },
];

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("token") !== TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const updated: string[] = [];
  try {
    for (const i of IDEAS) {
      await db.execute(sql`
        UPDATE projects SET
          slug = ${i.slug},
          nombre = ${i.nombre},
          category = ${i.cat},
          estado = 'idea',
          descripcion_es = ${i.es},
          descripcion_en = ${i.en},
          url = '',
          demo_url = NULL,
          updated_at = now()
        WHERE slug IN (${i.old}, ${i.slug})
      `);
      updated.push(i.slug);
    }
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e), updated },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, updated });
}
