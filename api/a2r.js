// api/a2r.js
export default function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { arabic } = req.query;

  if (!arabic || isNaN(arabic)) {
    return res.status(400).json({ error: "Invalid or missing arabic parameter" });
  }

  const num = parseInt(arabic, 10);

  if (num <= 0 || num > 3999) {
    return res.status(400).json({ error: "Number out of range (1-3999)" });
  }

  // Conversión
  const map = [
    { val: 1000, rom: "M" },
    { val: 900, rom: "CM" },
    { val: 500, rom: "D" },
    { val: 400, rom: "CD" },
    { val: 100, rom: "C" },
    { val: 90, rom: "XC" },
    { val: 50, rom: "L" },
    { val: 40, rom: "XL" },
    { val: 10, rom: "X" },
    { val: 9, rom: "IX" },
    { val: 5, rom: "V" },
    { val: 4, rom: "IV" },
    { val: 1, rom: "I" }
  ];

  let result = "";
  let n = num;

  for (const m of map) {
    while (n >= m.val) {
      result += m.rom;
      n -= m.val;
    }
  }

  return res.status(200).json({ roman: result });
}