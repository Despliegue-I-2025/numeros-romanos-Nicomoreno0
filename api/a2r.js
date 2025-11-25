const express = require('express');
const router = express.Router();

// Función para convertir número a romano
function convertirARomano(numero) {
    const valores = [
        { valor: 1000, romano: 'M' },
        { valor: 900, romano: 'CM' },
        { valor: 500, romano: 'D' },
        { valor: 400, romano: 'CD' },
        { valor: 100, romano: 'C' },
        { valor: 90, romano: 'XC' },
        { valor: 50, romano: 'L' },
        { valor: 40, romano: 'XL' },
        { valor: 10, romano: 'X' },
        { valor: 9, romano: 'IX' },
        { valor: 5, romano: 'V' },
        { valor: 4, romano: 'IV' },
        { valor: 1, romano: 'I' }
    ];

    let resultado = '';
    let num = numero;

    for (const { valor, romano } of valores) {
        while (num >= valor) {
            resultado += romano;
            num -= valor;
        }
    }

    return resultado;
}

// Ruta GET /a2r - Convierte número arábigo a romano
router.get('/', (req, res) => {
    const numero = req.query.numero;
    
    // Validar que el parámetro existe
    if (!numero) {
        return res.status(400).json({
            error: 'Parámetro requerido',
            mensaje: 'El parámetro "numero" es requerido'
        });
    }
    
    // Validar que es un string
    if (typeof numero !== 'string') {
        return res.status(400).json({
            error: 'Formato inválido',
            mensaje: 'El parámetro tiene un formato inválido'
        });
    }
    
    // Validar que contiene solo dígitos
    if (!/^\d+$/.test(numero)) {
        return res.status(400).json({
            error: 'Formato inválido',
            mensaje: 'El parámetro debe contener solo números enteros'
        });
    }
    
    // Convertir a número y validar
    const num = parseInt(numero, 10);
    if (isNaN(num)) {
        return res.status(400).json({
            error: 'Formato inválido',
            mensaje: 'El parámetro no es un número válido'
        });
    }
    
    // Validar rango para números romanos (1-3999)
    if (num < 1 || num > 3999) {
        return res.status(400).json({
            error: 'Rango inválido',
            mensaje: 'El número debe estar entre 1 y 3999'
        });
    }
    
    try {
        const romano = convertirARomano(num);
        
        res.status(200).json({
            numero: num,
            romano: romano,
            conversion: 'arabe a romano'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            mensaje: 'Ocurrió un error durante la conversión'
        });
    }
});

module.exports = router;