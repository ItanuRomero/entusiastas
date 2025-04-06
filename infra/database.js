import { Client } from "pg";
import { ConnectionError, QueryError } from "./errors/private/database";

async function query(queryObject) {
  const client = await getNewClient();
  let result;
  try {
    result = await client.query(queryObject);
    return result;
  } catch (e) {
    console.error(e);
    throw new QueryError({ cause: e.message });
  } finally {
    await client?.end();
  }
}

async function getNewClient() {
  try {
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
  } catch (error) {
    throw new ConnectionError({ cause: error.message });
  }
}

const database = {
  query,
  getNewClient,
};

export default database;
