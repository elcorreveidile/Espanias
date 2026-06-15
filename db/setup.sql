-- ============================================================
-- Espanias · setup de base de datos (Neon / Postgres)
-- Pega TODO este archivo en la consola SQL de Neon y ejecútalo.
-- Es idempotente: se puede ejecutar varias veces sin duplicar.
-- ============================================================

CREATE TABLE IF NOT EXISTS projects (
  id serial PRIMARY KEY,
  slug varchar(100) UNIQUE NOT NULL,
  nombre varchar(255) NOT NULL,
  category varchar(50),
  descripcion_es text,
  descripcion_en text,
  url text,
  claim varchar(500),
  sector varchar(100),
  descripcion text,
  estado varchar(50),
  paleta_principal varchar(7),
  paleta_secundaria varchar(7),
  paleta_accion varchar(7),
  tipografia_titulos varchar(100),
  tipografia_cuerpo varchar(100),
  backend varchar(50),
  orm varchar(50),
  auth_provider varchar(50),
  plan_maestro_url text,
  repositorio_url text,
  demo_url text,
  notas_internas text,
  componentes_incluidos varchar(500),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS components (
  id serial PRIMARY KEY,
  slug varchar(100) UNIQUE NOT NULL,
  nombre varchar(255) NOT NULL,
  descripcion text,
  categoria varchar(100),
  projects_using varchar(500),
  doc_url text,
  esquema_bd text,
  componentes_react varchar(500),
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS shared_decisions (
  id serial PRIMARY KEY,
  titulo varchar(255) NOT NULL,
  descripcion text,
  categoria varchar(100),
  decision text,
  razon text,
  referencia_proyectos varchar(500),
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS learnings (
  id serial PRIMARY KEY,
  project_id integer REFERENCES projects(id),
  titulo varchar(255),
  contenido text,
  tipo varchar(50),
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  email varchar(255) UNIQUE NOT NULL,
  nombre varchar(255),
  rol varchar(50) DEFAULT 'viewer',
  creado_por integer,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS magic_tokens (
  id serial PRIMARY KEY,
  email varchar(255) NOT NULL,
  token varchar(255) UNIQUE NOT NULL,
  expires_at timestamp NOT NULL,
  created_at timestamp DEFAULT now()
);

-- Auth.js (next-auth) tablas para el adaptador de BD
CREATE TABLE IF NOT EXISTS verification_token (
  identifier text NOT NULL,
  token text NOT NULL,
  expires timestamptz NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- ============================================================
-- Usuario admin
-- ============================================================
INSERT INTO users (email, nombre, rol) VALUES ('informa@blablaele.com', 'Javier', 'admin')
ON CONFLICT (email) DO UPDATE SET rol = 'admin';

-- ============================================================
-- Proyectos (50)
-- ============================================================
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('perruqueria-canina', 'Perruquería Canina Realejo', 'mascotas', 'hecho', 'servicios-personales', 'Plataforma de reservas para peluquería canina en Granada. Sistema de citas online, confirmación automática por email, y gestión de clientes con historial de visitas.', 'Dog grooming booking platform in Granada. Online appointment system, automatic email confirmations, and customer management with visit history.', 'https://perruqueria-canina.por2duros.com', 'https://perruqueria-canina-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('eje-fisioterapia', 'Eje Fisioterapia', 'salud', 'hecho', 'salud', 'Clínica de fisioterapia con sistema de reservas, planes de tratamiento personalizados, y seguimiento de evolución del paciente.', 'Physiotherapy clinic with booking system, personalized treatment plans, and patient progress tracking.', 'https://eje-fisioterapia.por2duros.com', 'https://eje-fisioterapia-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('fabrica-sonrisas', 'La Fábrica de Sonrisas', 'salud', 'hecho', 'salud', 'Clínica dental con presupuestos online interactivos, galería antes/después, y sistema de reservas por especialista.', 'Dental clinic with interactive online quotes, before/after gallery, and specialist-based booking system.', 'https://fabrica-sonrisas.por2duros.com', 'https://fabrica-sonrisas-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('comite-clm', 'Comité CLM', 'gestion', 'hecho', 'institucional', 'Web del comité de empresa del Centro de Lenguas Modernas de la Universidad de Granada. Información sindical, convenios y comunicaciones internas.', 'Workers'' committee website for the Modern Languages Centre at the University of Granada. Union information, agreements and internal communications.', 'https://www.comiteclm.com', 'https://comite-clm-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('mariano-maresca', 'Mariano Maresca', 'literatura', 'hecho', 'cultural', 'Exposición digital conmemorativa del editor y figura cultural andaluza Mariano Maresca (1945–2023). Catálogo de sus obras y legado literario.', 'Digital commemorative exhibition honouring Andalusian cultural editor Mariano Maresca (1945–2023). Catalogue of his works and literary legacy.', 'https://www.marianomaresca.com', 'https://mm-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('ia-ele-course', 'IA para ELE', 'ia', 'hecho', 'educacion', 'Plataforma de formación en inteligencia artificial para profesores de español. Módulos sobre prompts, chatbots custom, MCER, y recursos multimodales.', 'AI training platform for Spanish language teachers. Modules on prompts, custom chatbots, CEFR alignment, and multimodal resources.', 'https://iaele.es', 'https://ia-ele-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('costa-companion', 'Costa Companion', 'personal', 'hecho', 'turismo', 'Plataforma multilingüe de acompañamiento lingüístico para la Costa del Sol. Conecta turistas con acompañantes locales para mejorar su español.', 'Multilingual linguistic accompaniment platform for the Costa del Sol. Connects tourists with local companions to improve their Spanish.', 'https://costacompanion.com', 'https://costa-companion-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('makicar', 'MakiCar', 'saas', 'hecho', 'transporte', 'PWA para reserva de transporte compartido. Cálculo dinámico de tarifas, sistema de pre-autorización, y gestión de viajes.', 'PWA for shared transport booking. Dynamic fare calculation, pre-authorization system, and trip management.', 'https://makicar.app', 'https://makicar-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('versovivo', 'VersoVivo', 'literatura', 'hecho', 'cultura', 'Antología interactiva de poesía española con análisis literario asistido por IA. Selección de obras comentadas y recursos educativos.', 'Interactive anthology of Spanish poetry with AI-assisted literary analysis. Curated works with commentary and educational resources.', 'https://versovivo.ai', 'https://versovivo-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('olvidos-granada', 'Olvidos de Granada', 'literatura', 'hecho', 'cultural', 'Revista digital de literatura y cultura de Granada. Publicación de artículos, reseñas, entrevistas y obras de autores granadinos.', 'Digital literary and cultural magazine of Granada. Publishing articles, reviews, interviews and works by Granada-based authors.', 'https://olvidosdegranada.es', 'https://olvidos-granada-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('clase-digital-main', 'La Clase Digital', 'educacion', 'hecho', 'educacion', 'Plataforma educativa para ELE (Español como Lengua Extranjera) con recursos, lecciones interactivas y formación de profesores.', 'Educational platform for Spanish as a Foreign Language with resources, interactive lessons and teacher training.', 'https://laclasedigital.com', 'https://clase-digital-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('poedronomo', 'Poedrónomo', 'literatura', 'hecho', 'literatura', 'Plataforma de publicación y venta de obras de poesía. Catálogo de libros, descarga digital, e interacción con lectores.', 'Publishing and sales platform for poetry collections. Book catalog, digital downloads, and reader engagement.', 'https://poedronomo.com', 'https://poedronomo-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('diente-oro', 'Asociación Cultural Diente de Oro', 'personal', 'hecho', 'cultural', 'Sitio web de la asociación cultural con información de eventos, actividades, membresía y calendario de programación cultural.', 'Website of the cultural association with event information, activities, membership and cultural programming calendar.', 'https://dientedeoro.es', 'https://diente-oro-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('espanias-main', 'Espanias', 'saas', 'hecho', 'saas', 'Portfolio de web apps rápidas y profesionales. Catálogo de 50 aplicaciones, dashboard de gestión y sistema de componentes reutilizables.', 'Portfolio of fast and professional web apps. Catalog of 50 applications, management dashboard and reusable component system.', 'https://espanias.com', 'https://espanias-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('javier-benitez', 'Javier Benítez — Personal', 'personal', 'hecho', 'personal', 'Sitio personal de Javier Benítez. Profesor de ELE, poeta, desarrollador web y empresario cultural.', 'Personal website of Javier Benítez. Spanish language teacher, poet, web developer and cultural entrepreneur.', 'https://javier.soy', 'https://javier-benitez-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('makilibre', 'MakiLibre', 'saas', 'hecho', 'saas', 'Herramienta open-source de gestión de transporte colaborativo. API pública y SDK para integración.', 'Open-source collaborative transport management tool. Public API and SDK for integration.', 'https://makilibre.app', 'https://makilibre-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
-- Ideas de apps aún no construidas (estado 'idea')
INSERT INTO projects (slug, nombre, category, estado, descripcion_es, descripcion_en) VALUES ('resenas-plus', 'Reseñas+', 'comercio', 'idea', 'Centraliza las reseñas de Google y redes en un único panel y responde más rápido con borradores sugeridos por IA. Más reputación local con menos esfuerzo.', 'Brings your Google and social reviews into one dashboard and helps you reply faster with AI-suggested drafts. More local reputation, less effort.')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, descripcion_es, descripcion_en) VALUES ('carta-viva', 'Carta Viva', 'hosteleria', 'idea', 'Carta digital por QR con fotos, alérgenos y un recomendador con IA. Traducción automática para turistas y cambios de precios al instante.', 'QR digital menu with photos, allergens and an AI recommender. Automatic translation for tourists and instant price updates.')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, descripcion_es, descripcion_en) VALUES ('presu-ia', 'Presu IA', 'saas', 'idea', 'Presupuestos profesionales en minutos para autónomos: la IA redacta los conceptos y sugiere precios a partir de una breve descripción.', 'Professional quotes in minutes for freelancers: AI drafts the line items and suggests prices from a short description.')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, descripcion_es, descripcion_en) VALUES ('turno-claro', 'TurnoClaro', 'gestion', 'idea', 'Cuadrantes y turnos para equipos pequeños, con avisos automáticos y cambios entre compañeros sin llamadas ni hojas de cálculo.', 'Shifts and rotas for small teams, with automatic reminders and swaps between coworkers — no calls or spreadsheets.')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, descripcion_es, descripcion_en) VALUES ('voz-cliente', 'VozCliente', 'saas', 'idea', 'Encuestas de satisfacción por WhatsApp tras cada servicio y un panel que resume las opiniones con IA para detectar qué mejorar.', 'Post-service satisfaction surveys via WhatsApp and a dashboard that summarises feedback with AI to spot what to improve.')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, descripcion_es, descripcion_en) VALUES ('raices', 'Raíces', 'personal', 'idea', 'Crea la biografía o el libro de recuerdos de tu familia conversando con una IA que entrevista, ordena las historias y las maqueta.', 'Create your family''s biography or memory book by talking to an AI that interviews, organises the stories and lays them out.')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, descripcion_es, descripcion_en) VALUES ('anfitrion-ia', 'Anfitrión IA', 'otros', 'idea', 'Guía digital para alojamientos turísticos: normas de la casa, recomendaciones del barrio y un chat con IA que responde a los huéspedes 24/7.', 'Digital guide for holiday rentals: house rules, neighbourhood tips and an AI chat that answers guests 24/7.')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, descripcion_es, descripcion_en) VALUES ('mercado-local', 'MercadoLocal', 'comercio', 'idea', 'Tienda online compartida para el comercio de un barrio o pueblo, con catálogo común, recogida en tienda y reparto local.', 'Shared online shop for a neighbourhood''s local stores, with a common catalogue, in-store pickup and local delivery.')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, descripcion_es, descripcion_en) VALUES ('cuida-mayores', 'CuidaMayores', 'salud', 'idea', 'Coordina en familia el cuidado de un mayor: medicación, citas médicas y turnos, con recordatorios y un historial compartido.', 'Coordinate eldercare as a family: medication, medical appointments and shifts, with reminders and a shared history.')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, descripcion_es, descripcion_en) VALUES ('evento-facil', 'EventoFácil', 'eventos', 'idea', 'Web para tu evento con invitaciones, confirmaciones de asistencia (RSVP), información práctica y galería de fotos compartida.', 'A website for your event with invitations, RSVPs, practical info and a shared photo gallery.')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('psicologia-clinica', 'Consultorio de Psicología', 'salud', 'planeado', 'salud', 'Plataforma para consultorios de psicología. Gestión de citas, historial de sesiones, notas terapéuticas y seguimiento del paciente.', 'Platform for psychology clinics. Appointment management, session history, therapy notes and patient follow-up.', 'https://psicologia-clinica.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('veterinaria', 'Clínica Veterinaria', 'salud', 'planeado', 'salud', 'Clínica veterinaria online. Reservas de consultas, historial de mascotas, recetas digitales y recordatorios de vacunaciones.', 'Online veterinary clinic. Consultation booking, pet history, digital prescriptions and vaccination reminders.', 'https://veterinaria.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('despacho-abogados', 'Despacho de Abogados', 'derecho', 'planeado', 'derecho', 'Portal jurídico para despacho de abogados. Consultas online, gestión de casos, documentación y comunicación cliente-abogado.', 'Legal portal for law firm. Online consultations, case management, documentation and client-lawyer communication.', 'https://despacho-abogados.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('gestoria-fiscal', 'Gestoría', 'derecho', 'planeado', 'derecho', 'Plataforma de gestoría fiscal. Gestión de impuestos, nóminas, contabilidad y asesoramiento empresarial.', 'Tax advisory platform. Tax management, payroll, accounting and business consulting.', 'https://gestoria-fiscal.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('inmobiliaria', 'Inmobiliaria', 'inmobiliaria', 'planeado', 'inmobiliaria', 'Portal inmobiliario. Listado de propiedades, búsqueda avanzada, visitas virtuales 3D, financiamiento y documentación.', 'Real estate portal. Property listings, advanced search, 3D virtual tours, financing and documentation.', 'https://inmobiliaria.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('construccion-reformas', 'Empresa de Reformas', 'inmobiliaria', 'planeado', 'construccion', 'Plataforma para empresa de construcción y reformas. Presupuestos interactivos, galerías de proyectos, contacto y seguimiento de obras.', 'Platform for construction and renovation company. Interactive quotes, project galleries, contact and work tracking.', 'https://construccion-reformas.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('casa-rural', 'Casa Rural', 'inmobiliaria', 'planeado', 'turismo', 'Plataforma de alquiler de casas rurales. Reservas online, calendario de disponibilidad, galerías, reseñas y pagos seguros.', 'Rural house rental platform. Online booking, availability calendar, galleries, reviews and secure payments.', 'https://casa-rural.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('restaurante', 'Restaurante', 'hosteleria', 'planeado', 'hosteleria', 'Plataforma para restaurante. Menú online, reservas, pedidos para llevar, integración con servicios de delivery.', 'Restaurant platform. Online menu, reservations, takeout orders, delivery service integration.', 'https://restaurante.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('pasteleria', 'Pastelería', 'hosteleria', 'planeado', 'hosteleria', 'Pastelería online. Catálogo de productos, pedidos personalizados, encargos especiales para eventos, y entregas programadas.', 'Online bakery. Product catalog, custom orders, special event cakes and scheduled deliveries.', 'https://pasteleria.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('aceite-oliva', 'Productor de Aceite de Oliva', 'hosteleria', 'planeado', 'agroalimentario', 'E-commerce para productor de aceite de oliva. Tienda online, información de origen, degustaciones, suscripciones y distribución.', 'E-commerce for olive oil producer. Online store, origin information, tastings, subscriptions and distribution.', 'https://aceite-oliva.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('fruteria', 'Frutería', 'hosteleria', 'planeado', 'agroalimentario', 'Frutería online. Productos frescos, entregas a domicilio, suscripciones semanales, y cestas personalizadas.', 'Online greengrocer. Fresh produce, home delivery, weekly subscriptions and custom baskets.', 'https://fruteria.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('ceramica-artesania', 'Cerámica y Artesanía', 'comercio', 'planeado', 'artesania', 'Tienda de cerámica artesanal. Productos únicos, proceso creativo documentado, talleres, y encargos personalizados.', 'Handmade pottery store. Unique products, creative process documentation, workshops and custom orders.', 'https://ceramica-artesania.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('libreria', 'Librería', 'comercio', 'planeado', 'comercio', 'Librería online. Catálogo de libros, búsqueda avanzada, recomendaciones, club de lectura y eventos literarios.', 'Online bookstore. Book catalog, advanced search, recommendations, book club and literary events.', 'https://libreria.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('marketplace-artesanos', 'Marketplace de Artesanos', 'comercio', 'planeado', 'comercio', 'Mercado digital de artesanos. Tiendas individuales, productos únicos, pagos seguros, y comisiones transparentes.', 'Digital artisan marketplace. Individual shops, unique products, secure payments and transparent commissions.', 'https://marketplace-artesanos.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('gimnasio-fitness', 'Gimnasio', 'deporte', 'planeado', 'deporte', 'Plataforma de gimnasio. Membresías, clases online, entrenamiento personalizado, nutrición y seguimiento de progreso.', 'Gym platform. Memberships, online classes, personal training, nutrition and progress tracking.', 'https://gimnasio-fitness.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('entrenador-personal', 'Entrenador Personal', 'deporte', 'planeado', 'deporte', 'Plataforma de entrenador personal. Planes de entrenamiento, videos, seguimiento, nutrición y chat en vivo.', 'Personal trainer platform. Training plans, videos, tracking, nutrition and live chat.', 'https://entrenador-personal.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('barberia', 'Filo Barber Studio', 'belleza', 'hecho', 'servicios-personales', 'Barbería y estética masculina con reserva de cita por la web y un agente de WhatsApp que conversa y agenda solo. Anti-solapamiento garantizado en base de datos y panel de gestión móvil.', 'Barbershop and men’s grooming with online web booking and a WhatsApp AI agent that chats and books appointments on its own. Database-level double-booking prevention and a mobile management panel.', 'https://barberia-demo-ten.vercel.app', 'https://barberia-demo-ten.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('bar-de-eric', 'El Bar de Eric', 'hosteleria', 'hecho', 'hosteleria', 'Bar-museo de rock con tienda online, reservas y panel de gestión. Carrito persistente, pago con Stripe, autenticación por magic link y catálogo de productos.', 'Rock bar-museum with online shop, bookings and admin panel. Persistent cart, Stripe checkout, magic-link authentication and a product catalogue.', 'https://bar-de-eric-demo.vercel.app', 'https://bar-de-eric-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('venta-entradas', 'Venta de Entradas', 'eventos', 'planeado', 'eventos', 'Plataforma de venta de entradas. Eventos, conciertos, teatro, control de aforo, asientos dinámicos y reportes.', 'Ticket sales platform. Events, concerts, theater, capacity control, dynamic seating and reports.', 'https://venta-entradas.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('fotografo', 'Fotógrafo', 'eventos', 'planeado', 'eventos', 'Portafolio y tienda de fotógrafo. Galería, paquetes de sesión, pedidos de impresión, galerías privadas para clientes.', 'Photographer portfolio and shop. Gallery, session packages, print orders, private galleries for clients.', 'https://fotografo.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('wedding-planner', 'Wedding Planner', 'eventos', 'planeado', 'eventos', 'Plataforma de planificación de bodas. Presupuesto, lista de invitados, proveedores, timeline y colaboración en tiempo real.', 'Wedding planning platform. Budget, guest list, vendors, timeline and real-time collaboration.', 'https://wedding-planner.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('academia-musica', 'Academia de Música', 'eventos', 'planeado', 'educacion', 'Academia de música online. Clases en vivo, lecciones grabadas, teoría musical, instrumentos y seguimiento del alumno.', 'Online music academy. Live lessons, recorded lessons, music theory, instruments and student progress tracking.', 'https://academia-musica.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('facturador', 'Facturador / ERP', 'saas', 'planeado', 'saas', 'Software de facturación y ERP. Gestión de facturas, inventario, clientes, reportes y integración fiscal.', 'Invoicing and ERP software. Invoice management, inventory, customers, reports and tax integration.', 'https://facturador.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('asociacion-donaciones', 'Gestión de Asociación / Donaciones', 'saas', 'planeado', 'saas', 'Plataforma de gestión para asociaciones. Membresía, donaciones recurrentes, eventos, comunicación y reportes.', 'Association management platform. Membership, recurring donations, events, communication and reporting.', 'https://asociacion-donaciones.por2duros.com', NULL)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Biblioteca · componentes reutilizables
-- ============================================================
INSERT INTO components (slug, nombre, categoria, descripcion, doc_url) VALUES ('booking-engine', 'Motor de Reservas', 'reservas', 'Sistema de citas con anti-solapamiento, confirmación por email y gestión de clientes.', '/dashboard/biblioteca/componentes#booking-engine')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO components (slug, nombre, categoria, descripcion, doc_url) VALUES ('admin-panel', 'Panel de Administración', 'admin', 'Panel CRUD usable desde móvil para gestionar el negocio.', '/dashboard/biblioteca/componentes#admin-panel')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO components (slug, nombre, categoria, descripcion, doc_url) VALUES ('calculator', 'Calculadora de Presupuestos', 'calcular', 'Presupuestos interactivos en tiempo real.', '/dashboard/biblioteca/componentes#calculator')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO components (slug, nombre, categoria, descripcion, doc_url) VALUES ('fidelization', 'Fidelización', 'pauta', 'Sistema de bonos y fidelización automática de clientes.', '/dashboard/biblioteca/componentes#fidelization')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO components (slug, nombre, categoria, descripcion, doc_url) VALUES ('whatsapp-agent', 'Agente de WhatsApp', 'ia', 'Bot conversacional con Claude (tool use) que da citas por WhatsApp: entiende lenguaje natural, consulta huecos y reserva contra la misma base de datos que la web.', '/dashboard/biblioteca/componentes#whatsapp-agent')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO components (slug, nombre, categoria, descripcion, doc_url) VALUES ('ecommerce', 'Tienda online', 'comercio', 'Catálogo de productos, carrito persistente (localStorage) y pago con Stripe Checkout, con confirmación por email.', '/dashboard/biblioteca/componentes#ecommerce')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Biblioteca · patrones / decisiones compartidas
-- ============================================================
INSERT INTO shared_decisions (titulo, categoria, decision, razon, referencia_proyectos)
SELECT 'Anti-solapamiento de reservas', 'database', 'EXCLUDE USING gist constraint en Postgres', 'Garantía a nivel de base de datos, no de aplicación.', 'perruqueria-canina,eje-fisioterapia'
WHERE NOT EXISTS (SELECT 1 FROM shared_decisions WHERE titulo = 'Anti-solapamiento de reservas');
INSERT INTO shared_decisions (titulo, categoria, decision, razon, referencia_proyectos)
SELECT 'Magic link sin contraseñas', 'auth', 'Token de un solo uso enviado por email (Resend)', 'Menos fricción para el usuario y sin gestión de contraseñas.', 'espanias-main'
WHERE NOT EXISTS (SELECT 1 FROM shared_decisions WHERE titulo = 'Magic link sin contraseñas');
INSERT INTO shared_decisions (titulo, categoria, decision, razon, referencia_proyectos)
SELECT 'Reservas conversacionales por WhatsApp', 'ia', 'Claude (claude-opus-4-8) con tool use; las herramientas ejecutan la lógica de reserva contra Postgres', 'Un solo cerebro conversacional; las reglas de negocio y el anti-solapamiento viven en la base de datos, no en el prompt.', 'barberia'
WHERE NOT EXISTS (SELECT 1 FROM shared_decisions WHERE titulo = 'Reservas conversacionales por WhatsApp');

-- ============================================================
-- Biblioteca · learnings (vinculados por slug)
-- ============================================================
INSERT INTO learnings (project_id, titulo, contenido, tipo)
SELECT p.id, 'Panel admin usable desde móvil', 'El negocio gestiona las citas desde el móvil; el panel debe ser mobile-first.', 'what-worked' FROM projects p WHERE p.slug = 'perruqueria-canina'
AND NOT EXISTS (SELECT 1 FROM learnings l WHERE l.titulo = 'Panel admin usable desde móvil');
INSERT INTO learnings (project_id, titulo, contenido, tipo)
SELECT p.id, 'Notas de tratamiento', 'Las notas estructuradas por sesión agilizan el seguimiento del paciente.', 'what-worked' FROM projects p WHERE p.slug = 'eje-fisioterapia'
AND NOT EXISTS (SELECT 1 FROM learnings l WHERE l.titulo = 'Notas de tratamiento');

-- ============================================================
-- Ejemplo: identidad visual + componentes en perru y fisio
-- (solo si están vacíos, para no pisar ediciones del panel)
-- ============================================================
UPDATE projects SET componentes_incluidos = 'booking-engine,fidelization',
  paleta_principal = '#A8D8F0', paleta_secundaria = '#FFF7EA', paleta_accion = '#E8436B',
  tipografia_titulos = 'Fraunces', tipografia_cuerpo = 'Nunito Sans',
  claim = COALESCE(claim, 'Peluquería canina en positivo')
WHERE slug = 'perruqueria-canina' AND componentes_incluidos IS NULL;

UPDATE projects SET componentes_incluidos = 'booking-engine,admin-panel',
  claim = COALESCE(claim, 'Entiende tu dolor')
WHERE slug = 'eje-fisioterapia' AND componentes_incluidos IS NULL;

-- Barbería: reservas web + agente de WhatsApp
UPDATE projects SET componentes_incluidos = 'booking-engine,whatsapp-agent',
  claim = COALESCE(claim, 'Tu cita, por la web o por WhatsApp'),
  repositorio_url = COALESCE(repositorio_url, 'https://github.com/elcorreveidile/barberia-demo')
WHERE slug = 'barberia' AND componentes_incluidos IS NULL;

UPDATE projects SET componentes_incluidos = 'booking-engine,admin-panel,ecommerce',
  claim = COALESCE(claim, 'Rock, cañas y tienda online')
WHERE slug = 'bar-de-eric' AND componentes_incluidos IS NULL;

