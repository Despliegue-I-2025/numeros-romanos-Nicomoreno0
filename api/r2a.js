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

  // Validar caracteres romanos básicos
  const validRomanRegex = /^[MDCLXVI]+$/;
  if (!validRomanRegex.test(romanUpper)) {
    return res.status(400).json({ error: 'Invalid roman numeral format' });
  }

  // Validar estructura romana correcta
  if (!isValidRoman(romanUpper)) {
    return res.status(400).json({ error: 'Invalid roman numeral' });
  }

  const arabic = romanToArabic(romanUpper);

  if (arabic < 1 || arabic > 3999) {
    return res.status(400).json({ error: 'Invalid roman numeral' });
  }

  return res.status(200).json({ arabic });
};

function isValidRoman(roman) {
  // Repeticiones inválidas
  if (/I{4,}|X{4,}|C{4,}|M{4,}/.test(roman)) {
    return false;
  }

  if (/V{2,}|L{2,}|D{2,}/.test(roman)) {
    return false;
  }

  // Sustracciones inválidas
  if (/IL|IC|ID|IM/.test(roman)) return false; // I solo resta a V y X
  if (/XD|XM/.test(roman)) return false;       // X solo resta a L y C
  if (/VX|VL|VC|VD|VM|LC|LD|LM|DM/.test(roman)) return false; // V, L, D no restan

  return true;
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