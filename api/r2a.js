// api/a2r.js

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const value = req.query.value;

  // 1) Validación: debe existir
  if (!value) {
    return res.status(400).json({ error: "Falta el parámetro 'value'" });
  }

  // 2) Validación: debe ser SOLO NÚMEROS (sin letras)
  if (!/^\d+$/.test(value)) {
    return res.status(400).json({ error: "Formato inválido: solo números" });
  }

  const num = parseInt(value, 10);

  if (num <= 0) {
    return res.status(400).json({ error: "El número debe ser mayor que 0" });
  }

  // Conversión de arábigo a romano
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

  let resultado = "";
  let n = num;

  for (const { val, rom } of map) {
    while (n >= val) {
      resultado += rom;
      n -= val;
    }
  }

  return res.status(200).json({ romano: resultado });
}