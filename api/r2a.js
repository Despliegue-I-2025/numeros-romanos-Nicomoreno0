// api/r2a.js

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const value = req.query.value;

  // 1) Validación: vacío
  if (!value || value.trim() === "") {
    return res.status(400).json({ error: "Formato inválido: vacío" });
  }

  const romano = value.toUpperCase().trim();

  // 2) Validación: SOLO caracteres romanos válidos
  if (!/^[MDCLXVI]+$/.test(romano)) {
    return res.status(400).json({ error: "Formato inválido" });
  }

  // 3) Validaciones de estructura NO permitidas (prohibidas por el estándar)
  const invalidPatterns = [
    /IIII/, /VV/, /XXXX/, /LL/, /CCCC/, /DD/, /MMMM/,
    /IL/, /IC/, /ID/, /IM/,
    /XD/, /XM/, /VX/, /LC/, /DM/
  ];

  for (const p of invalidPatterns) {
    if (p.test(romano)) {
      return res.status(400).json({ error: "Estructura inválida" });
    }
  }

  // Mapa de valores romanos
  const valores = {
    I: 1, V: 5, X: 10, L: 50,
    C: 100, D: 500, M: 1000
  };

  let total = 0;
  let anterior = 0;

  for (let i = romano.length - 1; i >= 0; i--) {
    const letra = romano[i];
    const valor = valores[letra];

    if (valor < anterior) {
      // Validación de restas permitidas:
      const par = letra + romano[i + 1];
      const validas = ["IV", "IX", "XL", "XC", "CD", "CM"];
      if (!validas.includes(par)) {
        return res.status(400).json({ error: "Sustracción inválida" });
      }
      total -= valor;
    } else {
      total += valor;
      anterior = valor;
    }
  }

  return res.status(200).json({ arabigo: total });
}