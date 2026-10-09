import { detectarCapacidades, datosEntorno } from './capacidades.js';

// --- Tabla de capacidades: una fila <tr> por capacidad ---
const cuerpoTabla = document.querySelector('#capacidades');

for (const { nombre, soportada } of detectarCapacidades()) {
  const fila = document.createElement('tr');
  const celdaNombre = document.createElement('td');
  const celdaSoporte = document.createElement('td');
  celdaNombre.textContent = nombre;
  celdaSoporte.textContent = soportada ? '✅ Sí' : '❌ No';
  celdaSoporte.className = soportada ? 'si' : 'no';
  fila.append(celdaNombre, celdaSoporte);
  cuerpoTabla.append(fila);
}

// --- Datos del entorno: un par <dt>/<dd> por dato ---
const listaEntorno = document.querySelector('#entorno');

for (const [clave, valor] of Object.entries(datosEntorno())) {
  const dt = document.createElement('dt');
  const dd = document.createElement('dd');
  dt.textContent = clave;
  dd.textContent = valor;
  listaEntorno.append(dt, dd);
}

// --- Demostración del hilo principal ---
const salidaContador = document.querySelector('#contador');
const mensaje = document.querySelector('#mensaje');
let cuenta = 0;

// Cada 100 ms, el navegador pide ejecutar esta función, que suma 1 al contador
setInterval(() => {
  cuenta++;
  salidaContador.textContent = cuenta;
}, 100);

// Bloquear: un bucle que no hace nada útil y no suelta el hilo principal hasta que pasa el tiempo
document.querySelector('#bloquear').addEventListener('click', () => {
  mensaje.textContent = '⏳ Bloqueando el hilo principal…';
  const fin = Date.now() + 3000;
  while (Date.now() < fin) {
    // bucle ocupado
  }
  mensaje.textContent = '🔓 Hilo liberado.';
});

// Esperar: setTimeout encarga la espera al navegador y deja libre el hilo principal
document.querySelector('#esperar').addEventListener('click', () => {
  mensaje.textContent = '⏳ Esperando 3 s sin bloquear…';
  setTimeout(() => {
    mensaje.textContent = '✅ Espera terminada.';
  }, 3000);
});

// Botón de prueba: cuenta los clics. Si se pulsa durante el bloqueo, cada clic espera
// en la cola de eventos y se atiende cuando el hilo principal queda libre
const salidaClics = document.querySelector('#clics');
let clics = 0;

document.querySelector('#clic').addEventListener('click', () => {
  clics++;
  salidaClics.textContent = clics;
});
