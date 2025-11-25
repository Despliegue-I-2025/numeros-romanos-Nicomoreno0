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

  const { arabic } = req.query;

  // Verificar que exista
  if (!arabic) {
    return res.status(400).json({ error: "Missing arabic parameter" });
  }

  // Validar que sea SOLO dígitos → RECHAZA: 12abc, abc, -5, 12.5
  if (!/^\d+$/.test(arabic)) {
    return res.status(400).json({ error: "Invalid arabic number format" });
  }

  const num = parseInt(arabic, 10);

  // Validar rango
  if (num < 1 || num > 3999) {
    return res.status(400).json({ error: "Invalid arabic number (must be 1-3999)" });
  }

  const roman = arabicToRoman(num);
  return res.status(200).json({ roman });
};

function arabicToRoman(num) {
  const values = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"],
    [1, "I"]
  ];

  let result = "";

  for (const [value, numeral] of values) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }

  return result;
}