const { romanToArabic } = require('../romanos');

module.exports = async (req, res) => {
  // Configuración de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar solicitud preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const romanNumeral = req.query.roman?.toUpperCase();
    
    if (!romanNumeral) {
      return res.status(400).json({ error: 'Parámetro "roman" es requerido.' });
    }

    const arabicNumber = romanToArabic(romanNumeral);
    
    if (arabicNumber === null || arabicNumber === undefined) {
      return res.status(400).json({ error: 'Número romano inválido.' });
    }

    return res.json({ arabic: arabicNumber });
  } catch (error) {
    console.error('Error en /r2a:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};