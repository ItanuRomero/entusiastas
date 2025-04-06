import database from "infra/database.js";
import { ConnectionError } from "infra/errors/private/database";
import { InternalServerError } from "infra/errors/public/InternalServerError";

export default async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseInfo = {};
  try {
    databaseInfo.version = (
      await database.query("SHOW SERVER_VERSION;")
    ).rows[0].server_version;
    databaseInfo.max_connections = Number(
      (await database.query("SHOW MAX_CONNECTIONS;")).rows[0].max_connections,
    );
    const databaseName = process.env.POSTGRES_DB;
    databaseInfo.opened_connections = (
      await database.query({
        text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
        values: [databaseName],
      })
    ).rows[0].count;
  } catch (e) {
    if (e instanceof ConnectionError) {
      return response.status(207).json({
        updated_at: updatedAt,
        dependencies: {
          database: { error: "Cannot connect with database" },
        },
      });
    } else {
      console.error(e);
      const publicError = new InternalServerError();
      return response.status(publicError.status_code).json(publicError);
    }
  }

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: { ...databaseInfo },
    },
  });
}
