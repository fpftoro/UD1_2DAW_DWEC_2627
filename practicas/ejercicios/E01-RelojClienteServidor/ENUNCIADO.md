# E01 · El reloj en el servidor y en el cliente

**Tipo:** autocorrección

Pon en marcha la misma funcionalidad, un reloj, ejecutada en el servidor y en el cliente, y compara el resultado con las DevTools.

**CE:** RA1 a

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno del tema 5 (apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

En este ejercicio el servidor **no arranca solo**: arráncalo tú con `npm start` en la terminal de VS Code (es la terminal del contenedor; ábrela con `` Ctrl+` `` si no la ves). Hasta que lo hagas, el puerto 3001 no responde. Después abre <http://localhost:3001> en el navegador de tu equipo: es una portada con enlaces a las dos versiones del reloj. Si no responde, mira en el panel **Puertos** de VS Code la columna **Dirección reenviada**: si el 3001 de tu equipo ya está ocupado, VS Code usa otro número. Para parar el servidor, pulsa `Ctrl+C` en la terminal.

## Punto de partida

El servidor y las dos páginas ya están programados. **No tienes que programar**: el JavaScript lo aprenderás en la UD2. Aquí lo pones en marcha, lo observas y comparas los dos modelos:

- `servidor.js` se ejecuta en el **servidor**, con Node.js. Simula un servidor que está en **Tokio**, así que su hora es la de Japón. Atiende cinco rutas: `/` (una portada con enlaces), `/servidor` (un HTML que el servidor genera con su hora), `/cliente` (el HTML fijo `public/cliente.html`), `/reloj.js` (el fichero `public/reloj.js`) y cualquier otra, con un error `404`.
- `public/reloj.js` se ejecuta en el **navegador**: escribe la hora del equipo del usuario y la actualiza cada segundo.

Lee los comentarios del principio de los dos ficheros.

## Requisitos

1. Arranca el servidor con `npm start` y abre <http://localhost:3001/servidor> y <http://localhost:3001/cliente>. Deja la terminal a la vista: el servidor escribe una línea `📥 GET …` por cada petición que recibe.
2. Abre las DevTools (`F12`), ve al panel **Red** (*Network*) y marca **Conservar registro** (*Preserve log*). Observa cada página durante 10 segundos sin tocar nada y cuenta las peticiones. Después pulsa el enlace de recarga de `/servidor` y mira qué pasa en el panel y en la terminal.
3. Pulsa `Ctrl+U` en cada página para ver el código fuente que ha llegado del servidor. En `/cliente`, abre también <http://localhost:3001/reloj.js>.
4. Desactiva JavaScript en las DevTools y recarga las dos páginas. En Chrome o Edge: `Ctrl+Shift+P`, escribe `JavaScript` y elige **Desactivar JavaScript** (*Disable JavaScript*). En Firefox: `F1` dentro de las DevTools y marca **Desactivar JavaScript** en la configuración avanzada. Vuelve a activarlo al terminar.
5. Compara la hora de `/servidor` con la de `/cliente` y con la de tu reloj. Después para el servidor (`Ctrl+C`) y arráncalo en la zona horaria de Madrid con `TZ=Europe/Madrid npm start`. Recarga las dos páginas y vuelve a comparar. Al terminar, arráncalo otra vez con `npm start`.
6. Abre <http://localhost:3001/no-existe> y mira en el panel Red el código de la respuesta.
7. Completa el `README.md`.

## Especificación

Respeta estos nombres y formatos para poder comparar tu trabajo con la solución de referencia:

| Elemento | Debe ser |
|----------|----------|
| README | Las secciones «Cómo ejecutarlo» y «Comparativa» de la plantilla |
| Comparativa | Las dos columnas de cada fila completas, sin cambiar la primera columna |
| Código | Sin cambios: el ejercicio se hace con el código de partida |

## Comprueba tu solución

- <http://localhost:3001/servidor> muestra `Hora del servidor (Asia/Tokyo)` y la hora con el formato `9:05:07` (sin cero delante de la hora). Es la hora de Japón: siete horas más que en la España peninsular en verano y ocho en invierno (Japón no cambia de hora). Si recargas al cabo de un segundo, la hora cambia, y en la terminal aparece una línea `📥 GET /servidor` nueva.
- En `/cliente`, la hora cambia cada segundo **sin recargar**. Con el panel Red abierto, mientras pasa el tiempo no aparece ninguna petición nueva, ni tampoco ninguna línea nueva en la terminal.
- En el panel Red, `/servidor` y `/cliente` llegan con `Content-Type: text/html` y `/reloj.js` con un tipo JavaScript. <http://localhost:3001/no-existe> responde con el código `404`.
- Con `Ctrl+U` en `/servidor` no aparece `new Date()`: solo la hora ya escrita. En `/cliente` aparece `--:--:--` en lugar de la hora, y en `reloj.js` puedes leer todo el código.
- Con JavaScript desactivado, `/servidor` sigue mostrando la hora y `/cliente` se queda en `--:--:--`.
- `/cliente` muestra siempre la hora de tu equipo. Con `TZ=Europe/Madrid`, `/servidor` dice `(Europe/Madrid)` y su hora coincide con la de `/cliente` (si estás en Canarias, va una hora por delante).
- En tu tabla, la fila de las peticiones en 10 segundos coincide con lo que has visto en el panel Red.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria y su puerto, y se acumula uno por cada ejercicio (tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
