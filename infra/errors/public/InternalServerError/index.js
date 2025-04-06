import { BaseError } from "../base";

export class InternalServerError extends BaseError {
  constructor() {
    super({
      name: "InternalServerError",
      action: "Contact System Admin",
      message: "Internal Server Error",
      status_code: 500,
    });
  }
}
