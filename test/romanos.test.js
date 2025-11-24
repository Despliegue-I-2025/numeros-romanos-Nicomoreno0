const { romanToArabic, arabicToRoman } = require('../romanos');

// Pruebas para romanToArabic
describe('Conversión de Romano a Arábigo', () => {
  test('Convierte números romanos básicos', () => {
    expect(romanToArabic('I')).toBe(1);
    expect(romanToArabic('V')).toBe(5);
    expect(romanToArabic('X')).toBe(10);
    expect(romanToArabic('L')).toBe(50);
    expect(romanToArabic('C')).toBe(100);
    expect(romanToArabic('D')).toBe(500);
    expect(romanToArabic('M')).toBe(1000);
  });

  test('Convierte números romanos compuestos', () => {
    expect(romanToArabic('III')).toBe(3);
    expect(romanToArabic('IV')).toBe(4);
    expect(romanToArabic('IX')).toBe(9);
    expect(romanToArabic('LVIII')).toBe(58);
    expect(romanToArabic('MCMXCIV')).toBe(1994);
    expect(romanToArabic('MMMCMXCIX')).toBe(3999);
  });

  test('Devuelve null para números romanos inválidos', () => {
    expect(romanToArabic('IIII')).toBeNull();
    expect(romanToArabic('VV')).toBeNull();
    expect(romanToArabic('ABC')).toBeNull();
    expect(romanToArabic('')).toBeUndefined();
  });
});

// Pruebas para arabicToRoman
describe('Conversión de Arábigo a Romano', () => {
  test('Convierte números arábigos básicos', () => {
    expect(arabicToRoman(1)).toBe('I');
    expect(arabicToRoman(5)).toBe('V');
    expect(arabicToRoman(10)).toBe('X');
    expect(arabicToRoman(50)).toBe('L');
    expect(arabicToRoman(100)).toBe('C');
    expect(arabicToRoman(500)).toBe('D');
    expect(arabicToRoman(1000)).toBe('M');
  });

  test('Convierte números arábigos compuestos', () => {
    expect(arabicToRoman(3)).toBe('III');
    expect(arabicToRoman(4)).toBe('IV');
    expect(arabicToRoman(9)).toBe('IX');
    expect(arabicToRoman(58)).toBe('LVIII');
    expect(arabicToRoman(1994)).toBe('MCMXCIV');
    expect(arabicToRoman(3999)).toBe('MMMCMXCIX');
  });

  test('Devuelve null para números arábigos inválidos', () => {
    expect(arabicToRoman(0)).toBeNull();
    expect(arabicToRoman(4000)).toBeNull();
    expect(arabicToRoman(-10)).toBeNull();
    expect(arabicToRoman(3.5)).toBeNull();
  });
});

// Pruebas de ida y vuelta
describe('Pruebas de ida y vuelta', () => {
  test('La conversión es reversible', () => {
    for (let i = 1; i <= 3999; i += 100) {
      const roman = arabicToRoman(i);
      expect(romanToArabic(roman)).toBe(i);
    }
  });
});