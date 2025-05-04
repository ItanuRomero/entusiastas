import { createRouter } from "next-connect";
import database from "infra/database.js";
import { ConnectionError } from "infra/errors/private/database";
import { InternalServerError } from "infra/errors/public/InternalServerError";
import { MethodNotAllowedError } from "infra/errors/public/MethodNotAllowedError";

const router = createRouter();

router.use(updatedAtMiddleware);

router.get(getHandler);

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});

async function updatedAtMiddleware(req, res, next) {
  const updatedAt = new Date().toISOString();
  req.updatedAt = updatedAt;
  next();
}

function onErrorHandler(error, req, res) {
  if (error instanceof ConnectionError) {
    res.status(200).json({
      updated_at: req.updatedAt,
      dependencies: {
        database: { error: "Cannot connect with database" },
      },
    });
  } else {
    console.error(error);
    const publicError = new InternalServerError();
    res.status(publicError.status_code).json(publicError.toJson());
  }
}

async function onNoMatchHandler(req, res) {
  const publicError = new MethodNotAllowedError();
  res.status(publicError.status_code).json(publicError.toJson());
}

async function getHandler(request, response) {
  const databaseInfo = {};
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

  response.status(200).json({
    updated_at: request.updatedAt,
    dependencies: {
      database: { ...databaseInfo },
    },
  });
}
