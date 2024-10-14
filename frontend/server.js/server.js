const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const whiteList = ["http://localhost:8080"]

// Middleware para habilitar CORS
app.use(cors({origen:whiteList }))
app.use(express.json());

// Rutas
app.get('/api', (req, res) => {
    res.send('Hello from the server!');
});

// Ejemplo de una ruta adicional
app.get('/api/productos', (req, res) => {
    // Aquí podrías retornar la lista de productos
    res.json([{ id: 1, nombre: 'Producto 1' }, { id: 2, nombre: 'Producto 2' }]);
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack); // Loguear el error en consola
    res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
