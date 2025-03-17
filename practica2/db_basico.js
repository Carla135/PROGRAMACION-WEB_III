const mysql = require('mysql2');

function connectWithCallbacks(callback) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'trabajo'
    });

    connection.connect((error) => {
        if (error) {
            console.error('Error de conexión:', error);
            return;
        }
        console.log('Conectado con Basico');

        connection.query('SELECT * FROM users', (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return;
            }
            console.log('Resultados:', results);
            callback(); // Llamas al callback al final
        });
    });
}

module.exports = connectWithCallbacks;
