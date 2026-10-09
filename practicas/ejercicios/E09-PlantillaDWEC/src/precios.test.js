// Tests de src/precios.js con Vitest. Cada it() es un test: describe qué se comprueba
// y expect(...) compara el resultado de la función con el valor esperado.
import { describe, it, expect } from 'vitest';
import { precioConIva, aplicarDescuento } from './precios.js';

describe('precioConIva', () => {
  it('aplica el 21 % por defecto', () => {
    expect(precioConIva(100)).toBe(121);
  });

  it('aplica el IVA indicado', () => {
    expect(precioConIva(100, 0.1)).toBe(110);
  });

  it('redondea a dos decimales', () => {
    expect(precioConIva(9.99)).toBe(12.09);
  });

  it('acepta un precio de cero', () => {
    expect(precioConIva(0)).toBe(0);
  });

  it('lanza un error si el precio es negativo', () => {
    expect(() => precioConIva(-5)).toThrow('negativo');
  });
});

describe('aplicarDescuento', () => {
  it('aplica un descuento del 25 %', () => {
    expect(aplicarDescuento(80, 25)).toBe(60);
  });

  it('no cambia el precio con un descuento del 0 %', () => {
    expect(aplicarDescuento(49.95, 0)).toBe(49.95);
  });

  it('deja el precio a cero con un descuento del 100 %', () => {
    expect(aplicarDescuento(49.95, 100)).toBe(0);
  });

  it('redondea a dos decimales', () => {
    expect(aplicarDescuento(19.99, 15)).toBe(16.99);
  });

  it('lanza un error si el descuento es negativo', () => {
    expect(() => aplicarDescuento(100, -10)).toThrow('entre 0 y 100');
  });

  it('lanza un error si el descuento es mayor que 100', () => {
    expect(() => aplicarDescuento(100, 150)).toThrow('entre 0 y 100');
  });
});
