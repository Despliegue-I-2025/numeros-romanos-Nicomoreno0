// Convierte romano -> arábigo
async function convertRoman() {
  const value = document.getElementById("romanInput").value;

  const res = await fetch(`/r2a?roman=${value}`);
  const data = await res.json();

  document.getElementById("romanResult").innerText =
    data.arabic !== undefined ? `Resultado: ${data.arabic}` : `Error: ${data.error}`;
}

// Convierte arábigo -> romano
async function convertArabic() {
  const value = document.getElementById("arabicInput").value;

  const res = await fetch(`/a2r?arabic=${value}`);
  const data = await res.json();

  document.getElementById("arabicResult").innerText =
    data.roman !== undefined ? `Resultado: ${data.roman}` : `Error: ${data.error}`;
}
