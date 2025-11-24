const { RomanConverter } = require('./script');

describe('Arabic to Roman Conversion', () => {
    test('converts 1 to I', () => {
        expect(RomanConverter.arabicToRoman(1)).toBe('I');
    });

    test('converts 4 to IV', () => {
        expect(RomanConverter.arabicToRoman(4)).toBe('IV');
    });

    test('converts 9 to IX', () => {
        expect(RomanConverter.arabicToRoman(9)).toBe('IX');
    });

    test('converts 58 to LVIII', () => {
        expect(RomanConverter.arabicToRoman(58)).toBe('LVIII');
    });

    test('converts 1994 to MCMXCIV', () => {
        expect(RomanConverter.arabicToRoman(1994)).toBe('MCMXCIV');
    });

    test('converts 3999 to MMMCMXCIX', () => {
        expect(RomanConverter.arabicToRoman(3999)).toBe('MMMCMXCIX');
    });

    // Casos borde y errores
    test('throws error for 0', () => {
        expect(() => RomanConverter.arabicToRoman(0)).toThrow('El número debe ser un entero entre 1 y 3999');
    });

    test('throws error for 4000', () => {
        expect(() => RomanConverter.arabicToRoman(4000)).toThrow('El número debe ser un entero entre 1 y 3999');
    });

    test('throws error for negative number', () => {
        expect(() => RomanConverter.arabicToRoman(-5)).toThrow('El número debe ser un entero entre 1 y 3999');
    });

    test('throws error for decimal number', () => {
        expect(() => RomanConverter.arabicToRoman(3.14)).toThrow('El número debe ser un entero entre 1 y 3999');
    });

    test('throws error for non-number input', () => {
        expect(() => RomanConverter.arabicToRoman('abc')).toThrow('El número debe ser un entero entre 1 y 3999');
    });
});

describe('Roman to Arabic Conversion', () => {
    test('converts I to 1', () => {
        expect(RomanConverter.romanToArabic('I')).toBe(1);
    });

    test('converts IV to 4', () => {
        expect(RomanConverter.romanToArabic('IV')).toBe(4);
    });

    test('converts IX to 9', () => {
        expect(RomanConverter.romanToArabic('IX')).toBe(9);
    });

    test('converts LVIII to 58', () => {
        expect(RomanConverter.romanToArabic('LVIII')).toBe(58);
    });

    test('converts MCMXCIV to 1994', () => {
        expect(RomanConverter.romanToArabic('MCMXCIV')).toBe(1994);
    });

    test('converts MMMCMXCIX to 3999', () => {
        expect(RomanConverter.romanToArabic('MMMCMXCIX')).toBe(3999);
    });

    test('works with lowercase input', () => {
        expect(RomanConverter.romanToArabic('xiv')).toBe(14);
    });

    // Casos borde y errores
    test('throws error for empty string', () => {
        expect(() => RomanConverter.romanToArabic('')).toThrow('El número romano debe ser una cadena no vacía');
    });

    test('throws error for invalid roman numeral', () => {
        expect(() => RomanConverter.romanToArabic('IIII')).toThrow('Formato de número romano inválido');
    });

    test('throws error for invalid characters', () => {
        expect(() => RomanConverter.romanToArabic('ABC')).toThrow('Formato de número romano inválido');
    });

    test('throws error for non-string input', () => {
        expect(() => RomanConverter.romanToArabic(123)).toThrow('El número romano debe ser una cadena no vacía');
    });

    test('throws error for invalid sequence', () => {
        expect(() => RomanConverter.romanToArabic('IC')).toThrow('Formato de número romano inválido');
    });
});

describe('Edge Cases', () => {
    test('minimum value 1', () => {
        expect(RomanConverter.arabicToRoman(1)).toBe('I');
        expect(RomanConverter.romanToArabic('I')).toBe(1);
    });

    test('maximum value 3999', () => {
        expect(RomanConverter.arabicToRoman(3999)).toBe('MMMCMXCIX');
        expect(RomanConverter.romanToArabic('MMMCMXCIX')).toBe(3999);
    });

    test('round trip conversion', () => {
        for (let i = 1; i <= 100; i++) {
            const roman = RomanConverter.arabicToRoman(i);
            const arabic = RomanConverter.romanToArabic(roman);
            expect(arabic).toBe(i);
        }
    });
});