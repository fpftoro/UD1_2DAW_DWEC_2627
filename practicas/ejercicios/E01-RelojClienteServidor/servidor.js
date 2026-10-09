/**
 * Servidor de ejemplo: el mismo reloj generado en el servidor y en el cliente.
 * Ejecutar con: npm start
 *
 * No hace falta entender cada línea. Fíjate en dos cosas:
 * - paginaServidor() calcula la hora AQUÍ, en el servidor, y la escribe dentro del HTML.
 * - La ruta /cliente no calcula nada: envía un HTML fijo y el fichero public/reloj.js,
 *   que calcula la hora en el navegador.
 * El servidor simula estar en Tokio, así que su hora no es la de tu equipo.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

// Simulamos un servidor en Tokio: su hora es la de Japón, no la de tu equipo.
// Para arrancarlo en otra zona horaria: TZ=Europe/Madrid npm start
process.env.TZ ??= 'Asia/Tokyo';
const ZONA = Intl.DateTimeFormat().resolvedOptions().timeZone;

const PUERTO = Number(process.env.PORT ?? 3001);
const CARPETA_PUBLICA = new URL('./public/', import.meta.url);

/**
 * Genera en el servidor una página HTML con la hora actual del servidor.
 * @returns {string} Documento HTML completo.
 */
function paginaServidor() {
  const hora = new Date().toLocaleTimeString('es-ES');
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Reloj en el servidor</title>
  </head>
  <body>
    <h1>Reloj generado en el servidor</h1>
    <p>Hora del servidor (${ZONA}): <strong id="hora">${hora}</strong></p>
    <p><a href="/servidor">Recargar para ver la hora nueva</a> · <a href="/cliente">Ver la versión de cliente</a></p>
  </body>
</html>`;
}

/**
 * Página de inicio, con enlaces a las dos versiones del reloj.
 * @returns {string} Documento HTML completo.
 */
function portada() {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>El reloj en el servidor y en el cliente</title>
  </head>
  <body>
    <h1>El reloj en el servidor y en el cliente</h1>
    <ul>
      <li><a href="/servidor">Reloj generado en el servidor</a></li>
      <li><a href="/cliente">Reloj ejecutado en el cliente</a></li>
    </ul>
  </body>
</html>`;
}

/**
 * Envía un fichero de la carpeta public con el tipo de contenido indicado.
 * @param {import('node:http').ServerResponse} respuesta
 * @param {string} nombre Nombre del fichero dentro de public/.
 * @param {string} tipo Valor de la cabecera Content-Type.
 */
async function enviarFichero(respuesta, nombre, tipo) {
  const contenido = await readFile(new URL(nombre, CARPETA_PUBLICA));
  respuesta.writeHead(200, { 'Content-Type': tipo });
  respuesta.end(contenido);
}

const servidor = createServer(async (peticion, respuesta) => {
  console.log(`📥 ${peticion.method} ${peticion.url}`);

  switch (peticion.url) {
    case '/':
      respuesta.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      respuesta.end(portada());
      break;
    case '/servidor':
      respuesta.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      respuesta.end(paginaServidor());
      break;
    case '/cliente':
      await enviarFichero(respuesta, 'cliente.html', 'text/html; charset=utf-8');
      break;
    case '/reloj.js':
      await enviarFichero(respuesta, 'reloj.js', 'application/javascript; charset=utf-8');
      break;
    default:
      respuesta.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      respuesta.end('<h1>404</h1><p>No existe esa página. Prueba <a href="/servidor">/servidor</a> o <a href="/cliente">/cliente</a>.</p>');
  }
});

servidor.listen(PUERTO, () => {
  console.log(`✅ Servidor en http://localhost:${PUERTO} (zona horaria: ${ZONA})`);
  console.log(`   · http://localhost:${PUERTO}/servidor`);
  console.log(`   · http://localhost:${PUERTO}/cliente`);
});
