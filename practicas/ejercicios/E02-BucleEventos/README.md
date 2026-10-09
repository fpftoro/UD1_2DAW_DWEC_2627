# El bucle de eventos paso a paso

<!-- Para cada fragmento:
     1. Escribe tu PREDICCIÓN de la salida por consola ANTES de ejecutarlo.
        No la cambies después: no importa acertar.
     2. Ejecútalo paso a paso en JS Visualizer 9000 (https://www.jsv9000.app/) y
        anota el RESULTADO REAL, una línea de la consola por fila, sin comillas.
     3. Explica el resultado usando: pila de llamadas, APIs del navegador, cola de tareas
        (y cola de microtareas en el fragmento 4) y bucle de eventos.
     Borra los comentarios como este cuando termines. -->

## Fragmento 1

```js
console.log('A');

function saludar() {
  console.log('B');
}

saludar();
console.log('C');
```

| Orden | Predicción | Resultado real |
|------:|------------|----------------|
| 1 | | |
| 2 | | |
| 3 | | |

### Explicación

<!-- Qué pasa en la pila, las APIs del navegador, las colas y el bucle de eventos.
     Si tu predicción falló, explica por qué. -->

## Fragmento 2

```js
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

console.log('3');
```

| Orden | Predicción | Resultado real |
|------:|------------|----------------|
| 1 | | |
| 2 | | |
| 3 | | |

### Explicación

<!-- Qué pasa en la pila, las APIs del navegador, las colas y el bucle de eventos.
     Si tu predicción falló, explica por qué. -->

![Fragmento 2: la función del temporizador pasa de la cola a la pila](img/fragmento2.png)

## Fragmento 3

```js
setTimeout(() => {
  console.log('lento');
}, 1000);

setTimeout(() => {
  console.log('rápido');
  setTimeout(() => {
    console.log('anidado');
  }, 0);
}, 0);

console.log('inicio');
```

| Orden | Predicción | Resultado real |
|------:|------------|----------------|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |

### Explicación

<!-- Qué pasa en la pila, las APIs del navegador, las colas y el bucle de eventos.
     Si tu predicción falló, explica por qué. -->

## Fragmento 4

```js
console.log('inicio');

setTimeout(() => {
  console.log('temporizador');
}, 0);

Promise.resolve().then(() => {
  console.log('promesa');
});

console.log('fin');
```

| Orden | Predicción | Resultado real |
|------:|------------|----------------|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |

### Explicación

<!-- Qué pasa en la pila, las APIs del navegador, las colas y el bucle de eventos.
     Si tu predicción falló, explica por qué. -->

![Fragmento 4: la cola de microtareas se vacía antes que la cola de tareas](img/fragmento4.png)
