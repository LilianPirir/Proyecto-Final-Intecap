import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Snackbar
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import useFetchProductos from '../hooks/useFetchProductos';
import ProductForm from './ProductForm';
import api from '../services/api';
const ProductosDashboard = () => {
  const { productos, loading, error } = useFetchProductos();
  const [openForm, setOpenForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleOpenForm = (product) => {
    setSelectedProduct(product);
    setOpenForm(true);
  };

  const handleCloseForm = (updatedProduct) => {
    if (updatedProduct) {
      setSnackbarMessage(selectedProduct ? 'Producto editado correctamente' : 'Producto agregado correctamente');
      setSnackbarOpen(true);
    }
    setSelectedProduct(null);
    setOpenForm(false);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await api.delete(`/productos/eliminar/${productId}`);
        setSnackbarMessage('Producto eliminado correctamente');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message || 'Error desconocido'}</Typography>;

  return (
    <Container sx={{ padding: '30px' }}>
      <Typography variant="h4" gutterBottom color="nomar"> {/* Cambia 'nomar' por el color deseado */}
        Gestión de Productos
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpenForm(null)}
        sx={{ marginBottom: '20px' }}
      >
        Agregar Producto
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'green' }}> {/* Color de fondo verde */}
              <TableCell>
                <Typography variant="h6" color="white">ID</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" color="white">Nombre</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" color="white">Precio</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" color="white">Stock</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" color="white">Acciones</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>{producto.id}</TableCell>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>${producto.precio}</TableCell>
                <TableCell>{producto.stock}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleOpenForm(producto)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteProduct(producto.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openForm} onClose={() => handleCloseForm()}>
        <DialogContent>
          <ProductForm selectedProduct={selectedProduct} onSuccess={handleCloseForm} />
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default ProductosDashboard;
