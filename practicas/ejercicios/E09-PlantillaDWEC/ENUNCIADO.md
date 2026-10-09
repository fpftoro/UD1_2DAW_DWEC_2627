# E09 · La plantilla de proyecto del curso (integrador)

**Tipo:** autocorrección

Monta la plantilla de proyecto que usarás en las prácticas del curso, con entorno reproducible, calidad del código, pruebas e integración continua, alrededor de una pequeña aplicación que ya está hecha.

**CE:** RA1 a, e, f

## Punto de partida

La aplicación ya está programada: una calculadora de precios con IVA y descuento. **No tienes que escribir código ni tests**: el JavaScript lo aprenderás en la UD2 y a escribir tus propios tests empezarás en la UD3. Tu trabajo es montar las **herramientas** alrededor de ese código, ejecutarlas y explicar lo que hacen.

| Fichero | Qué es |
|---------|--------|
| `index.html` | La página: el formulario y el resultado. Carga `/src/main.js` como módulo |
| `src/main.js` | Comportamiento: atiende el formulario y escribe el resultado |
| `src/precios.js` | Lógica: `precioConIva` y `aplicarDescuento`, documentadas con JSDoc |
| `src/precios.test.js` | Once tests de `src/precios.js` para Vitest |
| `src/style.css` | Estilos |
| `eslint.config.js` | Configuración de ESLint con las reglas `no-var`, `prefer-const` y `eqeqeq` |
| `package.json` | Solo el nombre y `"type": "module"`. Las dependencias y los scripts los añades tú |

No cambies estos ficheros, salvo en el requisito 8, donde cambias un número a propósito y luego lo dejas como estaba.

## Requisitos

1. **Dev Container.** Crea `.devcontainer/devcontainer.json` a partir del del tema 5 (apartado 5.4.4) con lo que pide la especificación. Abre la carpeta en el contenedor (**Dev Containers: Reopen in Container**): todo lo demás se hace en su terminal.
2. **Git.** Crea el `.gitignore` (tema 5, apartado 5.6.3) **antes** de instalar nada, para no subir `node_modules/`.
3. **Dependencias y scripts.** Instala las herramientas como dependencias de desarrollo y añade los scripts a `package.json` (tema 5, apartados 5.3.3 y 5.3.4). Puedes editar el fichero a mano o usar estas órdenes:

   ```bash
   npm install -D vite vitest eslint @eslint/js globals prettier
   npm pkg set scripts.dev=vite "scripts.build=vite build" "scripts.preview=vite preview" scripts.test=vitest "scripts.lint=eslint ." "scripts.format=prettier --write ."
   ```

4. **Prettier.** Crea `.prettierrc` (tema 6, apartado 6.3.2) con los valores de la especificación y `.prettierignore`.
5. **Prueba la aplicación** con `npm run dev` en <http://localhost:5173>. Con precio `100`, IVA del 21 % y descuento `10` debe mostrar **Precio final: 108,90 €**; con un descuento de `150`, el mensaje de error.
6. **Ejecuta las herramientas** y pega su salida en la sección «Calidad» del `README.md`: `npm run lint`, `npx prettier --check .`, `npx vitest run` y `npm run build`.
7. **Lee los tests** de `src/precios.test.js`. En la sección «Pruebas» del `README.md`, explica qué comprueban dos de ellos, uno con `toThrow`, y qué pasaría si alguien cambiara `src/precios.js` y dejara de redondear.
8. **Integración continua.** Crea `.github/workflows/ci.yml` a partir del del tema 6 (apartado 6.8) con los pasos de la especificación, súbelo a un repositorio tuyo de GitHub y comprueba en la pestaña **Actions** que la ejecución termina en verde. Después, rómpela a propósito:
   1. En `src/precios.test.js`, cambia el valor esperado del primer test, `toBe(121)`, por `toBe(120)`. Haz un commit, súbelo y guarda la captura de la ejecución en rojo en `img/ci-rojo.png`.
   2. Vuelve a dejar `121`, haz otro commit y súbelo. La última ejecución debe quedar en verde; su captura va en `img/ci.png`.
   3. Explica en la sección «Integración continua» qué paso falló y por qué.
