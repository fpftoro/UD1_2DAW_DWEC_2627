/**
 * Calcula la propina y el total a pagar.
 * Es una función pura: no toca el DOM y siempre devuelve lo mismo para los mismos datos.
 * @param {number} importe Importe de la cuenta en euros.
 * @param {number} porcentaje Porcentaje de propina (por ejemplo, 10).
 * @returns {{ propina: number, total: number }} Propina y total, redondeados a céntimos.
 */
export function calcularPropina(importe, porcentaje) {
  const propina = Math.round(importe * porcentaje) / 100;
  const total = Math.round((importe + propina) * 100) / 100;
  return { propina, total };
}
