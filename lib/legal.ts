// Datos legales del titular del sitio. Centralizados aquí para poder
// actualizarlos en un único lugar.
export const legalInfo = {
  marca: 'Espanias',
  sitio: 'www.espanias.com',
  // Titular / responsable del tratamiento
  titular: 'Francisco Javier Benítez Láinez',
  nif: '08916742X',
  domicilio: 'C/ María Magdalena 5, 29680 Estepona (Málaga)',
  // Para contacto no mostramos email: enlazamos al formulario de contacto.
  contacto: '/contacto',
  actividad:
    'Diseño y desarrollo de aplicaciones web, y formación y consultoría en inteligencia artificial.',
  // Proveedores (encargados del tratamiento)
  hosting: 'Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, EE. UU.)',
  baseDatos: 'Neon Inc. (proveedor de base de datos PostgreSQL, EE. UU./UE)',
  emailProveedor: 'Resend (Plus Five Five, Inc., EE. UU.)',
  // Última actualización de los textos legales
  actualizado: '15 de junio de 2026',
} as const
