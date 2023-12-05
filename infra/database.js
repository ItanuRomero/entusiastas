import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  let result;
  try {
    await client.connect();
    result = await client.query(queryObject);
  } catch (e) {
    console.log(e);
  } finally {
    await client.end();
  }
  if (!result) throw new Error("Not able to perform query");
  return result;
}

export default {
  query: query,
};
