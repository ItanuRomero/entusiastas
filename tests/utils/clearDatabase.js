import database from "infra/database";

export async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}
