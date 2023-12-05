import database from "infra/database.js";

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
    databaseInfo.used_connections = Number(
      (await database.query("SELECT count(*) FROM pg_stat_activity;")).rows[0]
        .count,
    );
  } catch (e) {
    if (e instanceof Error) databaseInfo.error = "Cannot connect with database";
  }

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: { ...databaseInfo },
    },
  });
}
