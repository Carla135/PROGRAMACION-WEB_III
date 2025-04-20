// src/components/EditProduct.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProduct = ({ productId, onSave, onCancel }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');

    useEffect(() => {
        // Obtener el producto por ID
        axios.get(`http://localhost:5000/api/products/${productId}`)
            .then(response => {
                const product = response.data;
                setNombre(product.nombre);
                setDescripcion(product.descripcion);
                setPrecio(product.precio);
            })
            .catch(error => console.error('Error fetching product:', error));
    }, [productId]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedProduct = { nombre, descripcion, precio: parseFloat(precio) };

        axios.put(`http://localhost:5000/api/products/${productId}`, updatedProduct)
            .then(response => {
                onSave(response.data);
            })
            .catch(error => console.error('Error updating product:', error));
    };

    return (
        <div>
            <h2>Editar Producto</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre"
                    required
                />
                <input
                    type="text"
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
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditProduct;
