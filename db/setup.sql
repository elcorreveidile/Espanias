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
INSERT INTO users (email, nombre, rol) VALUES ('javier@blablaele.com', 'Javier', 'admin')
ON CONFLICT (email) DO UPDATE SET rol = 'admin';

-- ============================================================
-- Proyectos (50)
-- ============================================================
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('perruqueria-canina', 'Perruquería Canina Realejo', 'personal', 'hecho', 'servicios-personales', 'Plataforma de reservas para peluquería canina en Granada. Sistema de citas online, confirmación automática por email, y gestión de clientes con historial de visitas.', 'Dog grooming booking platform in Granada. Online appointment system, automatic email confirmations, and customer management with visit history.', 'https://perruqueria-canina.por2duros.com', 'https://perruqueria-canina-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('eje-fisioterapia', 'Eje Fisioterapia', 'salud', 'hecho', 'salud', 'Clínica de fisioterapia con sistema de reservas, planes de tratamiento personalizados, y seguimiento de evolución del paciente.', 'Physiotherapy clinic with booking system, personalized treatment plans, and patient progress tracking.', 'https://eje-fisioterapia.por2duros.com', 'https://eje-fisioterapia-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('fabrica-sonrisas', 'La Fábrica de Sonrisas', 'salud', 'hecho', 'salud', 'Clínica dental con presupuestos online interactivos, galería antes/después, y sistema de reservas por especialista.', 'Dental clinic with interactive online quotes, before/after gallery, and specialist-based booking system.', 'https://fabrica-sonrisas.por2duros.com', 'https://fabrica-sonrisas-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('comite-clm', 'Comité CLM', 'educacion', 'hecho', 'institucional', 'Web del comité de empresa del Centro de Lenguas Modernas de la Universidad de Granada. Información sindical, convenios y comunicaciones internas.', 'Workers'' committee website for the Modern Languages Centre at the University of Granada. Union information, agreements and internal communications.', 'https://www.comiteclm.com', 'https://comite-clm-demo.vercel.app')
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
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('letra-clara', 'Letra Clara', 'educacion', 'hecho', 'publicacion', 'Revista universitaria del Centro de Lenguas Modernas. Publicación de artículos académicos, reseñas y trabajos estudiantiles.', 'University magazine of the Modern Languages Centre. Publication of academic articles, reviews and student work.', 'https://letaclara.es', 'https://letra-clara-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('espanias-main', 'Espanias', 'saas', 'hecho', 'saas', 'Portfolio de web apps rápidas y profesionales. Catálogo de 50 aplicaciones, dashboard de gestión y sistema de componentes reutilizables.', 'Portfolio of fast and professional web apps. Catalog of 50 applications, management dashboard and reusable component system.', 'https://espanias.com', 'https://espanias-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('javier-benitez', 'Javier Benítez — Personal', 'personal', 'hecho', 'personal', 'Sitio personal de Javier Benítez. Profesor de ELE, poeta, desarrollador web y empresario cultural.', 'Personal website of Javier Benítez. Spanish language teacher, poet, web developer and cultural entrepreneur.', 'https://javier.soy', 'https://javier-benitez-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('makilibre', 'MakiLibre', 'saas', 'hecho', 'saas', 'Herramienta open-source de gestión de transporte colaborativo. API pública y SDK para integración.', 'Open-source collaborative transport management tool. Public API and SDK for integration.', 'https://makilibre.app', 'https://makilibre-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('proyecto-16', 'Proyecto 16', 'otros', 'hecho', 'otros', 'Aplicación web ejemplo 16 del portfolio Por 2 Duros.', 'Example web application 16 from the Por 2 Duros portfolio.', 'https://proyecto-16.por2duros.com', 'https://proyecto-16-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('proyecto-17', 'Proyecto 17', 'otros', 'hecho', 'otros', 'Aplicación web ejemplo 17 del portfolio Por 2 Duros.', 'Example web application 17 from the Por 2 Duros portfolio.', 'https://proyecto-17.por2duros.com', 'https://proyecto-17-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('proyecto-18', 'Proyecto 18', 'otros', 'hecho', 'otros', 'Aplicación web ejemplo 18 del portfolio Por 2 Duros.', 'Example web application 18 from the Por 2 Duros portfolio.', 'https://proyecto-18.por2duros.com', 'https://proyecto-18-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('proyecto-19', 'Proyecto 19', 'otros', 'hecho', 'otros', 'Aplicación web ejemplo 19 del portfolio Por 2 Duros.', 'Example web application 19 from the Por 2 Duros portfolio.', 'https://proyecto-19.por2duros.com', 'https://proyecto-19-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('proyecto-20', 'Proyecto 20', 'otros', 'hecho', 'otros', 'Aplicación web ejemplo 20 del portfolio Por 2 Duros.', 'Example web application 20 from the Por 2 Duros portfolio.', 'https://proyecto-20.por2duros.com', 'https://proyecto-20-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('proyecto-21', 'Proyecto 21', 'otros', 'hecho', 'otros', 'Aplicación web ejemplo 21 del portfolio Por 2 Duros.', 'Example web application 21 from the Por 2 Duros portfolio.', 'https://proyecto-21.por2duros.com', 'https://proyecto-21-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('proyecto-22', 'Proyecto 22', 'otros', 'hecho', 'otros', 'Aplicación web ejemplo 22 del portfolio Por 2 Duros.', 'Example web application 22 from the Por 2 Duros portfolio.', 'https://proyecto-22.por2duros.com', 'https://proyecto-22-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('proyecto-23', 'Proyecto 23', 'otros', 'hecho', 'otros', 'Aplicación web ejemplo 23 del portfolio Por 2 Duros.', 'Example web application 23 from the Por 2 Duros portfolio.', 'https://proyecto-23.por2duros.com', 'https://proyecto-23-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('proyecto-24', 'Proyecto 24', 'otros', 'hecho', 'otros', 'Aplicación web ejemplo 24 del portfolio Por 2 Duros.', 'Example web application 24 from the Por 2 Duros portfolio.', 'https://proyecto-24.por2duros.com', 'https://proyecto-24-demo.vercel.app')
ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('proyecto-25', 'Proyecto 25', 'otros', 'hecho', 'otros', 'Aplicación web ejemplo 25 del portfolio Por 2 Duros.', 'Example web application 25 from the Por 2 Duros portfolio.', 'https://proyecto-25.por2duros.com', 'https://proyecto-25-demo.vercel.app')
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
INSERT INTO projects (slug, nombre, category, estado, sector, descripcion_es, descripcion_en, url, demo_url) VALUES ('peluqueria-barberia', 'Peluquería / Barbería', 'deporte', 'planeado', 'servicios-personales', 'Plataforma de peluquería y barbería. Reservas online, galería de estilos, membresías de clientes frecuentes y promociones.', 'Hair salon and barbershop platform. Online booking, style gallery, frequent customer loyalty and promotions.', 'https://peluqueria-barberia.por2duros.com', NULL)
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
