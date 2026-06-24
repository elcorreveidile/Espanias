export type Category = 'ia' | 'educacion' | 'literatura' | 'personal' | 'salud' | 'derecho' | 'inmobiliaria' | 'hosteleria' | 'comercio' | 'deporte' | 'eventos' | 'saas' | 'gestion' | 'mascotas' | 'belleza' | 'otros'

export interface Project {
  id: string
  name: string
  slug: string
  url: string
  description: { es: string; en: string }
  category: Category
  status: 'idea' | 'planeado' | 'desarrollo' | 'hecho'
  demo?: string
  sector?: string
  image?: string
}

export const categoryColors: Record<Category, string> = {
  ia: '#6D28D9',
  educacion: '#0369A1',
  literatura: '#B45309',
  personal: '#065F46',
  salud: '#DC2626',
  derecho: '#7C3AED',
  inmobiliaria: '#0891B2',
  hosteleria: '#EA580C',
  comercio: '#059669',
  deporte: '#D97706',
  eventos: '#DB2777',
  saas: '#1D4ED8',
  gestion: '#0F766E',
  mascotas: '#65A30D',
  belleza: '#C026D3',
  otros: '#78716C',
}

export const projects: Project[] = [
  // ============================================
  // 25 PROYECTOS COMPLETADOS
  // ============================================

  // SERVICIOS PERSONALES
  {
    id: 'perruqueria-canina',
    name: 'Perruquería Canina Realejo',
    slug: 'perruqueria-canina',
    url: 'https://perruqueria.vercel.app',
    image: '/projects/perruqueria-canina.webp',
    category: 'mascotas',
    status: 'hecho',
    sector: 'servicios-personales',
    description: {
      es: 'Plataforma de reservas para peluquería canina en Granada. Sistema de citas online, confirmación automática por email, y gestión de clientes con historial de visitas.',
      en: 'Dog grooming booking platform in Granada. Online appointment system, automatic email confirmations, and customer management with visit history.',
    },
  },

  {
    id: 'eje-fisioterapia',
    name: 'Eje Fisioterapia',
    slug: 'eje-fisioterapia',
    url: 'https://fisioterapia-henna.vercel.app',
    image: '/projects/eje-fisioterapia.webp',
    category: 'salud',
    status: 'hecho',
    sector: 'salud',
    description: {
      es: 'Clínica de fisioterapia con sistema de reservas, planes de tratamiento personalizados, y seguimiento de evolución del paciente.',
      en: 'Physiotherapy clinic with booking system, personalized treatment plans, and patient progress tracking.',
    },
  },

  {
    id: 'clinica-dental',
    name: 'Clínica Dental',
    slug: 'clinica-dental',
    url: '',
    category: 'salud',
    status: 'hecho',
    sector: 'salud',
    description: {
      es: 'Clínica dental con presupuestos online interactivos, galería antes/después, y sistema de reservas por especialista.',
      en: 'Dental clinic with interactive online quotes, before/after gallery, and specialist-based booking system.',
    },
  },

  // EDUCACIÓN E INSTITUCIONAL
  {
    id: 'comite-clm',
    name: 'Comité CLM',
    slug: 'comite-clm',
    url: 'https://www.comiteclm.com',
    demo: 'https://comite-clm-demo.vercel.app',
    category: 'gestion',
    status: 'hecho',
    sector: 'institucional',
    description: {
      es: 'Web del comité de empresa del Centro de Lenguas Modernas de la Universidad de Granada. Información sindical, convenios y comunicaciones internas.',
      en: 'Workers\' committee website for the Modern Languages Centre at the University of Granada. Union information, agreements and internal communications.',
    },
  },

  {
    id: 'mm',
    name: 'Mariano Maresca',
    slug: 'mariano-maresca',
    url: 'https://www.marianomaresca.com',
    demo: 'https://mm-demo.vercel.app',
    category: 'literatura',
    status: 'hecho',
    sector: 'cultural',
    description: {
      es: 'Exposición digital conmemorativa del editor y figura cultural andaluza Mariano Maresca (1945–2023). Catálogo de sus obras y legado literario.',
      en: 'Digital commemorative exhibition honouring Andalusian cultural editor Mariano Maresca (1945–2023). Catalogue of his works and literary legacy.',
    },
  },

  {
    id: 'ia-ele-course',
    name: 'IA para ELE',
    slug: 'ia-ele-course',
    url: 'https://iaele.es',
    demo: 'https://ia-ele-demo.vercel.app',
    category: 'ia',
    status: 'hecho',
    sector: 'educacion',
    description: {
      es: 'Plataforma de formación en inteligencia artificial para profesores de español. Módulos sobre prompts, chatbots custom, MCER, y recursos multimodales.',
      en: 'AI training platform for Spanish language teachers. Modules on prompts, custom chatbots, CEFR alignment, and multimodal resources.',
    },
  },

  {
    id: 'costa-companion',
    name: 'Costa Companion',
    slug: 'costa-companion',
    url: 'https://costacompanion.com',
    demo: 'https://costa-companion-demo.vercel.app',
    category: 'personal',
    status: 'hecho',
    sector: 'turismo',
    description: {
      es: 'Plataforma multilingüe de acompañamiento lingüístico para la Costa del Sol. Conecta turistas con acompañantes locales para mejorar su español.',
      en: 'Multilingual linguistic accompaniment platform for the Costa del Sol. Connects tourists with local companions to improve their Spanish.',
    },
  },

  {
    id: 'makicar',
    name: 'MakiCar',
    slug: 'makicar',
    url: 'https://makicar.app',
    demo: 'https://makicar-demo.vercel.app',
    category: 'saas',
    status: 'hecho',
    sector: 'transporte',
    description: {
      es: 'PWA para reserva de transporte compartido. Cálculo dinámico de tarifas, sistema de pre-autorización, y gestión de viajes.',
      en: 'PWA for shared transport booking. Dynamic fare calculation, pre-authorization system, and trip management.',
    },
  },

  {
    id: 'versovivo',
    name: 'VersoVivo',
    slug: 'versovivo',
    url: 'https://versovivo.ai',
    demo: 'https://versovivo-demo.vercel.app',
    category: 'literatura',
    status: 'hecho',
    sector: 'cultura',
    description: {
      es: 'Antología interactiva de poesía española con análisis literario asistido por IA. Selección de obras comentadas y recursos educativos.',
      en: 'Interactive anthology of Spanish poetry with AI-assisted literary analysis. Curated works with commentary and educational resources.',
    },
  },

  {
    id: 'olvidos-granada',
    name: 'Olvidos de Granada',
    slug: 'olvidos-granada',
    url: 'https://olvidosdegranada.es',
    demo: 'https://olvidos-granada-demo.vercel.app',
    category: 'literatura',
    status: 'hecho',
    sector: 'cultural',
    description: {
      es: 'Revista digital de literatura y cultura de Granada. Publicación de artículos, reseñas, entrevistas y obras de autores granadinos.',
      en: 'Digital literary and cultural magazine of Granada. Publishing articles, reviews, interviews and works by Granada-based authors.',
    },
  },

  {
    id: 'clase-digital-main',
    name: 'La Clase Digital',
    slug: 'clase-digital-main',
    url: 'https://laclasedigital.com',
    demo: 'https://clase-digital-demo.vercel.app',
    category: 'educacion',
    status: 'hecho',
    sector: 'educacion',
    description: {
      es: 'Plataforma educativa para ELE (Español como Lengua Extranjera) con recursos, lecciones interactivas y formación de profesores.',
      en: 'Educational platform for Spanish as a Foreign Language with resources, interactive lessons and teacher training.',
    },
  },

  {
    id: 'poedrónomo',
    name: 'Poedrónomo',
    slug: 'poedronomo',
    url: 'https://poedronomo.com',
    demo: 'https://poedronomo-demo.vercel.app',
    category: 'literatura',
    status: 'hecho',
    sector: 'literatura',
    description: {
      es: 'Plataforma de publicación y venta de obras de poesía. Catálogo de libros, descarga digital, e interacción con lectores.',
      en: 'Publishing and sales platform for poetry collections. Book catalog, digital downloads, and reader engagement.',
    },
  },

  {
    id: 'diente-oro',
    name: 'Asociación Cultural Diente de Oro',
    slug: 'diente-oro',
    url: 'https://dientedeoro.es',
    demo: 'https://diente-oro-demo.vercel.app',
    category: 'personal',
    status: 'hecho',
    sector: 'cultural',
    description: {
      es: 'Sitio web de la asociación cultural con información de eventos, actividades, membresía y calendario de programación cultural.',
      en: 'Website of the cultural association with event information, activities, membership and cultural programming calendar.',
    },
  },

  {
    id: 'espanias-main',
    name: 'Espanias',
    slug: 'espanias-main',
    url: 'https://espanias.com',
    demo: 'https://espanias-demo.vercel.app',
    category: 'saas',
    status: 'hecho',
    sector: 'saas',
    description: {
      es: 'Portfolio de web apps rápidas y profesionales. Catálogo de 50 aplicaciones, dashboard de gestión y sistema de componentes reutilizables.',
      en: 'Portfolio of fast and professional web apps. Catalog of 50 applications, management dashboard and reusable component system.',
    },
  },

  {
    id: 'branding-javier',
    name: 'Javier Benítez — Personal',
    slug: 'javier-benitez',
    url: 'https://javier.soy',
    demo: 'https://javier-benitez-demo.vercel.app',
    category: 'personal',
    status: 'hecho',
    sector: 'personal',
    description: {
      es: 'Sitio personal de Javier Benítez. Profesor de ELE, poeta, desarrollador web y empresario cultural.',
      en: 'Personal website of Javier Benítez. Spanish language teacher, poet, web developer and cultural entrepreneur.',
    },
  },

  {
    id: 'makilibre',
    name: 'MakiLibre',
    slug: 'makilibre',
    url: 'https://makilibre.app',
    demo: 'https://makilibre-demo.vercel.app',
    category: 'saas',
    status: 'hecho',
    sector: 'saas',
    description: {
      es: 'Herramienta open-source de gestión de transporte colaborativo. API pública y SDK para integración.',
      en: 'Open-source collaborative transport management tool. Public API and SDK for integration.',
    },
  },

  // Ideas de apps que aún no están en el catálogo (en exploración).
  {
    id: 'resenas-plus',
    name: 'Reseñas+',
    slug: 'resenas-plus',
    url: '',
    category: 'comercio',
    status: 'idea',
    description: {
      es: 'Centraliza las reseñas de Google y redes en un único panel y responde más rápido con borradores sugeridos por IA. Más reputación local con menos esfuerzo.',
      en: 'Brings your Google and social reviews into one dashboard and helps you reply faster with AI-suggested drafts. More local reputation, less effort.',
    },
  },

  {
    id: 'carta-viva',
    name: 'Carta Viva',
    slug: 'carta-viva',
    url: '',
    category: 'hosteleria',
    status: 'idea',
    description: {
      es: 'Carta digital por QR con fotos, alérgenos y un recomendador con IA. Traducción automática para turistas y cambios de precios al instante.',
      en: 'QR digital menu with photos, allergens and an AI recommender. Automatic translation for tourists and instant price updates.',
    },
  },

  {
    id: 'presu-ia',
    name: 'Presu IA',
    slug: 'presu-ia',
    url: '',
    category: 'saas',
    status: 'idea',
    description: {
      es: 'Presupuestos profesionales en minutos para autónomos: la IA redacta los conceptos y sugiere precios a partir de una breve descripción.',
      en: 'Professional quotes in minutes for freelancers: AI drafts the line items and suggests prices from a short description.',
    },
  },

  {
    id: 'turno-claro',
    name: 'TurnoClaro',
    slug: 'turno-claro',
    url: '',
    category: 'gestion',
    status: 'idea',
    description: {
      es: 'Cuadrantes y turnos para equipos pequeños, con avisos automáticos y cambios entre compañeros sin llamadas ni hojas de cálculo.',
      en: 'Shifts and rotas for small teams, with automatic reminders and swaps between coworkers — no calls or spreadsheets.',
    },
  },

  {
    id: 'voz-cliente',
    name: 'VozCliente',
    slug: 'voz-cliente',
    url: '',
    category: 'saas',
    status: 'idea',
    description: {
      es: 'Encuestas de satisfacción por WhatsApp tras cada servicio y un panel que resume las opiniones con IA para detectar qué mejorar.',
      en: 'Post-service satisfaction surveys via WhatsApp and a dashboard that summarises feedback with AI to spot what to improve.',
    },
  },

  {
    id: 'raices',
    name: 'Raíces',
    slug: 'raices',
    url: '',
    category: 'personal',
    status: 'idea',
    description: {
      es: 'Crea la biografía o el libro de recuerdos de tu familia conversando con una IA que entrevista, ordena las historias y las maqueta.',
      en: "Create your family's biography or memory book by talking to an AI that interviews, organises the stories and lays them out.",
    },
  },

  {
    id: 'anfitrion-ia',
    name: 'Anfitrión IA',
    slug: 'anfitrion-ia',
    url: '',
    category: 'otros',
    status: 'idea',
    description: {
      es: 'Guía digital para alojamientos turísticos: normas de la casa, recomendaciones del barrio y un chat con IA que responde a los huéspedes 24/7.',
      en: 'Digital guide for holiday rentals: house rules, neighbourhood tips and an AI chat that answers guests 24/7.',
    },
  },

  {
    id: 'mercado-local',
    name: 'MercadoLocal',
    slug: 'mercado-local',
    url: '',
    category: 'comercio',
    status: 'idea',
    description: {
      es: 'Tienda online compartida para el comercio de un barrio o pueblo, con catálogo común, recogida en tienda y reparto local.',
      en: "Shared online shop for a neighbourhood's local stores, with a common catalogue, in-store pickup and local delivery.",
    },
  },

  {
    id: 'cuida-mayores',
    name: 'CuidaMayores',
    slug: 'cuida-mayores',
    url: '',
    category: 'salud',
    status: 'idea',
    description: {
      es: 'Coordina en familia el cuidado de un mayor: medicación, citas médicas y turnos, con recordatorios y un historial compartido.',
      en: 'Coordinate eldercare as a family: medication, medical appointments and shifts, with reminders and a shared history.',
    },
  },

  {
    id: 'evento-facil',
    name: 'EventoFácil',
    slug: 'evento-facil',
    url: '',
    category: 'eventos',
    status: 'idea',
    description: {
      es: 'Web para tu evento con invitaciones, confirmaciones de asistencia (RSVP), información práctica y galería de fotos compartida.',
      en: 'A website for your event with invitations, RSVPs, practical info and a shared photo gallery.',
    },
  },

  // ============================================
  // 25 PROYECTOS EN DESARROLLO / PLANEADOS
  // ============================================

  // SALUD
  {
    id: 'psicologia-clinica',
    name: 'Consultorio de Psicología',
    slug: 'psicologia-clinica',
    url: 'https://psicologia-clinica.por2duros.com',
    category: 'salud',
    status: 'planeado',
    sector: 'salud',
    description: {
      es: 'Plataforma para consultorios de psicología. Gestión de citas, historial de sesiones, notas terapéuticas y seguimiento del paciente.',
      en: 'Platform for psychology clinics. Appointment management, session history, therapy notes and patient follow-up.',
    },
  },

  {
    id: 'veterinaria',
    name: 'Clínica Veterinaria',
    slug: 'veterinaria',
    url: 'https://veterinaria.por2duros.com',
    category: 'salud',
    status: 'planeado',
    sector: 'salud',
    description: {
      es: 'Clínica veterinaria online. Reservas de consultas, historial de mascotas, recetas digitales y recordatorios de vacunaciones.',
      en: 'Online veterinary clinic. Consultation booking, pet history, digital prescriptions and vaccination reminders.',
    },
  },

  // DERECHO
  {
    id: 'despacho-abogados',
    name: 'Despacho de Abogados',
    slug: 'despacho-abogados',
    url: 'https://despacho-abogados.por2duros.com',
    category: 'derecho',
    status: 'planeado',
    sector: 'derecho',
    description: {
      es: 'Portal jurídico para despacho de abogados. Consultas online, gestión de casos, documentación y comunicación cliente-abogado.',
      en: 'Legal portal for law firm. Online consultations, case management, documentation and client-lawyer communication.',
    },
  },

  {
    id: 'gestoria-fiscal',
    name: 'Gestoría',
    slug: 'gestoria-fiscal',
    url: 'https://gestoria-fiscal.por2duros.com',
    category: 'derecho',
    status: 'planeado',
    sector: 'derecho',
    description: {
      es: 'Plataforma de gestoría fiscal. Gestión de impuestos, nóminas, contabilidad y asesoramiento empresarial.',
      en: 'Tax advisory platform. Tax management, payroll, accounting and business consulting.',
    },
  },

  // INMOBILIARIA
  {
    id: 'inmobiliaria',
    name: 'Inmobiliaria',
    slug: 'inmobiliaria',
    url: 'https://inmobiliaria.por2duros.com',
    category: 'inmobiliaria',
    status: 'planeado',
    sector: 'inmobiliaria',
    description: {
      es: 'Portal inmobiliario. Listado de propiedades, búsqueda avanzada, visitas virtuales 3D, financiamiento y documentación.',
      en: 'Real estate portal. Property listings, advanced search, 3D virtual tours, financing and documentation.',
    },
  },

  {
    id: 'construccion-reformas',
    name: 'Empresa de Reformas',
    slug: 'construccion-reformas',
    url: 'https://construccion-reformas.por2duros.com',
    category: 'inmobiliaria',
    status: 'planeado',
    sector: 'construccion',
    description: {
      es: 'Plataforma para empresa de construcción y reformas. Presupuestos interactivos, galerías de proyectos, contacto y seguimiento de obras.',
      en: 'Platform for construction and renovation company. Interactive quotes, project galleries, contact and work tracking.',
    },
  },

  {
    id: 'casa-rural',
    name: 'Casa Rural',
    slug: 'casa-rural',
    url: 'https://casa-rural.por2duros.com',
    category: 'inmobiliaria',
    status: 'planeado',
    sector: 'turismo',
    description: {
      es: 'Plataforma de alquiler de casas rurales. Reservas online, calendario de disponibilidad, galerías, reseñas y pagos seguros.',
      en: 'Rural house rental platform. Online booking, availability calendar, galleries, reviews and secure payments.',
    },
  },

  // HOSTELERÍA
  {
    id: 'restaurante',
    name: 'Restaurante',
    slug: 'restaurante',
    url: 'https://restaurante.por2duros.com',
    category: 'hosteleria',
    status: 'planeado',
    sector: 'hosteleria',
    description: {
      es: 'Plataforma para restaurante. Menú online, reservas, pedidos para llevar, integración con servicios de delivery.',
      en: 'Restaurant platform. Online menu, reservations, takeout orders, delivery service integration.',
    },
  },

  {
    id: 'pasteleria',
    name: 'Pastelería',
    slug: 'pasteleria',
    url: 'https://pasteleria.por2duros.com',
    category: 'hosteleria',
    status: 'planeado',
    sector: 'hosteleria',
    description: {
      es: 'Pastelería online. Catálogo de productos, pedidos personalizados, encargos especiales para eventos, y entregas programadas.',
      en: 'Online bakery. Product catalog, custom orders, special event cakes and scheduled deliveries.',
    },
  },

  {
    id: 'aceite-oliva',
    name: 'Productor de Aceite de Oliva',
    slug: 'aceite-oliva',
    url: 'https://aceite-oliva.por2duros.com',
    category: 'hosteleria',
    status: 'planeado',
    sector: 'agroalimentario',
    description: {
      es: 'E-commerce para productor de aceite de oliva. Tienda online, información de origen, degustaciones, suscripciones y distribución.',
      en: 'E-commerce for olive oil producer. Online store, origin information, tastings, subscriptions and distribution.',
    },
  },

  {
    id: 'fruteria',
    name: 'Frutería',
    slug: 'fruteria',
    url: 'https://fruteria.por2duros.com',
    category: 'hosteleria',
    status: 'planeado',
    sector: 'agroalimentario',
    description: {
      es: 'Frutería online. Productos frescos, entregas a domicilio, suscripciones semanales, y cestas personalizadas.',
      en: 'Online greengrocer. Fresh produce, home delivery, weekly subscriptions and custom baskets.',
    },
  },

  // COMERCIO
  {
    id: 'ceramica-artesania',
    name: 'Cerámica y Artesanía',
    slug: 'ceramica-artesania',
    url: 'https://ceramica-artesania.por2duros.com',
    category: 'comercio',
    status: 'planeado',
    sector: 'artesania',
    description: {
      es: 'Tienda de cerámica artesanal. Productos únicos, proceso creativo documentado, talleres, y encargos personalizados.',
      en: 'Handmade pottery store. Unique products, creative process documentation, workshops and custom orders.',
    },
  },

  {
    id: 'libreria',
    name: 'Librería',
    slug: 'libreria',
    url: 'https://libreria.por2duros.com',
    category: 'comercio',
    status: 'planeado',
    sector: 'comercio',
    description: {
      es: 'Librería online. Catálogo de libros, búsqueda avanzada, recomendaciones, club de lectura y eventos literarios.',
      en: 'Online bookstore. Book catalog, advanced search, recommendations, book club and literary events.',
    },
  },

  {
    id: 'marketplace-artesanos',
    name: 'Marketplace de Artesanos',
    slug: 'marketplace-artesanos',
    url: 'https://marketplace-artesanos.por2duros.com',
    category: 'comercio',
    status: 'planeado',
    sector: 'comercio',
    description: {
      es: 'Mercado digital de artesanos. Tiendas individuales, productos únicos, pagos seguros, y comisiones transparentes.',
      en: 'Digital artisan marketplace. Individual shops, unique products, secure payments and transparent commissions.',
    },
  },

  // DEPORTE
  {
    id: 'gimnasio-fitness',
    name: 'Gimnasio',
    slug: 'gimnasio-fitness',
    url: 'https://gimnasio-fitness.por2duros.com',
    category: 'deporte',
    status: 'planeado',
    sector: 'deporte',
    description: {
      es: 'Plataforma de gimnasio. Membresías, clases online, entrenamiento personalizado, nutrición y seguimiento de progreso.',
      en: 'Gym platform. Memberships, online classes, personal training, nutrition and progress tracking.',
    },
  },

  {
    id: 'entrenador-personal',
    name: 'Entrenador Personal',
    slug: 'entrenador-personal',
    url: 'https://entrenador-personal.por2duros.com',
    category: 'deporte',
    status: 'planeado',
    sector: 'deporte',
    description: {
      es: 'Plataforma de entrenador personal. Planes de entrenamiento, videos, seguimiento, nutrición y chat en vivo.',
      en: 'Personal trainer platform. Training plans, videos, tracking, nutrition and live chat.',
    },
  },

  {
    id: 'barberia',
    name: 'Filo Barber Studio',
    slug: 'barberia',
    url: 'https://barberia-demo-ten.vercel.app',
    demo: 'https://barberia-demo-ten.vercel.app',
    category: 'belleza',
    status: 'hecho',
    sector: 'servicios-personales',
    description: {
      es: 'Barbería y estética masculina con reserva de cita por la web y un agente de WhatsApp que conversa y agenda solo. Anti-solapamiento garantizado en base de datos y panel de gestión móvil.',
      en: 'Barbershop and men’s grooming with online web booking and a WhatsApp AI agent that chats and books appointments on its own. Database-level double-booking prevention and a mobile management panel.',
    },
  },

  {
    id: 'bar-de-eric',
    name: 'El Bar de Eric',
    slug: 'bar-de-eric',
    url: 'https://bar-de-eric-demo.vercel.app',
    demo: 'https://bar-de-eric-demo.vercel.app',
    category: 'hosteleria',
    status: 'hecho',
    sector: 'hosteleria',
    description: {
      es: 'Bar-museo de rock con tienda online, reservas y panel de gestión. Carrito persistente, pago con Stripe, autenticación por magic link y catálogo de productos.',
      en: 'Rock bar-museum with online shop, bookings and admin panel. Persistent cart, Stripe checkout, magic-link authentication and a product catalogue.',
    },
  },

  // EVENTOS
  {
    id: 'venta-entradas',
    name: 'Venta de Entradas',
    slug: 'venta-entradas',
    url: 'https://venta-entradas.por2duros.com',
    category: 'eventos',
    status: 'planeado',
    sector: 'eventos',
    description: {
      es: 'Plataforma de venta de entradas. Eventos, conciertos, teatro, control de aforo, asientos dinámicos y reportes.',
      en: 'Ticket sales platform. Events, concerts, theater, capacity control, dynamic seating and reports.',
    },
  },

  {
    id: 'fotografo',
    name: 'Fotógrafo',
    slug: 'fotografo',
    url: 'https://fotografo.por2duros.com',
    category: 'eventos',
    status: 'planeado',
    sector: 'eventos',
    description: {
      es: 'Portafolio y tienda de fotógrafo. Galería, paquetes de sesión, pedidos de impresión, galerías privadas para clientes.',
      en: 'Photographer portfolio and shop. Gallery, session packages, print orders, private galleries for clients.',
    },
  },

  {
    id: 'wedding-planner',
    name: 'Wedding Planner',
    slug: 'wedding-planner',
    url: 'https://wedding-planner.por2duros.com',
    category: 'eventos',
    status: 'planeado',
    sector: 'eventos',
    description: {
      es: 'Plataforma de planificación de bodas. Presupuesto, lista de invitados, proveedores, timeline y colaboración en tiempo real.',
      en: 'Wedding planning platform. Budget, guest list, vendors, timeline and real-time collaboration.',
    },
  },

  {
    id: 'academia-musica',
    name: 'Academia de Música',
    slug: 'academia-musica',
    url: 'https://academia-musica.por2duros.com',
    category: 'eventos',
    status: 'planeado',
    sector: 'educacion',
    description: {
      es: 'Academia de música online. Clases en vivo, lecciones grabadas, teoría musical, instrumentos y seguimiento del alumno.',
      en: 'Online music academy. Live lessons, recorded lessons, music theory, instruments and student progress tracking.',
    },
  },

  // SaaS
  {
    id: 'facturador',
    name: 'Facturador / ERP',
    slug: 'facturador',
    url: 'https://facturador.por2duros.com',
    category: 'saas',
    status: 'planeado',
    sector: 'saas',
    description: {
      es: 'Software de facturación y ERP. Gestión de facturas, inventario, clientes, reportes y integración fiscal.',
      en: 'Invoicing and ERP software. Invoice management, inventory, customers, reports and tax integration.',
    },
  },

  {
    id: 'asociacion-donaciones',
    name: 'Gestión de Asociación / Donaciones',
    slug: 'asociacion-donaciones',
    url: 'https://asociacion-donaciones.por2duros.com',
    category: 'saas',
    status: 'planeado',
    sector: 'saas',
    description: {
      es: 'Plataforma de gestión para asociaciones. Membresía, donaciones recurrentes, eventos, comunicación y reportes.',
      en: 'Association management platform. Membership, recurring donations, events, communication and reporting.',
    },
  },
]

export function getProjectsByCategory(category: Category): Project[] {
  return projects.filter((project) => project.category === category)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getProjectsByStatus(status: Project['status']): Project[] {
  return projects.filter((project) => project.status === status)
}

export function getStats() {
  return {
    total: projects.length,
    completed: projects.filter((p) => p.status === 'hecho').length,
    inDevelopment: projects.filter((p) => p.status === 'desarrollo').length,
    planned: projects.filter((p) => p.status === 'planeado').length,
    ideas: projects.filter((p) => p.status === 'idea').length,
  }
}
