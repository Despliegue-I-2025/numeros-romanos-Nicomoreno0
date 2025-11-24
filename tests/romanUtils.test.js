const { romanToArabic, arabicToRoman } = require('../utils_temp');

describe('romanToArabic', () => {
  
  test('convierte números romanos válidos', () => {
    expect(romanToArabic("I")).toBe(1);
    expect(romanToArabic("III")).toBe(3);
    expect(romanToArabic("IV")).toBe(4);
    expect(romanToArabic("IX")).toBe(9);
    expect(romanToArabic("LVIII")).toBe(58);
    expect(romanToArabic("MCMXCIV")).toBe(1994);
  });

  test('acepta minúsculas', () => {
    expect(romanToArabic("xii")).toBe(12);
  });

  test('devuelve null para romano inválido', () => {
    expect(romanToArabic("IIII")).toBeNull();
    expect(romanToArabic("VV")).toBeNull();
    expect(romanToArabic("IL")).toBeNull();
    expect(romanToArabic("A")).toBeNull();
    expect(romanToArabic("")).toBeNull();
    expect(romanToArabic(null)).toBeNull();
  });
});

describe('arabicToRoman', () => {

  test('convierte números arábigos válidos', () => {
    expect(arabicToRoman(1)).toBe("I");
    expect(arabicToRoman(4)).toBe("IV");
    expect(arabicToRoman(9)).toBe("IX");
    expect(arabicToRoman(58)).toBe("LVIII");
    expect(arabicToRoman(1994)).toBe("MCMXCIV");
  });

  test('devuelve null para valores fuera de rango', () => {
    expect(arabicToRoman(0)).toBeNull();
    expect(arabicToRoman(-5)).toBeNull();
    expect(arabicToRoman(4000)).toBeNull();
    expect(arabicToRoman("hola")).toBeNull();
  });

});
