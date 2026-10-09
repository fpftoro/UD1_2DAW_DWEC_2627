# E05 · El orden de los scripts

**Tipo:** autocorrección

Demuestra cómo afectan `defer`, `async` y `type="module"` a la carga y la ejecución de los scripts.

**CE:** RA1 e

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno del tema 5 (apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3005) y abre <http://localhost:3005> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3005 de tu equipo ya está ocupado, VS Code usa otro número). La salida del servidor aparece en la terminal de VS Code; si lo paras, vuelve a lanzarlo desde la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3005 .`. Las DevTools son las de ese navegador.

## Punto de partida

`index.html` ya trae un script en línea al principio del `<head>` que crea el array `window.registro` y la función `window.registrar(nombre)`, que anota el nombre, si existe ya el `<h1>` y el instante. Al producirse `load`, pinta el registro en la lista `#registro`. Es la única excepción a la regla de no usar scripts en línea: tiene que existir antes que cualquier otro script. **No lo modifiques.**

Al final del `<body>` hay una imagen pesada, `img/grande.jpg` (1,1 MB), para que el evento `load` se note. Como la sirves desde tu propio equipo, se descarga al instante: por eso tendrás que **limitar la red** en las DevTools.

## Requisitos

1. Crea cinco scripts en `js/`: `defer1.js`, `defer2.js`, `async.js`, `modulo.js` y `normal.js`. Cada uno solo llama a `window.registrar` con su nombre sin extensión (por ejemplo, `window.registrar('defer1');`).
2. Enlázalos en el `<head>`, **después** del script en línea y **en este orden**: `defer1` con `defer`, `modulo` con `type="module"`, `async` con `async`, `defer2` con `defer` y `normal` sin atributos.
3. Abre la página servida por el contenedor (apartado «Entorno de trabajo»). En el panel **Red** de las DevTools, marca **Desactivar caché** y, en el desplegable de limitación, elige **4G rápido** (*Fast 4G*). Recarga al menos tres veces.
4. Completa el `README.md`: el orden obtenido en cada recarga, la explicación de cada script y una captura del panel **Rendimiento** en `img/rendimiento.png`.

## Especificación

Respeta estos nombres y formatos para poder comparar tu trabajo con la solución de referencia:

| Elemento | Debe ser |
|----------|----------|
| Scripts | `js/defer1.js`, `js/defer2.js`, `js/async.js`, `js/modulo.js`, `js/normal.js` |
| Contenido | Cada script llama a `window.registrar('<nombre>')` con su nombre: `defer1`, `defer2`, `async`, `modulo`, `normal` |
| `<head>` | Tras el script en línea, las cinco etiquetas en el orden y con los atributos del requisito 2 |
| Script en línea | Solo el que trae el código de partida |
| Imagen | `img/grande.jpg`, la del código de partida |
| Captura | `img/rendimiento.png` |
| README | Secciones «Orden observado», «Explicación» y «Panel Rendimiento» completas |

## Comprueba tu solución

- La lista muestra siete líneas: tus cinco scripts, `DOMContentLoaded` y `load`.
- `normal` se ejecuta antes que `defer1`, `modulo` y `defer2`, y es el único de los cuatro que dice «¿existe el título? no».
- `defer1`, `modulo` y `defer2` aparecen **en ese orden** y antes de `DOMContentLoaded`.
- La posición de `async` puede cambiar de una recarga a otra (por ejemplo, antes o después de `defer2`). Si en tres recargas sale siempre en el mismo sitio, recarga más veces.
- `load` es siempre la última línea y, con la red limitada, llega cerca de un segundo después que `DOMContentLoaded`, porque espera a la imagen. Si llegan casi a la vez, no has limitado la red.
- En la captura del panel **Rendimiento** se ven las descargas de los scripts y el momento en que se ejecuta cada uno.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria y su puerto, y se acumula uno por cada ejercicio (tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
