import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import api from '../services/api'; // Asegúrate de que este archivo esté configurado para Axios

const ProductForm = ({ selectedProduct, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: ''
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        nombre: selectedProduct.nombre,
        precio: selectedProduct.precio,
        stock: selectedProduct.stock
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData); // Verifica los datos enviados

    if (selectedProduct) {
      // Hacer la solicitud PUT con Axios
      api.put(`/productos/editar/${selectedProduct.id}`, formData)
        .then(() => {
          alert('Producto editado correctamente');
          onSuccess();
        })
        .catch((error) => {
          console.error('Error al editar producto:', error.response ? error.response.data : error.message);
          alert('Error al editar producto. Intenta nuevamente.');
        });
    } else {
      // Hacer la solicitud POST para agregar el producto
      api.post('/productos/guardar', formData)
        .then(() => {
          alert('Producto agregado correctamente');
          onSuccess();
        })
        .catch((error) => {
          console.error('Error al agregar producto:', error);
          alert('Error al agregar producto. Intenta nuevamente.');
        });
    }
  };

  return (
    <Container sx={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Typography variant="h5" gutterBottom color="primary">
        {selectedProduct ? 'Editar Producto' : 'Agregar Producto'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            type="number"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            type="number"
            required
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: '100%',
            borderRadius: '5px',
          }}
        >
          {selectedProduct ? 'Guardar Cambios' : 'Agregar Producto'}
        </Button>
      </form>
    </Container>
  );
};

export default ProductForm;
