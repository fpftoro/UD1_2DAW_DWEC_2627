// Se ejecuta en el NAVEGADOR: la hora es la del equipo del usuario.
const elementoHora = document.querySelector('#hora');

/** Escribe la hora actual del navegador en la página. */
function actualizarHora() {
  elementoHora.textContent = new Date().toLocaleTimeString('es-ES');
}

actualizarHora();
setInterval(actualizarHora, 1000); // sin peticiones nuevas al servidor
