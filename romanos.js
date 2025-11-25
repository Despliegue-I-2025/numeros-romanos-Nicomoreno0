const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.static('public'));

// Romanos a Arábigos
app.get('/r2a', (req, res) => {
  const romanNumeral = req.query.roman?.toUpperCase();
  if (!romanNumeral) {
    return res.status(400).json({ error: 'Parámetro "roman" requerido.' });
  }

  const arabicNumber = romanToArabic(romanNumeral);
  if (arabicNumber === null) {
    return res.status(400).json({ error: 'Número romano inválido.' });
  }

  return res.json({ arabic: arabicNumber });
});

// Arábigos a Romanos
app.get('/a2r', (req, res) => {
  const arabicNumber = parseInt(req.query.arabic, 10);
  if (isNaN(arabicNumber) || !Number.isInteger(arabicNumber) || arabicNumber <= 0) {
    return res.status(400).json({ error: 'Parámetro "arabic" debe ser un número entero positivo.' });
  }

  const romanNumeral = arabicToRoman(arabicNumber);
  if (romanNumeral === null) {
    return res.status(400).json({ error: 'Número arábigo inválido. Debe estar entre 1 y 3999.' });
  }

  return res.json({ roman: romanNumeral });
});

function romanToArabic(roman) {
  if (roman === '') return undefined;
  const romanValues = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let result = 0;
  let previousValue = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const currentChar = roman[i];
    const currentValue = romanValues[currentChar];
    
    if (!currentValue) return null;
    
    if (currentValue >= previousValue) {
      result += currentValue;
    } else {
      result -= currentValue;
    }
    previousValue = currentValue;
  }
  
  if (arabicToRoman(result) !== roman) {
    return null;
  }
  
  return result;
}

function arabicToRoman(arabic) {
  if (arabic <= 0 || arabic >= 4000 || !Number.isInteger(arabic)) return null;
  
  const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
  ];

  let result = '';
  let remaining = arabic;

  for (const { value, symbol } of romanNumerals) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }

  return result;
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor de conversión de números romanos escuchando en el puerto ${PORT}`);
  });
}

// Al final del archivo romanos.js
module.exports = {
  romanToArabic,
  arabicToRoman
};
