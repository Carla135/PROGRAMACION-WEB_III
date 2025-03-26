const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.json());

// Configurar conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Cambia esto si tienes otro usuario
    password: "",  // Pon tu contraseña si tienes
    database: "tienda",
});

db.connect(err => {
    if (err) {
        console.error("Error conectando a MySQL:", err);
        return;
    }
    console.log("Conectado a MySQL");
});

// Endpoint para obtener productos
app.get("/producto", (req, res) => {
    db.query("SELECT * FROM productos", (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log("Productos encontrados:", results); // Mostrar los productos encontrados
        res.json(results);
    });
});

// Endpoint para agregar un producto
app.post("/producto", (req, res) => {
    const { nombre, precio, descripcion, stock } = req.body;

    // Verificar que todos los campos estén presentes
    if (!nombre || !precio || !descripcion || stock === undefined) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    console.log("Datos recibidos para agregar un producto:", { nombre, precio, descripcion, stock });

    const query = "INSERT INTO productos (nombre, precio, descripcion, stock) VALUES (?, ?, ?, ?)";
    db.query(query, [nombre, precio, descripcion, stock], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        // Imprimir en la consola cuando el producto se ha agregado
        console.log(`Producto agregado exitosamente: ${nombre}, Precio: ${precio}, Stock: ${stock}`);
        
        // Enviar respuesta al cliente
        res.json({ message: "Producto agregado exitosamente", id: results.insertId });
    });
});

// Iniciar servidor
const PORT = 3004; // Asegúrate de usar el puerto correcto
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
