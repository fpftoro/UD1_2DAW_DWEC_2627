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
