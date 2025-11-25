module.exports = function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { roman } = req.query;

  if (!roman) {
    return res.status(400).json({ error: "Missing roman parameter" });
  }

  // Validar solo letras I V X L C D M (mayúsculas)
  if (!/^[IVXLCDM]+$/.test(roman)) {
    return res.status(400).json({ error: "Invalid roman numeral format" });
  }

  const value = romanToArabic(roman);

  // Si la función retorna null → formato inválido (como IIX, VV, etc.)
  if (value === null) {
    return res.status(400).json({ error: "Invalid roman numeral" });
  }

  return res.status(200).json({ arabic: value });
};

function romanToArabic(roman) {
  const map = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
  let result = 0;
  let prev = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const current = map[roman[i]];

    if (!current) return null; 

    if (current < prev) {
      // Resta
      // pero validar que sea una resta válida
      if (!isValidSubtractive(roman[i], roman[i+1])) return null;
      result -= current;
    } else {
      result += current;
    }

    prev = current;
  }

  return result;
}

function isValidSubtractive(a, b) {
  const valid = {
    I: ['V','X'],
    X: ['L','C'],
    C: ['D','M']
  };

  return valid[a] ? valid[a].includes(b) : false;
}