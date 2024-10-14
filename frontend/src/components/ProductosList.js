import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Grid, 
  Container, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  InputLabel, 
  FormControl 
} from '@mui/material';
import api from '../services/api';

const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('nombre'); // Campo de búsqueda predeterminado es "nombre"

  useEffect(() => {
    // Cargar productos desde la API
    api.get('/productos/listar')
      .then((response) => {
        setProductos(response.data);
        setFilteredProductos(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los productos:', error);
      });
  }, []);

  // Función para obtener la imagen del producto
  const productImages = {
    laptop: 'https://img.global.news.samsung.com/pe/wp-content/uploads/2018/05/224-1024x683.jpg',
    smartphone: 'https://oechsle.vteximg.com.br/arquivos/ids/12625942-1000-1000/image-cf4c86b0499548b1a0a6624b99517aa4.jpg?v=638050458317470000',
    tablet: 'https://img.pacifiko.com/PROD/resize/1/500x500/NmRlMTBkYT.jpg',
    smartwatch: 'https://img.ltwebstatic.com/images3_spmp/2023/05/06/16833404678ab75b97df194b50beb869636f32be80_thumbnail_720x.webp',
    headphone: 'https://m.media-amazon.com/images/I/71Hx8b6HGbL._AC_SL1500_.jpg',
  };

  const getProductImage = (nombre) => {
    const lowerCaseName = nombre.toLowerCase();
    for (const [key, value] of Object.entries(productImages)) {
      if (lowerCaseName.includes(key)) {
        return value;
      }
    }
    return 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400';
  };

  // Función para manejar la búsqueda
  const handleSearch = () => {
    let filtered = productos;

    switch (searchField) {
      case 'id':
        filtered = productos.filter(producto => producto.id.toString().includes(searchTerm));
        break;
      case 'nombre':
        filtered = productos.filter(producto => producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
        break;
      case 'precio':
        filtered = productos.filter(producto => producto.precio.toString().includes(searchTerm));
        break;
      case 'stock':
        filtered = productos.filter(producto => producto.stock.toString().includes(searchTerm));
        break;
      default:
        break;
    }

    setFilteredProductos(filtered);
  };

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container sx={{ padding: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Lista de Productos
      </Typography>

      {/* Sección de búsqueda con botón para aplicar filtro */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="searchField-label">Buscar por</InputLabel>
            <Select
              labelId="searchField-label"
              value={searchField}
              label="Buscar por"
              onChange={handleSearchFieldChange}
            >
              <MenuItem value="id">ID</MenuItem>
              <MenuItem value="nombre">Nombre</MenuItem>
              <MenuItem value="precio">Precio</MenuItem>
              <MenuItem value="stock">Existencias</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={`Buscar por ${searchField}`}
            value={searchTerm}
            onChange={handleSearchTermChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSearch}
          >
            Aplicar Filtro
          </Button>
        </Grid>
      </Grid>

      {/* Lista de productos */}
      <Grid container spacing={3}>
        {filteredProductos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <Card sx={{ boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', backgroundColor: '#1c1c1e', color: '#fff' }}>
              <CardMedia
                component="img"
                height="140"
                image={getProductImage(producto.nombre)}
                alt={producto.nombre}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {producto.nombre}
                </Typography>
                <Typography variant="body2">
                  Precio: ${producto.precio}
                </Typography>
                <Typography variant="body2">
                  Stock: {producto.stock}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductosList;
