const { arabicToRoman } = require('../romanos');

module.exports = (req, res) => {
  // Configuración de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar solicitud preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const arabicNumber = parseInt(req.query.arabic, 10);
    
    if (isNaN(arabicNumber) || !Number.isInteger(arabicNumber) || arabicNumber <= 0) {
      return res.status(400).json({ error: 'El parámetro "arabic" debe ser un número entero positivo.' });
    }

    const romanNumeral = arabicToRoman(arabicNumber);
    
    if (!romanNumeral) {
      return res.status(400).json({ error: 'Número arábigo inválido. Debe ser un número entre 1 y 3999.' });
    }

    return res.json({ roman: romanNumeral });
  } catch (error) {
    console.error('Error en /a2r:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};