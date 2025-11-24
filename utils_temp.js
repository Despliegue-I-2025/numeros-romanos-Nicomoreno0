

// Tabla de valores romanos
const romanMap = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};


// ROMANO → ARÁBIGO

function romanToArabic(roman) {
  if (!roman || typeof roman !== "string") return null;

  roman = roman.toUpperCase().trim();

  // Validar caracteres válidos
  if (!/^[IVXLCDM]+$/.test(roman)) return null;

  let total = 0;
  let prevValue = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const curr = roman[i];
    const value = romanMap[curr];

    // Regla de resta
    if (value < prevValue) {
      // Validación de restas permitidas
      const validSubtractions = {
        I: ["V", "X"],
        X: ["L", "C"],
        C: ["D", "M"]
      };

      if (!validSubtractions[curr] || !validSubtractions[curr].includes(roman[i + 1])) {
        return null; // resta inválida (como IL, XM, VX)
      }

      total -= value;
    } else {
      total += value;
    }

    prevValue = value;
  }

  // Convertir de vuelta para validar formato correcto
  const reconvert = arabicToRoman(total);
  if (reconvert !== roman) return null;

  return total;
}


// ARÁBIGO → ROMANO

function arabicToRoman(num) {
  if (typeof num !== "number" || num < 1 || num > 3999) return null;

  const values = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" }
  ];

  let result = "";
  for (let i = 0; i < values.length; i++) {
    while (num >= values[i].value) {
      result += values[i].numeral;
      num -= values[i].value;
    }
  }

  return result;
}

// Exportar
module.exports = { romanToArabic, arabicToRoman };
