const request = require('supertest');
const { app } = require('../romanos');

describe('API /r2a (romano a arábigo)', () => {

  test('convierte correctamente números romanos válidos', async () => {
    const res = await request(app).get('/r2a?roman=XII');
    expect(res.statusCode).toBe(200);
    expect(res.body.arabic).toBe(12);
  });

  test('retorna error si falta el parámetro', async () => {
    const res = await request(app).get('/r2a');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('retorna error si el número romano es inválido', async () => {
    const res = await request(app).get('/r2a?roman=IIII');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Numero romano invalido.");
  });

});

describe('API /a2r (arábigo a romano)', () => {

  test('convierte correctamente números arábigos válidos', async () => {
    const res = await request(app).get('/a2r?arabic=58');
    expect(res.statusCode).toBe(200);
    expect(res.body.roman).toBe("LVIII");
  });

  test('retorna error si falta el parámetro', async () => {
    const res = await request(app).get('/a2r');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('retorna error si el número es inválido', async () => {
    const res = await request(app).get('/a2r?arabic=4000');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Numero arabico invalido (1-3999).");
  });

});
