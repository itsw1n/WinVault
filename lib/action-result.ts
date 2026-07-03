import { AppError } from "./app-error"
import { ErrorCode, ErrorMessages } from "./error-codes"

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; code: ErrorCode; message: string; details?: unknown }

export function ok<T>(data: T): ActionResult<T> {
  return { success: true, data }
}

export function fail(
  code: ErrorCode,
  message?: string,
  details?: unknown
): ActionResult<never> {
  return {
    success: false,
    code,
    message: message ?? ErrorMessages[code],
    details,
  }
}

export function fromAppError(e: AppError): ActionResult<never> {
  return {
    success: false,
    code: e.code,
    message: e.message,
    details: e.details,
  }
}

export async function wrap<T>(
  fn: () => Promise<T>
): Promise<ActionResult<T>> {
  try {
    const data = await fn()
    return ok(data)
  } catch (e) {
    if (e instanceof AppError) return fromAppError(e)
    console.error("Unhandled error in action:", e)
    return fail("INTERNAL")
  }
}
