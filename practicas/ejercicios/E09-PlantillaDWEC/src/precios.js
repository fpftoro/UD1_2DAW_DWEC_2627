/**
 * Funciones de cálculo de precios.
 * @module precios
 */

/**
 * Redondea un importe a dos decimales (céntimos).
 * @param {number} importe
 * @returns {number}
 */
function redondear(importe) {
  return Math.round(importe * 100) / 100;
}

/**
 * Calcula el precio con IVA.
 * @param {number} precio Precio sin IVA, en euros.
 * @param {number} [iva=0.21] Tipo de IVA en tanto por uno (0.21 = 21 %).
 * @returns {number} Precio con IVA redondeado a dos decimales.
 * @throws {Error} Si el precio es negativo.
 * @example
 * precioConIva(100); // 121
 */
export function precioConIva(precio, iva = 0.21) {
  if (precio < 0) {
    throw new Error('El precio no puede ser negativo');
  }
  return redondear(precio * (1 + iva));
}

/**
 * Aplica un descuento porcentual a un precio.
 * @param {number} precio Precio original, en euros.
 * @param {number} porcentaje Descuento entre 0 y 100.
 * @returns {number} Precio con el descuento aplicado, redondeado a dos decimales.
 * @throws {Error} Si el porcentaje no está entre 0 y 100.
 * @example
 * aplicarDescuento(80, 25); // 60
 */
export function aplicarDescuento(precio, porcentaje) {
  if (porcentaje < 0 || porcentaje > 100) {
    throw new Error('El descuento debe estar entre 0 y 100');
  }
  return redondear(precio * (1 - porcentaje / 100));
}
