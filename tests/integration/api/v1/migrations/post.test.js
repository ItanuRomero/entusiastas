import database from "infra/database";
import { clearDatabase } from "tests/utils/clearDatabase";

beforeAll(clearDatabase);

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);

  const migrationsRunned = (
    await database.query('SELECT * FROM "public"."pgmigrations"')
  ).rows;

  expect(Array.isArray(migrationsRunned)).toBe(true);

  expect(migrationsRunned.length).toBeGreaterThan(0);
});
