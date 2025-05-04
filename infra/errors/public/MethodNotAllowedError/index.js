import { BaseError } from "../base";

export class MethodNotAllowedError extends BaseError {
  constructor() {
    super({
      name: "MethodNotAllowedError",
      message: "Método não permitido para este endpoint",
      action: "Verifique se o método HTTP enviado é válido para este endpoint",
      status_code: 405,
    });
  }
}
