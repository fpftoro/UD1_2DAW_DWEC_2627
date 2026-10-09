# E08 · Radiografía de una web

**Tipo:** autocorrección

Analiza una web real con las DevTools y explica su arquitectura.

**CE:** RA1 a, b

## Requisitos

1. Elige una web con cierta complejidad (tienda, periódico, red social, correo…). Anota su URL, la fecha y el navegador.
2. Con el panel **Red** y **Desactivar caché** marcado, recarga la página y anota el número de peticiones, el peso transferido y los tiempos hasta `DOMContentLoaded` y `load`.
3. Clasifica las peticiones por tipo.
4. Identifica al menos una petición a **otro origen** y explica para qué sirve.
5. Mira el código fuente (`Ctrl+U`) y el comportamiento al navegar por un enlace interno, y decide si la web es una **MPA**, una **SPA** o un **modelo híbrido**. Justifícalo con al menos dos evidencias.
6. Cuenta las etiquetas `<script>` del código fuente según cómo se cargan: en línea (con el código dentro, sin `src`) o externas (con `src`), y estas según sus atributos.
7. Pasa **Lighthouse** y anota las cuatro puntuaciones y dos mejoras sugeridas, explicadas con tus palabras.
8. Completa el `README.md` siguiendo su plantilla y guarda las capturas en `img/`.

## Especificación

Respeta estos nombres y formatos para poder comparar tu trabajo con la solución de referencia:

| Elemento | Debe ser |
|----------|----------|
| README | Todas las secciones de la plantilla, con sus tablas completas |
| Web analizada | URL que empiece por `http`, fecha y navegador |
| Datos de red | Los cuatro valores con número y unidad (por ejemplo, `87`, `2,4 MB`, `0,9 s`, `2,7 s`) |
| Peticiones por tipo | Números enteros cuya suma coincide con el total de peticiones |
| Otros orígenes | Al menos una fila con un origen que empiece por `http` y su finalidad |
| Modelo de aplicación | Empieza por `MPA`, `SPA` o `Híbrida` |
| Lighthouse | Cuatro puntuaciones enteras de 0 a 100 y dos mejoras |
| Capturas | `img/red.png` (panel Red) e `img/lighthouse.png` (informe de Lighthouse) |

## Comprueba tu solución

- Suma a mano la columna «Número» de «Peticiones por tipo»: debe dar el total de peticiones de «Datos de red». Los cuatro datos de red llevan número y unidad.
- Cada origen de «Peticiones a otros orígenes» es de verdad distinto del de la web: cambia el esquema, el dominio o el puerto. Un subdominio ya es otro origen (`static.ejemplo.com` frente a `www.ejemplo.com`). Su finalidad es concreta (CDN, analítica, publicidad, fuentes, API…), no «cosas de Google».
- Comprueba el modelo de aplicación: en el panel Red, filtra por **Doc** y pulsa un enlace interno. Si aparece una petición de documento nueva, la navegación es de MPA; si solo aparecen peticiones **Fetch/XHR**, es de SPA. Tu clasificación coincide con lo que ves.
- Tus dos evidencias **distinguen** un modelo de otro: el HTML inicial de `Ctrl+U`, con contenido o casi vacío; el tipo de petición al navegar; o marcas de un framework. «Tiene mucho JavaScript» o «es moderna» no sirven: también las MPA cargan mucho JavaScript.
- La tabla «Scripts» suma tantas etiquetas como encuentras al buscar `<script` en el código fuente (`Ctrl+U` y `Ctrl+F`).
- Cada mejora de Lighthouse dice qué propone **y** por qué haría la página mejor (más rápida, más accesible…), con tus palabras.
- Las capturas son de la web que has analizado, y las conclusiones relacionan al menos dos datos de tu informe (por ejemplo, el modelo con el SEO, o el peso con los tiempos).
