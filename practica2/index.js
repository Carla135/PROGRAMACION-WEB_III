const connection = require('./db');

connection.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.error('Error en la consulta:', err);
    return;
  }
  console.log('Usuarios en la base de datos:', results);
  connection.end(); // Cierra la conexión después de la consulta
});
