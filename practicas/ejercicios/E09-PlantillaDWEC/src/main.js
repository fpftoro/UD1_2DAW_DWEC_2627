import './style.css';
import { precioConIva, aplicarDescuento } from './precios.js';

const formulario = document.querySelector('#calculadora');
const resultado = document.querySelector('#resultado');

document.querySelector('#entorno').textContent = import.meta.env.DEV
  ? 'Entorno funcionando con Vite (desarrollo).'
  : 'Versión de producción.';

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const precio = Number(formulario.precio.value);
  const iva = Number(formulario.iva.value);
  const descuento = Number(formulario.descuento.value);

  try {
    const conDescuento = aplicarDescuento(precio, descuento);
    const final = precioConIva(conDescuento, iva);
    resultado.textContent = `Precio final: ${final.toLocaleString('es-ES', {
      style: 'currency',
      currency: 'EUR',
    })}`;
    resultado.classList.remove('error');
  } catch (error) {
    resultado.textContent = `❌ ${error.message}`;
    resultado.classList.add('error');
  }
});
