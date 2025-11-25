module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

 const { arabicToRoman } = require('./romanUtils');

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  const arabicParam = req.query.arabic;
  
  // ✅ NUEVA VALIDACIÓN - Solo números
  if (!arabicParam || arabicParam.trim() === '') {
    return res.status(400).json({ error: 'Parámetro arabic requerido.' });
  }
  
  // ✅ VALIDACIÓN CLAVE: Verificar que sea SOLO números
  if (!/^\d+$/.test(arabicParam)) {
    return res.status(400).json({ error: 'El parámetro arabic debe contener solo números.' });
  }
  
  const arabicNumber = parseInt(arabicParam, 10);
  
  if (isNaN(arabicNumber)) {
    return res.status(400).json({ error: 'Parámetro arabic debe ser un número válido.' });
  }

  try {
    const romanNumeral = arabicToRoman(arabicNumber);
    return res.json({ roman: romanNumeral });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
  

  const roman = arabicToRoman(num);

  return res.status(200).json({ roman });
};

function arabicToRoman(num) {
  const values = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];

  let result = '';

  for (let i = 0; i < values.length; i++) {
    while (num >= values[i][0]) {
      result += values[i][1];
      num -= values[i][0];
    }
  }

  return result;
}