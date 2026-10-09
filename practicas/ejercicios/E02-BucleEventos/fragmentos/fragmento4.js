console.log('inicio');

setTimeout(() => {
  console.log('temporizador');
}, 0);

Promise.resolve().then(() => {
  console.log('promesa');
});

console.log('fin');
