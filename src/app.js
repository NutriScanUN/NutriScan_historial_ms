// Importa las dependencias necesarias
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
// const healthRoutes = require('./routes/healthRoutes');

// Crear una instancia de la aplicación Express
const app = express();

// Configurar el middleware para parsear el cuerpo de las solicitudes (JSON)
app.use(bodyParser.json());

// Rutas de la API
app.use('/api', apiRoutes);  // Rutas para interactuar con el otro microservicio
// app.use('/health', healthRoutes);  // Ruta para verificar el estado del servicio

// Ruta de bienvenida o predeterminada (opcional)
app.get('/', (req, res) => {
    res.send('Microservicio en funcionamiento');
});

// Exportar la aplicación para usarla en otros archivos (como server.js)
module.exports = app;
