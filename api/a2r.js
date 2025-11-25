const { arabicToRoman } = require('../romanos');

module.exports = (req, res) => {
  // Configuración de CORS
 res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
  // Manejar solicitud preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

 try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
    }
    const data = await response.json();
    // Procesar la respuesta
} catch (error) {
    console.error('Error al conectar con la API:', error);
    // Mostrar mensaje de error al usuario
}