export class ConnectionError extends Error {
  constructor({ cause }) {
    super("Cannot connect with database");
    this.cause = cause;
  }
}

export class QueryError extends Error {
  constructor({ cause }) {
    super("Cannot make query at the database");
    this.cause = cause;
  }
}
