// Importa las dependencias necesarias
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const searchHistoryRoute = require('./routes/routesSearchHistorial');
const consumptionHistoryRoute = require('./routes/routesConsumoHistorial');
const errorHandler = require('./middleware/errorHandler');
const setupSwagger = require('./swagger');
const promClient = require("prom-client");

// Crear una instancia de la aplicación Express
const app = express();

const register = promClient.register;
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duración de las solicitudes HTTP en segundos",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5] // Intervalos de tiempo en segundos
});
register.registerMetric(httpRequestDurationMicroseconds );

const cacheRequests = new promClient.Counter({
  name: "user_api_cache_total",
  help: "Total de requests al cache",
  labelNames: ["instance", "type"]
});

register.registerMetric(cacheRequests);

const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total de peticiones HTTP recibidas',
  labelNames: ['method', 'route', 'status_code'],
});

// Simulación: Incrementar contador cuando se consulta caché
app.get("/cache", (req, res) => {
  cacheRequests.inc({ instance: "user-api", type: "Request" });
  res.json({ message: "Cache request counted" });
});

app.use(bodyParser.json());
setupSwagger(app);


app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on("finish", () => {
    httpRequestTotal.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });
    end({ method: req.method, route: req.route?.path || req.path, status_code: res.statusCode });
  });
  next();
});

// Rutas de la API
app.use('/api/search-history', searchHistoryRoute);
app.use('/api/consumption-history', consumptionHistoryRoute);

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  });

app.use(errorHandler);

// Ruta de bienvenida o predeterminada (opcional)
app.get('/', (req, res) => {
    res.send('Microservicio en funcionamiento');
});


// Exportar la aplicación para usarla en otros archivos (como server.js)
module.exports = app;
