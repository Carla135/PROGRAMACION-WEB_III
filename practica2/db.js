const mysql = require('mysql2');

// Configurar conexión con MySQL en XAMPP
const connection = mysql.createConnection({
  host: 'localhost', // Servidor local
  user: 'root', // Usuario por defecto en XAMPP
  password: '', // En XAMPP, root no tiene contraseña por defecto
  database: 'trabajo' // Nombre de la base de datos creada en phpMyAdmin
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con MySQL:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL en XAMPP');
});

// Exportar conexión para usar en otros archivos
module.exports = connection;
