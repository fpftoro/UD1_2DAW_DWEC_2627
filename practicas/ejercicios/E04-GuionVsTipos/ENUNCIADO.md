# E04 · Guion frente a tipos

**Tipo:** autocorrección

Comprueba en la práctica las ventajas e inconvenientes del tipado dinámico de JavaScript.

**CE:** RA1 c, d

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno del tema 5 (apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

Ejecuta las llamadas con `node` en la terminal de VS Code. El contenedor trae la extensión Error Lens, que muestra junto a cada línea los errores que marca `@ts-check`.

## Punto de partida

`estadisticas.js` ya trae tres funciones escritas: `media`, `maximo` y `aprobados`. Funcionan bien con datos correctos y **no comprueban** los tipos de los datos que reciben. No hace falta que entiendas cada línea: el objetivo es observar qué hace JavaScript cuando les pasas datos incorrectos. **No las modifiques.**

## Requisitos

1. Ejecuta las tres funciones con los datos correctos del ejemplo (`[7, 5.5, 8, 4]`) para ver qué devuelven normalmente.
2. Llama a las funciones con los datos **incorrectos** de la tabla del `README.md`, desde un script propio (por ejemplo, `pruebas.js`) o desde la consola de Node. Anota qué devuelve cada llamada y si JavaScript avisa del error.
3. Crea `estadisticas-tipado.js`: una copia de `estadisticas.js` con `// @ts-check` en la primera línea y cada función documentada con JSDoc (`@param` y `@returns` con sus tipos).
4. Abre `estadisticas-tipado.js` en VS Code, añade al final las mismas llamadas incorrectas y anota en el `README.md` cuáles marca como error **sin ejecutar nada**. Después, déjalas comentadas.
5. Completa la tabla de ventajas e inconvenientes del `README.md` apoyándote en lo que has observado.
6. (Opcional) Escribe la versión en TypeScript, `estadisticas.ts`, y compílala con `npx -p typescript tsc estadisticas.ts`.

## Especificación

Respeta estos nombres y formatos para poder comparar tu trabajo con la solución de referencia:

| Elemento | Debe ser |
|----------|----------|
| Ficheros | `estadisticas.js` (sin cambios), `estadisticas-tipado.js`, `README.md` |
| `estadisticas-tipado.js` | Primera línea `// @ts-check`; el mismo código que `estadisticas.js`, con las tres funciones exportadas y cada una con JSDoc que declara los parámetros como `number[]` y el resultado como `number` |
| README | La columna «Resultado» de «Datos incorrectos» con el valor exacto que se obtiene (`NaN`, `-Infinity`, un número) o el tipo de error (`TypeError`) |

## Comprueba tu solución

- Con datos correctos: `media([7, 5.5, 8, 4])` es `6.125`, `maximo([7, 5.5, 8, 4])` es `8` y `aprobados([7, 5.5, 8, 4])` es `3`.
- `media(['7', '5'])` da `37.5`. Si te da otra cosa, comprueba que no has modificado `estadisticas.js`.
- Solo dos de las siete llamadas de la tabla hacen que JavaScript avise, y lo hacen **al ejecutar**, con un `TypeError`. El resto devuelve un valor sin avisar.
- Con las siete llamadas incorrectas descomentadas, `npx -p typescript tsc --noEmit --allowJs --checkJs estadisticas-tipado.js` marca **cinco**: todas menos `media([])` y `maximo([])`, porque un array vacío es un `number[]` válido. Con las llamadas comentadas, no marca ninguna.
- Cada ventaja e inconveniente de tu tabla se apoya en algo que has visto en este ejercicio.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria y su puerto, y se acumula uno por cada ejercicio (tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
