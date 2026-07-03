import { ErrorCode, ErrorMessages } from "./error-codes"

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message?: string,
    public readonly details?: unknown
  ) {
    super(message ?? ErrorMessages[code])
    this.name = "AppError"
  }
}
