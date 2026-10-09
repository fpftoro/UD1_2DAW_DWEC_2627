# E06 · Separar las capas

**Tipo:** autocorrección

Reorganiza una página antigua para separar contenido, presentación y comportamiento, enlaza el JavaScript como módulo y comprueba qué pasa cuando la integración falla.

**CE:** RA1 e

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno del tema 5 (apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

La página nueva usa módulos, así que necesita un servidor. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3006) y abre <http://localhost:3006> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3006 de tu equipo ya está ocupado, VS Code usa otro número). La salida del servidor aparece en la terminal de VS Code; si lo paras, vuelve a lanzarlo desde la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3006 .`.

## Punto de partida

El fichero `index.html` de este repositorio es una calculadora de propinas escrita «a la antigua»: script en línea, atributos `onclick` y `onload` y estilos en línea. Funciona, pero mezcla las tres capas.

El JavaScript nuevo **ya está hecho** en `js/`: no tienes que programar (el JavaScript lo aprenderás en la UD2).

- `js/propinas.js` calcula la propina y el total, sin tocar la página.
- `js/main.js` busca en el HTML los elementos `#formulario`, `#importe`, `#porcentaje` y `#resultado`, atiende el envío del formulario y escribe el resultado.

Tu trabajo es el **HTML** y el **CSS**, y enlazarlos con ese JavaScript.

## Requisitos

1. Crea `css/estilos.css` con los estilos que ahora están en atributos `style` (y los que quieras añadir).
2. Reescribe `index.html`:
   - Sin atributos `style` ni de evento (`onclick`, `onload`…) y sin `<script>` con código en línea.
   - Con un formulario que tenga los `id` que busca `js/main.js` (ver la especificación) y una etiqueta `<label>` para cada campo.
   - Enlazando `css/estilos.css` con `<link>` y `js/main.js` con `<script type="module">` en el `<head>`.
3. Comprueba que la página se comporta igual que la original: al calcular, muestra la propina y el total.
4. Haz estos tres experimentos y deshaz cada uno al terminar:
   1. Quita `type="module"` del `<script>`, recarga y calcula. Mira la consola de las DevTools (`F12`).
   2. Abre `index.html` con doble clic desde el explorador de archivos de tu equipo (la dirección empezará por `file://`), en Chrome y en Firefox. Calcula y mira la consola.
   3. En `js/main.js`, escribe `//` delante de la línea `evento.preventDefault();` para desactivarla (es lo único que tocas del JavaScript). Guarda, recarga y calcula. Fíjate en la barra de direcciones.
5. Completa el `README.md` siguiendo su plantilla.

## Especificación

Respeta estos nombres y formatos para poder comparar tu trabajo con la solución de referencia:

| Elemento | Debe ser |
|----------|----------|
| Ficheros | `index.html`, `css/estilos.css`, `js/main.js` y `js/propinas.js` (los dos últimos, como en el código de partida), `README.md` |
| Formulario | `<form id="formulario">` que contiene `#importe` (`input` de tipo `number`), `#porcentaje` (`select` con 5, 10 y 15) y un botón de tipo `submit` |
| Resultado | Un elemento `#resultado`, fuera o dentro del formulario |
| Script | `<script type="module" src="js/main.js">` en el `<head>` |
| CSS | `<link rel="stylesheet" href="css/estilos.css">` en el `<head>` |
| README | Las secciones «Estructura», «Cambios realizados», «Experimentos» y «Por qué separar las capas» de la plantilla |

## Comprueba tu solución

- Con un importe de `50` y un 10 %, la página muestra exactamente `Propina: 5.00 € - Total: 55.00 €`, y con `12.5` y un 15 %, `Propina: 1.88 € - Total: 14.38 €`. Si no aparece nada, mira la consola: lo más habitual es un `id` mal escrito o el `<script>` sin `type="module"`.
- Al calcular, la página **no se recarga**: la dirección no cambia.
- Al cargar la página, el cursor ya está en el campo del importe (lo hace `js/main.js`, en lugar del antiguo `onload`).
- Busca en `index.html` las cadenas `onclick`, `onload`, `style="` y `<script>` sin `src`: no debe aparecer ninguna.
- Experimento 1: la consola muestra un error (`Cannot use import statement outside a module` en Chrome, `import declarations may only appear at top level of a module` en Firefox) y, al calcular, la página se recarga sin mostrar el resultado.
- Experimento 2: en Chrome, la consola muestra un error de **CORS** al cargar `js/main.js` y la calculadora no funciona. En Firefox, en cambio, funciona. Por eso hace falta un servidor: no todos los navegadores cargan módulos desde `file://`.
- Experimento 3: al calcular, la página se recarga, el resultado desaparece y la dirección termina en `?importe=50&porcentaje=10`.
- Al entregar, `js/main.js` y `js/propinas.js` están igual que en el código de partida.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria y su puerto, y se acumula uno por cada ejercicio (tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
