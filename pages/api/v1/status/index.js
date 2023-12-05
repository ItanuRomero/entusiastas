import database from "infra/database.js";

export default async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseVersion = (await database.query("SHOW SERVER_VERSION;")).rows[0]
    .server_version;
  const databaseMaxConnections = (await database.query("SHOW MAX_CONNECTIONS;"))
    .rows[0].max_connections;
  const databaseUsedConnections = (
    await database.query("SELECT count(*) FROM pg_stat_activity;")
  ).rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: Number(databaseMaxConnections),
        used_connections: Number(databaseUsedConnections),
      },
    },
  });
}
