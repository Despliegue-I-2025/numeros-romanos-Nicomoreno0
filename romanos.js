const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Rutas
const a2rRouter = require('./api/a2');
const r2aRouter = require('./api/r2');

app.use('/a2r', a2rRouter);
app.use('/r2a', r2aRouter);

// Ruta de salud
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'API de conversión de números funcionando correctamente'
    });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        mensaje: `La ruta ${req.originalUrl} no existe en esta API`
    });
});

// Middleware de manejo de errores
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({
        error: 'Error interno del servidor',
        mensaje: 'Ocurrió un error inesperado'
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});

module.exports = app;