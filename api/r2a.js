const express = require('express');
const router = express.Router();

// Ruta GET /r2a - Convierte número romano a arábigo
router.get('/', (req, res) => {
    const romano = req.query.romano;
    
    // Validar que el parámetro existe
    if (!romano) {
        return res.status(400).json({
            error: 'Parámetro requerido',
            mensaje: 'El parámetro "romano" es requerido'
        });
    }
    
    // Validar que es un string
    if (typeof romano !== 'string') {
        return res.status(400).json({
            error: 'Formato inválido',
            mensaje: 'El parámetro tiene un formato inválido'
        });
    }
    
    // Validar formato romano (solo caracteres romanos válidos)
    if (!/^[IVXLCDM]+$/i.test(romano)) {
        return res.status(400).json({
            error: 'Formato inválido',
            mensaje: 'El parámetro contiene caracteres romanos inválidos'
        });
    }
    
    try {
        // Lógica de conversión de romano a arábigo
        const valores = {
            'I': 1, 'V': 5, 'X': 10, 'L': 50, 
            'C': 100, 'D': 500, 'M': 1000
        };
        
        let resultado = 0;
        const romanoUpper = romano.toUpperCase();
        let prevValue = 0;
        
        for (let i = romanoUpper.length - 1; i >= 0; i--) {
            const current = valores[romanoUpper[i]];
            
            if (current < prevValue) {
                resultado -= current;
            } else {
                resultado += current;
            }
            
            prevValue = current;
        }
        
        // Validar que el resultado esté en rango válido
        if (resultado < 1 || resultado > 3999) {
            return res.status(400).json({
                error: 'Número romano inválido',
                mensaje: 'El número romano proporcionado no es válido'
            });
        }
        
        res.status(200).json({
            romano: romanoUpper,
            numero: resultado,
            conversion: 'romano a arabe'
        });
        
    } catch (error) {
        res.status(400).json({
            error: 'Número romano inválido',
            mensaje: 'El número romano proporcionado no es válido'
        });
    }
});

module.exports = router;