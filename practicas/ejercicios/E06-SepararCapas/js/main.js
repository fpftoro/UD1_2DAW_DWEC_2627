// Comportamiento de la página. Este fichero ya está hecho: busca en el HTML
// #formulario, #importe, #porcentaje y #resultado, así que tu HTML debe tener esos id.
import { calcularPropina } from './propinas.js';

const formulario = document.querySelector('#formulario');
const campoImporte = document.querySelector('#importe');
const selectorPorcentaje = document.querySelector('#porcentaje');
const resultado = document.querySelector('#resultado');

// Sustituye al antiguo <body onload="...">: el módulo ya se ejecuta con el DOM listo
campoImporte.focus();

// Sustituye al antiguo onclick="calcular()"
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault(); // no recargar la página

  const importe = Number(campoImporte.value);
  const porcentaje = Number(selectorPorcentaje.value);
  const { propina, total } = calcularPropina(importe, porcentaje);

  resultado.textContent = `Propina: ${propina.toFixed(2)} € - Total: ${total.toFixed(2)} €`;
});
