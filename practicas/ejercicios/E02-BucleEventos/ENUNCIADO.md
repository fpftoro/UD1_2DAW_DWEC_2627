# E02 · El bucle de eventos paso a paso

**Tipo:** autocorrección

Predice en qué orden se ejecuta un código y compruébalo viendo, paso a paso, la pila de llamadas, las APIs del navegador, las colas y el bucle de eventos.

**CE:** RA1 b

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno del tema 5 (apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

Las predicciones y las explicaciones las escribes en VS Code, y los fragmentos los ejecutas en su terminal con `node fragmentos/fragmentoN.js`. JS Visualizer 9000 lo abres en el navegador de tu equipo.

## Punto de partida

En la carpeta `fragmentos/` hay cuatro fragmentos de código de dificultad creciente. El `README.md` es la plantilla que tienes que completar.

Herramienta: **[JS Visualizer 9000](https://www.jsv9000.app/)**. Pega el código, pulsa **Run** y avanza con **Step** para ver cada paso.

## Requisitos

Para cada fragmento, en este orden:

1. **Predice** la salida por consola y anótala en la columna «Predicción» del `README.md`, **antes** de ejecutar nada. No la cambies después: no importa acertar. Equivocarse y entender por qué es justo lo que enseña el ejercicio.
2. **Ejecuta** el fragmento paso a paso en JS Visualizer 9000 y anota la salida real en la columna «Resultado real», una línea de la consola por fila.
3. **Explica** el resultado en su apartado «Explicación» usando los términos **pila de llamadas**, **APIs del navegador**, **cola de tareas** y **bucle de eventos** (y **cola de microtareas** en el fragmento 4). Si tu predicción falló, explica por qué.
4. Guarda dos capturas de JS Visualizer 9000:
   - `img/fragmento2.png`: el momento en que la función del temporizador pasa de la cola de tareas a la pila.
   - `img/fragmento4.png`: el momento en que se ejecuta la promesa, con la cola de tareas todavía ocupada por el temporizador.

> 💬 El fragmento 4 usa una promesa, que estudiarás a fondo en la UD7. No hace falta que sepas escribir promesas: observa en qué cola entra su función y en qué orden se vacían las colas.

## Especificación

Respeta estos nombres y formatos para poder comparar tu trabajo con la solución de referencia:

| Elemento | Debe ser |
|----------|----------|
| README | Las cuatro secciones «Fragmento N» de la plantilla, sin cambiar el código ni el número de filas de las tablas |
| Predicción | Todas las celdas de la columna «Predicción» completas |
| Resultado real | En cada fila, el texto exacto que muestra la consola (por ejemplo, `rápido`), sin comillas |
| Explicación | Completa en los cuatro fragmentos |
| Capturas | `img/fragmento2.png` e `img/fragmento4.png` |

## Comprueba tu solución

- Ejecuta cada fragmento con `node fragmentos/fragmentoN.js`: la salida debe coincidir, línea a línea, con tu columna «Resultado real». Node.js usa el mismo modelo de bucle de eventos que el navegador para estos fragmentos.
- Tus predicciones siguen siendo las que escribiste antes de ejecutar, aunque fallen.
- Las cuatro explicaciones usan **pila de llamadas**, **APIs del navegador**, **cola de tareas** y **bucle de eventos**, y la del fragmento 4 también la **cola de microtareas**.
- En el fragmento 3 explicas por qué `anidado` sale antes que `lento`, aunque `lento` se programó primero.
- En el fragmento 4 explicas por qué la promesa sale antes que el temporizador, aunque los dos «esperan 0».
- `img/fragmento2.png` muestra la función del temporizador pasando a la pila, e `img/fragmento4.png` muestra la promesa ejecutándose con el temporizador todavía en la cola de tareas.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria y su puerto, y se acumula uno por cada ejercicio (tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
