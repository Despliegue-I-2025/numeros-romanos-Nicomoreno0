const express = require('express');
const app = express();
const port = 3000;

// Importar rutas
const r2aRouter = require('./api/r2a');
const a2rRouter = require('./api/a2r');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Rutas
app.use('/r2a', r2aRouter);
app.use('/a2r', a2rRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send(`
    <h1>API de Conversión de Números</h1>
    <p>Endpoints disponibles:</p>
    <ul>
      <li><a href="/r2a?roman=XV">/r2a?roman=XV</a> - Romano a Arábigo</li>
      <li><a href="/a2r?arabic=15">/a2r?arabic=15</a> - Arábigo a Romano</li>
    </ul>
  `);
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});