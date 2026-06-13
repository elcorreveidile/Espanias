import { db } from "./client";
import { projects, users } from "./schema";

async function seed() {
  console.log("🌱 Iniciando siembra de datos...");

  try {
    // Usuario admin
    await db.insert(users).values({
      email: "javier@espanias.com",
      nombre: "Javier Benítez",
      rol: "admin",
    });
    console.log("✅ Usuario admin creado");

    // Perruquería
    await db.insert(projects).values({
      slug: "perruqueria-canina",
      nombre: "Perruquería Canina Realejo",
      claim: "Peluquería canina en positivo",
      sector: "servicios-personales",
      estado: "hecho",
      backend: "supabase",
      demoUrl: "https://perruqueria-realejo-demo.vercel.app",
    });
    console.log("✅ Perruquería creada");

    // Fisioterapia
    await db.insert(projects).values({
      slug: "eje-fisioterapia",
      nombre: "Eje Fisioterapia",
      claim: "Entiende tu dolor",
      sector: "salud",
      estado: "hecho",
      backend: "neon",
      orm: "drizzle",
    });
    console.log("✅ Fisioterapia creada");

    // 23 proyectos planeados
    const proximosPorConstructor = [
      { slug: "barberia", nombre: "Barbería", sector: "servicios-personales" },
      { slug: "restaurante", nombre: "Restaurante", sector: "hosteleria" },
      { slug: "clinica-fisioterapia", nombre: "Clínica de Fisioterapia", sector: "salud" },
      { slug: "psicologia", nombre: "Consulta de Psicología", sector: "salud" },
      { slug: "veterinaria", nombre: "Veterinaria", sector: "salud" },
      { slug: "abogados", nombre: "Despacho de Abogados", sector: "derecho" },
      { slug: "gestoria", nombre: "Gestoría", sector: "derecho" },
      { slug: "inmobiliaria", nombre: "Inmobiliaria", sector: "inmobiliaria" },
      { slug: "reformas", nombre: "Empresa de Reformas", sector: "construccion" },
      { slug: "casa-rural", nombre: "Casa Rural", sector: "hosteleria" },
      { slug: "aceite-oliva", nombre: "E-commerce Aceite", sector: "hosteleria" },
      { slug: "pasteleria", nombre: "Pastelería", sector: "hosteleria" },
      { slug: "fruteria", nombre: "Frutería", sector: "comercio" },
      { slug: "ceramica", nombre: "Cerámica Artesanal", sector: "artesania" },
      { slug: "libreria", nombre: "Librería", sector: "comercio" },
      { slug: "marketplace", nombre: "Marketplace Artesanos", sector: "comercio" },
      { slug: "gimnasio", nombre: "Gimnasio", sector: "deporte" },
      { slug: "entrenador", nombre: "Entrenador Personal", sector: "deporte" },
      { slug: "conciertos", nombre: "Sala de Conciertos", sector: "eventos" },
      { slug: "fotografia", nombre: "Fotógrafo", sector: "eventos" },
      { slug: "wedding", nombre: "Wedding Planner", sector: "eventos" },
      { slug: "academia", nombre: "Academia de Música", sector: "educacion" },
      { slug: "facturador", nombre: "Facturador", sector: "saas" },
    ];

    for (const proyecto of proximosPorConstructor) {
      await db.insert(projects).values({
        slug: proyecto.slug,
        nombre: proyecto.nombre,
        sector: proyecto.sector,
        estado: "planeado",
      });
    }
    console.log(`✅ ${proximosPorConstructor.length} proyectos planeados`);

    console.log("\n✨ Siembra completada");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

seed();
