# E03 · ¿Qué sabe hacer mi navegador?

**Tipo:** autocorrección

Usa una página ya programada que detecta las capacidades del navegador en el que se abre y demuestra qué pasa al bloquear el hilo principal. Compárala en dos navegadores y explica lo que ves.

**CE:** RA1 b

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno del tema 5 (apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

La página usa módulos, así que necesita un servidor. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3003) y abre <http://localhost:3003> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3003 de tu equipo ya está ocupado, VS Code usa otro número). La salida del servidor aparece en la terminal de VS Code; si lo paras, vuelve a lanzarlo desde la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3003 .`. Para comparar navegadores, abre esa misma dirección en los dos.

## Punto de partida

La página ya está hecha: `index.html`, `css/estilos.css` y el JavaScript de `js/`. **No tienes que programar**: el JavaScript lo aprenderás en la UD2. Aquí lo ejecutas, lo observas y lo retocas donde se indica:

- `js/capacidades.js`: la función `detectarCapacidades()` tiene una línea por capacidad. Cada línea comprueba si el navegador tiene un objeto o una función (por ejemplo, `'geolocation' in navigator`), **no** qué navegador es. Esto se llama **detección de características**.
- `js/main.js`: pinta la tabla y la lista, pone en marcha un contador que suma 1 cada 100 ms y define lo que hacen los botones. **Bloquear 3 s** ocupa el hilo principal con un bucle durante 3 segundos; **Esperar 3 s sin bloquear** encarga la espera al navegador con `setTimeout`. Debajo hay un campo de texto y un botón que cuenta clics, para que pruebes a usar la página mientras está bloqueada.

## Requisitos

1. Abre la página y lee los comentarios de los dos ficheros de `js/` para saber qué hace cada parte.
2. En `detectarCapacidades()`, añade **dos** capacidades copiando una línea que ya existe, pegándola antes del `]` y cambiando el nombre y la comprobación:
   - `USB`, con la comprobación `'usb' in navigator`.
   - Una de esta lista, a tu elección: `Bluetooth` (`'bluetooth' in navigator`), `Puerto serie` (`'serial' in navigator`), `Vibración` (`'vibrate' in navigator`), `Compartir` (`'share' in navigator`) o `Cuentagotas` (`'EyeDropper' in window`).
3. Pulsa **Bloquear 3 s** y **Esperar 3 s sin bloquear**, y observa el contador y el mensaje en cada caso.
4. Pulsa **Bloquear 3 s** y, enseguida, mientras el contador está congelado, escribe una palabra en el campo de texto y haz varios clics en **Haz clic aquí**. Fíjate en qué aparece mientras dura el bloqueo y qué aparece justo después. Repite lo mismo con **Esperar 3 s sin bloquear**.
5. Abre la página en **dos navegadores de motores distintos** (por ejemplo, Chrome y Firefox) y completa el `README.md`.

## Especificación

Respeta estos nombres y formatos para poder comparar tu trabajo con la solución de referencia:

| Elemento | Debe ser |
|----------|----------|
| Capacidades añadidas | En `detectarCapacidades()`, una línea `{ nombre: 'USB', soportada: 'usb' in navigator }` y otra con un nombre y una comprobación de la lista del requisito 2, escritos exactamente así |
| Detección | Ninguna comprobación usa el nombre del navegador (`navigator.userAgent`) |
| README | Las secciones «Comparación entre navegadores», «Bloquear frente a esperar» y «Usar la página durante el bloqueo» de la plantilla, completas |

## Comprueba tu solución

- La tabla de la página tiene **13 filas**: las 11 del código de partida y tus dos capacidades. Si tiene 11 o la página sale vacía, revisa la línea que has pegado: en la consola de las DevTools (`F12`) aparecerá un error con el número de línea. Lo más habitual es que falte la coma del final o una comilla.
- `USB` sale con ✅ en Chrome o Edge (motor Blink) y con ❌ en Firefox (Gecko) y en Safari (WebKit). Por eso tu comparación tiene al menos una diferencia.
- Tu comparación usa dos navegadores de **motores distintos**: Chrome y Edge no valen, porque los dos usan Blink.
- Al pulsar **Bloquear 3 s**, el contador se congela tres segundos y después sigue desde el mismo número. Las cerca de 30 vueltas del temporizador que tocaban durante el bloqueo se pierden. El mensaje «Bloqueando…» no llega a verse. Al pulsar **Esperar 3 s sin bloquear**, el mensaje cambia al momento y otra vez a los tres segundos, y el contador **no** se detiene.
- Durante el bloqueo, lo que escribes no aparece y los clics no suman: la página no responde. Al terminar, aparece de golpe todo lo que habías escrito y el contador de clics suma todos los que hiciste. Con **Esperar 3 s sin bloquear**, en cambio, las letras y los clics aparecen al momento.
- Tu explicación de «Bloquear frente a esperar» usa las palabras **hilo principal** y **bucle de eventos** (tema 2), y explica por qué no se ve el mensaje «Bloqueando…».
- Tu explicación de «Usar la página durante el bloqueo» distingue lo que **se pierde** (las vueltas del contador) de lo que **solo se retrasa** (tus pulsaciones y clics, que esperan en la cola de eventos).

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria y su puerto, y se acumula uno por cada ejercicio (tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
