describe("POST /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Trying to retrieve current system status with a POST", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
      expect(response.status).toBe(405);
      const responseBody = await response.json();
      const expected = {
        name: "MethodNotAllowedError",
        message: "Método não permitido para este endpoint",
        action:
          "Verifique se o método HTTP enviado é válido para este endpoint",
        status_code: 405,
      };
      expect(responseBody).toEqual(expected);
    });
  });
});