9. **README** completo según su plantilla, con la sección «Arquitectura».
10. **Commits pequeños y descriptivos** desde el principio.

## Especificación

Respeta estos nombres y formatos para poder comparar tu trabajo con la solución de referencia:

| Elemento | Debe ser |
|----------|----------|
| Dev Container | `.devcontainer/devcontainer.json` con la imagen `mcr.microsoft.com/devcontainers/javascript-node:24`, las extensiones `dbaeumer.vscode-eslint`, `esbenp.prettier-vscode` y `vitest.explorer`, `5173` en `forwardPorts` y `npm install` en `postCreateCommand` |
| `package.json` | `"type": "module"`; scripts `dev`, `build`, `test`, `lint` y `format`; `vite`, `vitest`, `eslint`, `@eslint/js`, `globals` y `prettier` en `devDependencies`. Con su `package-lock.json` |
| Código de partida | `index.html`, `src/` y `eslint.config.js`, al terminar, como en el código de partida |
| Prettier | `.prettierrc` con `"singleQuote": true`, `"semi": true` y `"printWidth": 100`; `.prettierignore` con `*.md`, `dist/`, `coverage/` y `package-lock.json` |
| Calidad | Sección «Calidad» del README con la salida de `npm run lint` sin errores, `npx prettier --check .` correcto, `npx vitest run` con los 11 tests en verde y `npm run build` con los ficheros de `dist/` |
| Pruebas | Sección «Pruebas» del README con la explicación de dos tests (uno con `toThrow`) y de qué pasaría sin redondeo |
| CI | `.github/workflows/*.yml` que se ejecuta en `push` a `main` con `npm ci`, lint, comprobación de formato, tests y build; `img/ci-rojo.png` con la ejecución fallida del requisito 8 e `img/ci.png` con la última ejecución, en verde |
| Otros | `.gitignore` con `node_modules` y `dist`; `README.md` con las secciones de la plantilla; sin `node_modules/` ni `dist/` en el repositorio |

## Comprueba tu solución

- Al abrir la carpeta en el contenedor, `npm install` se ejecuta solo y `node --version` muestra la versión 24.
- `git status` no muestra `node_modules/` ni `dist/`, ni siquiera después de `npm install` y `npm run build`. Si alguno aparece en un commit, el `.gitignore` llegó tarde.
- Con `npm run dev`, la página muestra **Precio final: 108,90 €** con precio `100`, IVA del 21 % y descuento `10`, y **❌ El descuento debe estar entre 0 y 100** con un descuento de `150`.
- `npm run lint` no muestra ningún error; `npx prettier --check .` termina con `All matched files use Prettier code style!`; `npx vitest run` muestra `Tests  11 passed (11)`; y `npm run build` lista los ficheros que crea en `dist/` (un `index.html` y, en `assets/`, un `.js` y un `.css` con un código en el nombre).
- Borra `node_modules/` y ejecuta `npm ci`: tiene que instalar sin errores. Si falla, falta `package-lock.json` o no coincide con `package.json`, y la CI fallará igual.
- `git diff` entre el código de partida y tu versión final de `index.html`, `src/` y `eslint.config.js` no muestra cambios. El `121` → `120` del requisito 8 aparece en tu historial y está deshecho en el último commit.
- En la pestaña **Actions**, la ejecución con `120` falla en el paso de los tests y la última está en verde. Tu explicación dice que lo que estaba mal era el valor esperado del test, no la función.
- En «Pruebas», si dices qué tests fallarían sin redondeo, compruébalo: quita el redondeo de `src/precios.js`, ejecuta `npx vitest run` y vuelve a dejarlo como estaba.
- La sección «Arquitectura» responde a los tres puntos de la plantilla: dónde se ejecuta el código y qué se sube al servidor, cómo se carga `main.js` y qué hace Vite con él al compilar, y qué capa hay en cada fichero.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria y su puerto, y se acumula uno por cada ejercicio (tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
