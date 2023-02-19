export class ApplicationError extends Error {
  code?: number;
  constructor({ code, message }: { code?: number; message: string }) {
    super(message);
    Object.setPrototypeOf(this, ApplicationError.prototype);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.code = code;
  }
}

export const AuthTokenError = new ApplicationError({
  message: 'Failed auth token',
  code: 401,
});
export const TokenError = new ApplicationError({
  message: 'Failed token',
  code: 400,
});
