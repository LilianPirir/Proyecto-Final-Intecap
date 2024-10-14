// src/hooks/useFetchProductos.js

import { useState, useEffect } from 'react';
import { getProductos } from '../services/productosService'; // Importa getProductos

const useFetchProductos = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await getProductos(); // Llama a getProductos
        setProductos(response);
        setError(null);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
        setError(error);
      }
    };

    fetchProductos();
  }, []);

  return { productos, error };
};

export default useFetchProductos;
