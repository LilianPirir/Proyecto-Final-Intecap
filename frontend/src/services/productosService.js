import api from './api'; // Asegúrate de que la ruta sea correcta
// Obtener productos
export const getProductos = async () => {
  try {
    const response = await api.get('/productos/listar');
    return response.data; // Asegúrate de que estás obteniendo lo que necesitas
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error; // Lanza el error para que sea manejado en el hook
  }
};

// Guardar producto
export const saveProducto = async (producto) => {
  try {
    const response = await api.post('/productos/guardar', producto);
    return response.data; // Devuelve el producto guardado
  } catch (error) {
    console.error('Error al guardar el producto:', error);
    throw error;
  }
};

// Editar producto
export const editarProducto = async (id, data) => {
  try {
    const response = await api.put(`/productos/editar/${id}`, data);
    return response.data; // Devuelve el producto editado
  } catch (error) {
    console.error('Error al editar el producto:', error);
    throw error;
  }
};

// Otras funciones que necesites exportar
