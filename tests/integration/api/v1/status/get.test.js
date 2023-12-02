test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toBe(parsedUpdatedAt);

  const database = responseBody.services.database;
  expect(database).toBeDefined();

  expect(database.version).toBe("16.0");

  expect(database.max_connections).toBeGreaterThan(1);

  expect(database.used_connections).toBeGreaterThan(1);
});
