module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { roman } = req.query;

  if (!roman) {
    return res.status(400).json({ error: 'Missing roman parameter' });
  }

  const romanUpper = roman.toUpperCase();

  // Validar solo caracteres romanos válidos
  const validRomanRegex = /^[MDCLXVI]+$/;
  if (!validRomanRegex.test(romanUpper)) {
    return res.status(400).json({ error: 'Invalid roman numeral format' });
  }

  // Validar patrón romano correcto
  if (!isValidRoman(romanUpper)) {
    return res.status(400).json({ error: 'Invalid roman numeral' });
  }

  const arabic = romanToArabic(romanUpper);

  if (arabic === 0 || arabic > 3999) {
    return res.status(400).json({ error: 'Invalid roman numeral' });
  }

  return res.status(200).json({ arabic });
};

function isValidRoman(roman) {
  // Valida repeticiones y sustracciones correctas
  const validPattern =
    /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

  return validPattern.test(roman);
}

function romanToArabic(roman) {
  const values = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1
  };

  let result = 0;
  let prevValue = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const currentValue = values[roman[i]];

    if (currentValue < prevValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }

    prevValue = currentValue;
  }

  return result;
}