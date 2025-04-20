// src/components/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { nombre, descripcion, precio };

        try {
            const response = await axios.post('http://localhost:5000/api/products', newProduct);
            console.log('Producto creado:', response.data);
        } catch (error) {
            console.error('Error al crear producto:', error);
        }
    };

    return (
        <div>
            <h2>Agregar Producto</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre"
                    required
                />
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Descripción"
                    required
                />
                <input
                    type="number"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    placeholder="Precio"
                    required
                />
                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    );
};

export default AddProduct;  // Asegúrate de exportar correctamente
