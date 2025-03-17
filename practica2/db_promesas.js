const mysql = require('mysql2/promise');

async function connectWithPromises() {
    console.time("Promise Connection");

    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'trabajo'
        });

        console.log('Conectado con Promesas');

        const [rows] = await connection.execute('SELECT * FROM users');
        console.log('Resultados:', rows);

        console.timeEnd("Promise Connection");
        await connection.end();
    } catch (error) {
        console.error('Error de conexión:', error);
    }
}

module.exports = connectWithPromises;
