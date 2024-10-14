import React, { useState } from 'react';

const ProductTable = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'smartphone', price: 5000, stock: 30 },
        { id: 2, name: 'laptop', price: 7299, stock: 40 },
        { id: 3, name: 'smartwatch', price: 599, stock: 30 },
        { id: 4, name: 'headphone', price: 1074, stock: 25 },
        { id: 5, name: 'tablet', price: 1455, stock: 55 },
    ]);

    const [editingProduct, setEditingProduct] = useState(null);
    const [error, setError] = useState('');

    const handleEdit = (product) => {
        setEditingProduct({ ...product });
        setError('');
    };

    const handleSave = () => {
        if (!editingProduct.name || !editingProduct.price || !editingProduct.stock) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        if (isNaN(editingProduct.price) || isNaN(editingProduct.stock)) {
            setError('El precio y el stock deben ser números.');
            return;
        }

        // Actualizar el estado de los productos
        setProducts(products.map(product =>
            product.id === editingProduct.id ? editingProduct : product
        ));
        setEditingProduct(null); // Limpiar el estado de edición
        setError(''); // Limpiar mensajes de error
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numValue = (name === 'price' || name === 'stock') ? parseFloat(value) : value;
        setEditingProduct({ ...editingProduct, [name]: isNaN(numValue) ? '' : numValue });
    };

    return (
        <div>
            <h1>Dashboard Productos</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                                {editingProduct?.id === product.id ? (
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={editingProduct.name} 
                                        onChange={handleChange} 
                                    />
                                ) : (
                                    product.name
                                )}
                            </td>
                            <td>
                                {editingProduct?.id === product.id ? (
                                    <input 
                                        type="number" 
                                        name="price"
                                        value={editingProduct.price} 
                                        onChange={handleChange} 
                                    />
                                ) : (
                                    product.price
                                )}
                            </td>
                            <td>
                                {editingProduct?.id === product.id ? (
                                    <input 
                                        type="number" 
                                        name="stock"
                                        value={editingProduct.stock} 
                                        onChange={handleChange} 
                                    />
                                ) : (
                                    product.stock
                                )}
                            </td>
                            <td>
                                {editingProduct?.id === product.id ? (
                                    <button onClick={handleSave}>Guardar Cambios</button>
                                ) : (
                                    <button onClick={() => handleEdit(product)}>Editar</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;