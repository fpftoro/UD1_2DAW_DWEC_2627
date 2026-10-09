# E07 · Evaluar frameworks

**Tipo:** autocorrección

Compara tres frameworks o librerías de interfaz con criterios objetivos y compara el mismo contador con y sin framework.

**CE:** RA1 f

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno del tema 5 (apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

Sirve el contador sin framework con `npx --yes serve@14.2.6 --listen 3007 contador-js` en la terminal del contenedor y ábrelo en <http://localhost:3007> (si no responde, el panel **Puertos** de VS Code da la dirección exacta). El proyecto del framework se crea también dentro del contenedor, pero **fuera** de la carpeta del repositorio (en `~/contador`), para no subir sus dependencias; después copias un fichero a `contador-framework/`. Su servidor de desarrollo usa el puerto 5177, que también se redirige solo.

El JavaScript lo aprenderás en la UD2: en este ejercicio **no tienes que programar**. El contador sin framework ya está hecho y el del framework lo trae la plantilla oficial de Vite.

## Requisitos

1. Elige tres entre: Angular, React, Vue, Svelte, Solid o Lit.
2. Recoge datos **reales y actuales** de cada uno, indicando la fecha de consulta y las fuentes.
3. Describe un **contexto** concreto (por ejemplo: «empresa mediana que desarrolla aplicaciones de gestión internas, con un equipo que ya conoce Java»).
4. Construye una **matriz de decisión ponderada** con al menos seis criterios, justificando el peso de cada uno según ese contexto.
5. Escribe una conclusión coherente con la matriz.
6. Lee `contador-js/contador.js`, que ya está hecho, y pruébalo: sírvelo con `npx --yes serve@14.2.6 --listen 3007 contador-js` y ábrelo en <http://localhost:3007>.
7. Crea el contador con framework a partir de la plantilla oficial de Vite de **uno** de tus tres frameworks. Angular no tiene plantilla de Vite: si está entre tus tres, usa otro. En una terminal nueva del contenedor (deja la del paso 6 en marcha), cambiando `vue` por `react`, `svelte`, `solid` o `lit` si eliges otro:

   ```bash
   cd ~
   npx --yes create-vite@9.2.1 contador --template vue --no-interactive
   cd contador
   npm install
   npm run dev -- --port 5177
   ```

   Abre <http://localhost:5177>: la página de bienvenida trae un botón **Count is 0** que suma 1 en cada clic.
8. Con `npm run dev` en marcha, abre el fichero del contador (tabla de abajo) con `code`, por ejemplo `code ~/contador/src/components/HelloWorld.vue`. Cambia el texto `Count is` por `Valor:`, guarda y mira el navegador **sin recargar**. Haz lo mismo en `contador-js/index.html` con el texto del botón (`Sumar` por `Suma uno`) y compara.
9. Copia el fichero del contador a `contador-framework/`:

   | Plantilla | Fichero del contador |
   |-----------|----------------------|
   | `react` | `src/App.jsx` |
   | `vue` | `src/components/HelloWorld.vue` |
   | `svelte` | `src/lib/Counter.svelte` |
   | `solid` | `src/App.jsx` |
   | `lit` | `src/my-element.js` |

10. Compara los dos contadores en el `README.md`.

## Especificación

Respeta estos nombres y formatos para poder comparar tu trabajo con la solución de referencia:

| Elemento | Debe ser |
|----------|----------|
| README | Secciones «Contexto», «Datos recogidos», «Matriz de decisión», «Conclusión» y «Contador con y sin framework», con las tablas de la plantilla |
| Datos recogidos | Tres columnas con el nombre de cada framework; «Fecha de consulta» con una fecha; al menos tres fuentes con su URL |
| Matriz | Al menos seis criterios; peso entero positivo; puntuaciones enteras de 1 a 5; última fila `Total` con la suma de peso × puntuación de cada framework |
| Conclusión | Nombra el framework con mayor total en la matriz |
| Contador sin framework | `contador-js/contador.js`, como en el código de partida |
| Contador con framework | El fichero del contador de la plantilla de Vite (tabla del requisito 9) en `contador-framework/`, con el texto `Valor:` del requisito 8 |

## Comprueba tu solución

- Recalcula a mano la fila **Total**: para cada framework, la suma de peso × puntuación de todos los criterios. Debe coincidir con lo que has escrito.
- Hay al menos seis criterios, todos los pesos son enteros positivos y todas las puntuaciones son enteros de 1 a 5.
- La conclusión elige el framework con el **mayor total**. Si eliges otro, la matriz y la conclusión se contradicen: revisa los pesos.
- Cada peso tiene una justificación que menciona el contexto que has descrito.
- «Datos recogidos» tiene la fecha de consulta y al menos tres fuentes con su URL.
- Los dos contadores empiezan en `0` y, tras tres clics, muestran `3`.
- Al cambiar el texto en el fichero del framework, el navegador lo muestra sin que recargues: es la recarga en caliente (*HMR*) de Vite. Con `react` y `vue`, la cuenta se conserva; con `svelte`, `solid` y `lit`, vuelve a `0`. En `contador-js` no cambia nada hasta que recargas tú, y al recargar la cuenta vuelve a `0`.
- El framework con el que has hecho el contador es uno de los tres de tu matriz.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria y su puerto, y se acumula uno por cada ejercicio (tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Comprueba que has copiado el fichero del contador a `contador-framework/`: el proyecto de `~/contador` está **dentro** del contenedor y se borra con él.
2. Cierra la ventana de VS Code del ejercicio.
3. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
