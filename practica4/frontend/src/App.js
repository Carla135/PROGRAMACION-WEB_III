import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap esté importado

function App() {
  // Estado para almacenar los productos
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'gds', descripcion: '', precio: 12.00 },
    { id: 2, nombre: 'frutilla', descripcion: 'fruta', precio: 3.00 },
    { id: 3, nombre: 'platano', descripcion: 'fruta', precio: 13.00 },
    { id: 4, nombre: 'manzana', descripcion: 'frutas', precio: 12.00 },
    { id: 5, nombre: 'pera', descripcion: 'fruta tropical', precio: 15.00 },
    { id: 6, nombre: 'mandarina', descripcion: 'fruta', precio: 13.00 },
  ]);

  // Estado para el formulario
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: ''
  });

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Agregar el nuevo producto al estado
    const newProductWithId = {
      ...newProduct,
      id: productos.length + 1, // Asignar un ID único
      precio: parseFloat(newProduct.precio), // Asegurarse de que el precio sea un número
    };
    
    setProductos([...productos, newProductWithId]);

    // Limpiar el formulario
    setNewProduct({
      nombre: '',
      descripcion: '',
      precio: ''
    });
  };

  // Función para eliminar un producto
  const handleDelete = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  return (
    <div className="App">
      <h1>Lista de Productos</h1>

      {/* Formulario para agregar un nuevo producto */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={newProduct.nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <input
            type="text"
            name="descripcion"
            className="form-control"
            value={newProduct.descripcion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            className="form-control"
            value={newProduct.precio}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar Producto
        </button>
      </form>

      {/* Tabla de productos */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.precio}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => alert(`Editar producto con ID: ${producto.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(producto.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
