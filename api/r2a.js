// api/r2a.js
export default function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { roman } = req.query;

  if (!roman || typeof roman !== "string") {
    return res.status(400).json({ error: "Invalid or missing roman parameter" });
  }

  const map = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1
  };

  const str = roman.toUpperCase();
  let total = 0;

  for (let i = 0; i < str.length; i++) {
    const curr = map[str[i]];
    const next = map[str[i + 1]];

    // Si alguna letra no es romana → error
    if (!curr) {
      return res.status(400).json({ error: "Invalid roman numeral" });
    }

    if (next && next > curr) {
      total += next - curr;
      i++;
    } else {
      total += curr;
    }
  }

  return res.status(200).json({ arabic: total });
}