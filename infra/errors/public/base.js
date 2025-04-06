export class BaseError extends Error {
  constructor({ name, message, action, status_code }) {
    super(message);
    this.name = name;
    this.action = action;
    this.status_code = status_code;
  }

  toJson() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.status_code,
    };
  }
}
