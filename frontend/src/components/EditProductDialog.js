import React, { useState } from 'react';
import EditProductDialog from '../components/EditProductDialog'; // Asegúrate de la ruta correcta

const ProductsPage = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    const handleEdit = (product) => {
        setProductToEdit(product);
        setOpenDialog(true);
    };

    return (
        <div>
            <h1>Productos</h1>
            {/* Aquí lista tus productos y un botón para editar */}
            <EditProductDialog 
                open={openDialog} 
                onClose={() => setOpenDialog(false)} 
                productToEdit={productToEdit} 
            />
        </div>
    );
};

export default ProductsPage;