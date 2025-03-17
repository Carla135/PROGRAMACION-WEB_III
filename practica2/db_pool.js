const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'trabajo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function connectWithPool() {
    console.time("Pool Connection");

    try {
        const connection = await pool.getConnection();
        console.log('Conectado con Pool');

        const [rows] = await connection.execute('SELECT * FROM users');
        console.log('Resultados:', rows);

        console.timeEnd("Pool Connection");
        connection.release();
    } catch (error) {
        console.error('Error en la consulta:', error);
    }
}

module.exports = connectWithPool; // Asegúrate de exportarlo correctamente
