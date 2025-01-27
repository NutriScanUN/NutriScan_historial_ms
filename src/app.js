// Importa las dependencias necesarias
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const searchHistoryRoute = require('./routes/routesSearchHistorial');
const consumptionHistoryRoute = require('./routes/routesConsumoHistorial');
const errorHandler = require('./middleware/errorHandler');

// Crear una instancia de la aplicación Express
const app = express();

app.use(bodyParser.json());

// Rutas de la API
app.use('/api/search-history', searchHistoryRoute);
app.use('/api/consumption-history', consumptionHistoryRoute);

app.use(errorHandler);

// Ruta de bienvenida o predeterminada (opcional)
app.get('/', (req, res) => {
    res.send('Microservicio en funcionamiento');
});


// Exportar la aplicación para usarla en otros archivos (como server.js)
module.exports = app;
