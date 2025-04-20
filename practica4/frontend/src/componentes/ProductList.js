import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: "", descripcion: "", precio: "" });
  const [editando, setEditando] = useState(false);
  const [editId, setEditId] = useState(null);

  const obtenerProductos = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProductos(res.data);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (editando) {
      await axios.put(`http://localhost:5000/api/products/${editId}`, form);
    } else {
      await axios.post("http://localhost:5000/api/products", form);
    }
    setForm({ nombre: "", descripcion: "", precio: "" });
    setEditando(false);
    setEditId(null);
    obtenerProductos();
  };

  const editarProducto = (producto) => {
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
    });
    setEditando(true);
    setEditId(producto.id);
  };

  const eliminarProducto = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    obtenerProductos();
  };

  return (
    <div>
      <form onSubmit={manejarSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={manejarCambio}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={manejarCambio}
          className="w-full border p-2"
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={manejarCambio}
          className="w-full border p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editando ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td className="border p-2">{producto.nombre}</td>
              <td className="border p-2">{producto.descripcion}</td>
              <td className="border p-2">{producto.precio}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => editarProducto(producto)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarProducto(producto.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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

export default ProductList;
