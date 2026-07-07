export type ErrorCode =
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "VALIDATION"
  | "CONFLICT"
  | "FORBIDDEN"
  | "INTERNAL"

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; code: ErrorCode; message: string; details?: unknown }
