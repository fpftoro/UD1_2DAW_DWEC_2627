// Contador sin framework (ya está hecho: léelo, no hace falta cambiarlo).
// El estado y la actualización de la interfaz se hacen a mano.
let valor = 0;

const boton = document.querySelector('#sumar');
const salida = document.querySelector('#valor');

boton.addEventListener('click', () => {
  valor++;
  salida.textContent = valor; // si olvidamos esta línea, la interfaz no se entera del cambio
});
