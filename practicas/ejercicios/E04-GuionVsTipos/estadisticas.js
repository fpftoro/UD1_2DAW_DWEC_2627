// Versión sin tipos: JavaScript acepta cualquier dato y no avisa.
// Estas funciones ya están escritas: NO las modifiques. Úsalas para observar qué hace JavaScript.

export function media(numeros) {
  const suma = numeros.reduce((total, n) => total + n, 0);
  return suma / numeros.length;
}

export function maximo(numeros) {
  return Math.max(...numeros);
}

export function aprobados(notas) {
  return notas.filter((nota) => nota >= 5).length;
}
