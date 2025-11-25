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

  const upper = roman.toUpperCase();

  // Regex oficial para validar romanos (1–3999)
  const validRoman =
    /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

  if (!validRoman.test(upper)) {
    return res.status(400).json({ error: "Invalid roman numeral format" });
  }

  return res.status(200).json({ arabic: romanToArabic(upper) });
};

function romanToArabic(roman) {
  const values = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1
  };

  let total = 0;

  for (let i = 0; i < roman.length; i++) {
    const curr = values[roman[i]];
    const next = values[roman[i + 1]];

    if (next && next > curr) {
      total += next - curr;
      i++; 
    } else {
      total += curr;
    }
  }

  return total;
}