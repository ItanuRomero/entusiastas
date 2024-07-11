import { Client } from "pg";

async function query(queryObject) {
  const client = await getNewClient();
  let result;
  try {
    result = await client.query(queryObject);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
  if (!result) throw new Error("Not able to perform query");
  return result;
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "production",
  });
  await client.connect();

  return client;
}

const database = {
  query,
  getNewClient,
};

export default database;
