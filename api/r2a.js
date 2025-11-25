export default function handler(req, res) {
  const roman = req.query.value;

  if (!roman || typeof roman !== "string") {
    return res.status(400).json({ error: "Missing value" });
  }

  const value = roman.toUpperCase();

  // Validar solo caracteres permitidos
  if (!/^[IVXLCDM]+$/.test(value)) {
    return res.status(400).json({ error: "Invalid characters" });
  }

  // Validar repeticiones
  if (/IIII|XXXX|CCCC|MMMM/.test(value)) {
    return res.status(400).json({ error: "Too many repetitions" });
  }

  // Validar repeticiones de V, L, D (no pueden repetirse)
  if (/VV|LL|DD/.test(value)) {
    return res.status(400).json({ error: "Invalid repetition" });
  }

  // Validar sustracciones válidas
  const invalidSubtractions = [
    "IL", "IC", "ID", "IM",
    "XD", "XM",
    "VX", "VL", "VC", "VD", "VM",
    "LC", "LD", "LM",
    "DM"
  ];

  for (const inv of invalidSubtractions) {
    if (value.includes(inv)) {
      return res.status(400).json({ error: "Invalid subtraction" });
    }
  }

  // Conversión
  const map = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
  let result = 0;

  for (let i = 0; i < value.length; i++) {
    const current = map[value[i]];
    const next = map[value[i+1]];

    if (next && current < next) {
      result += next - current;
      i++;
    } else {
      result += current;
    }
  }

  return res.status(200).json({ result });
}