const calculadora = require("../models/calculadora");

test("Somar 2 + 2 deve retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("Somar 5 + 100 deve retornar ", () => {
  const resultado = calculadora.somar(5, 100);
  expect(resultado).toBe(105);
});

test("Somar 'Banana' + '100' deve retornar 'Erro'", () => {
  const resultado = calculadora.somar("Banana", "100");
  expect(resultado).toBe("Erro");
});
