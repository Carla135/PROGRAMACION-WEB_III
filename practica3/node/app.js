const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tienda_electrodomesticos'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Configuración de Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Configurar la carpeta 'views'
app.use(bodyParser.urlencoded({ extended: true }));  // Para procesar datos del formulario

// Ruta principal para mostrar la lista de usuarios
app.get('/', (req, res) => {
  db.query('SELECT * FROM usuario', (err, resultados) => {
    if (err) throw err;
    res.render('index', { usuarios: resultados });
  });
});

// Ruta para crear un nuevo usuario (muestra el formulario)
app.get('/crear', (req, res) => {
  res.render('crear');
});

// Ruta para guardar un nuevo usuario en la base de datos
app.post('/crear', (req, res) => {
  const { nombre, correo, telefono, rol } = req.body;

  const query = 'INSERT INTO usuario (nombre, correo, telefono, rol) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, correo, telefono, rol], (err, resultados) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Ruta para editar un usuario (muestra el formulario con los datos actuales)
app.get('/editar/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM usuario WHERE id = ?', [id], (err, resultados) => {
    if (err) throw err;
    res.render('editar', { usuario: resultados[0] });
  });
});

// Ruta para actualizar un usuario en la base de datos
app.post('/editar/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, correo, telefono, rol } = req.body;

  const query = 'UPDATE usuario SET nombre = ?, correo = ?, telefono = ?, rol = ? WHERE id = ?';
  db.query(query, [nombre, correo, telefono, rol, id], (err, resultados) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Ruta para eliminar un usuario de la base de datos
app.get('/eliminar/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM usuario WHERE id = ?', [id], (err, resultados) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Configuración del puerto de la aplicación
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
