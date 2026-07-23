/** Union of possible error codes returned by server actions. */
export type ErrorCode =
  'UNAUTHORIZED' | 'NOT_FOUND' | 'VALIDATION' | 'CONFLICT' | 'FORBIDDEN' | 'INTERNAL'

/** Standard return type for all server actions. */
export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; code: ErrorCode; message: string; details?: unknown }
