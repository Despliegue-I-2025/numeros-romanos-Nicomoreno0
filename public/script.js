class RomanConverter {
    static romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    static romanToArabicMap = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50,
        'C': 100, 'D': 500, 'M': 1000
    };

    static arabicToRoman(number) {
        if (typeof number !== 'number' || number <= 0 || number > 3999 || !Number.isInteger(number)) {
            throw new Error('El número debe ser un entero entre 1 y 3999');
        }

        let result = '';
        let remaining = number;

        for (const { value, numeral } of this.romanNumerals) {
            while (remaining >= value) {
                result += numeral;
                remaining -= value;
            }
        }

        return result;
    }

    static romanToArabic(roman) {
        if (typeof roman !== 'string' || !roman) {
            throw new Error('El número romano debe ser una cadena no vacía');
        }

        const upperRoman = roman.toUpperCase();
        
        // Validar formato romano
        if (!/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(upperRoman)) {
            throw new Error('Formato de número romano inválido');
        }

        let result = 0;
        let previousValue = 0;

        for (let i = upperRoman.length - 1; i >= 0; i--) {
            const currentChar = upperRoman[i];
            const currentValue = this.romanToArabicMap[currentChar];

            if (currentValue < previousValue) {
                result -= currentValue;
            } else {
                result += currentValue;
            }

            previousValue = currentValue;
        }

        return result;
    }
}

// Funciones para la interfaz
function convertToRoman() {
    hideError();
    const arabicInput = document.getElementById('arabicInput');
    const resultDiv = document.getElementById('romanResult');
    
    try {
        const number = parseInt(arabicInput.value);
        
        if (isNaN(number)) {
            throw new Error('Por favor ingresa un número válido');
        }

        const roman = RomanConverter.arabicToRoman(number);
        resultDiv.textContent = roman;
        resultDiv.style.color = '#333';
        
    } catch (error) {
        showError(error.message);
        resultDiv.textContent = '';
    }
}

function convertToArabic() {
    hideError();
    const romanInput = document.getElementById('romanInput');
    const resultDiv = document.getElementById('arabicResult');
    
    try {
        const roman = romanInput.value.trim();
        
        if (!roman) {
            throw new Error('Por favor ingresa un número romano');
        }

        const number = RomanConverter.romanToArabic(roman);
        resultDiv.textContent = number;
        resultDiv.style.color = '#333';
        
    } catch (error) {
        showError(error.message);
        resultDiv.textContent = '';
    }
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function hideError() {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.style.display = 'none';
}

// Event listeners para Enter
document.getElementById('arabicInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') convertToRoman();
});

document.getElementById('romanInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') convertToArabic();
});

// Exportar para tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RomanConverter };
}