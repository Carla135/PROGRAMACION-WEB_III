const connectWithCallbacks = require('./db_basico');
const connectWithPromises = require('./db_promesas');
const connectWithPool = require('./db_pool');

console.log('Ejecutando conexión con basico...');
console.time('Tiempo con basico');
connectWithCallbacks(() => {
    console.timeEnd('Tiempo con basico');

    console.log('Ejecutando conexión con promesas...');
    console.time('Tiempo con promesas');
    connectWithPromises().then(() => {
        console.timeEnd('Tiempo con promesas');

        console.log('Ejecutando conexión con pool...');
        console.time('Tiempo con pool');
        connectWithPool().then(() => {
            console.timeEnd('Tiempo con pool');
        });
    });
});
