/**
 * Detección de características del navegador.
 * Cada comprobación mira si existe el objeto o la función, nunca el nombre del navegador.
 * @module capacidades
 */

/**
 * @typedef {object} Capacidad
 * @property {string} nombre Nombre legible de la capacidad.
 * @property {boolean} soportada Si el navegador la ofrece.
 */

/**
 * Comprueba si localStorage existe y se puede usar (puede estar bloqueado en modo privado).
 * @returns {boolean}
 */
function hayLocalStorage() {
  try {
    const clave = '__prueba__';
    localStorage.setItem(clave, clave);
    localStorage.removeItem(clave);
    return true;
  } catch {
    return false;
  }
}

/**
 * Devuelve la lista de capacidades comprobadas en el navegador actual.
 * @returns {Capacidad[]}
 */
export function detectarCapacidades() {
  // Una línea por capacidad: el nombre que se ve en la tabla y la comprobación.
  // 'algo' in navigator vale true si el objeto navigator tiene esa propiedad.
  // typeof algo === 'function' vale true si existe esa función.
  // Para añadir una capacidad, copia una línea, pégala antes del ] y cambia el nombre y la comprobación.
  return [
    { nombre: 'Módulos ES', soportada: 'noModule' in HTMLScriptElement.prototype },
    { nombre: 'WebAssembly', soportada: typeof WebAssembly === 'object' },
    { nombre: 'localStorage', soportada: hayLocalStorage() },
    { nombre: 'IndexedDB', soportada: 'indexedDB' in window },
    { nombre: 'Service Workers', soportada: 'serviceWorker' in navigator },
    { nombre: 'Geolocalización', soportada: 'geolocation' in navigator },
    { nombre: 'Notificaciones', soportada: 'Notification' in window },
    { nombre: 'Portapapeles', soportada: 'clipboard' in navigator },
    { nombre: 'fetch', soportada: typeof fetch === 'function' },
    { nombre: 'Web Workers', soportada: typeof Worker === 'function' },
    { nombre: 'structuredClone', soportada: typeof structuredClone === 'function' },
  ];
}

/**
 * Devuelve algunos datos del entorno de ejecución.
 * @returns {Record<string, string>}
 */
export function datosEntorno() {
  return {
    Idioma: navigator.language,
    Conexión: navigator.onLine ? 'En línea' : 'Sin conexión',
    'Núcleos de CPU': String(navigator.hardwareConcurrency ?? 'desconocido'),
    'Tamaño de la ventana': `${window.innerWidth} × ${window.innerHeight} px`,
    'Contexto seguro (HTTPS o localhost)': window.isSecureContext ? 'Sí' : 'No',
  };
}
