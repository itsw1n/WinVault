import type { ErrorCode, ActionResult } from '@/types/action-result'

const ErrorMessages: Record<ErrorCode, string> = {
  UNAUTHORIZED: 'You must be signed in to do that',
  NOT_FOUND: 'Resource not found',
  VALIDATION: 'Invalid data provided',
  CONFLICT: 'This resource already exists',
  FORBIDDEN: "You don't have permission to do that",
  INTERNAL: 'Something went wrong',
}

/** Error with an ErrorCode that can be safely returned to the client. */
export class ActionError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message?: string,
    public readonly details?: unknown
  ) {
    super(message ?? ErrorMessages[code])
    this.name = 'ActionError'
  }
}

/** Return a successful ActionResult wrapping the given data. */
export function ok<T>(data: T): ActionResult<T> {
  return { success: true, data }
}

/** Return a failed ActionResult with the given error code and optional message. */
export function fail(code: ErrorCode, message?: string, details?: unknown): ActionResult<never> {
  return {
    success: false,
    code,
    message: message ?? ErrorMessages[code],
    details,
  }
}

/** Execute an async function and wrap its result or thrown ActionError in an ActionResult. */
export async function wrap<T>(fn: () => Promise<T>): Promise<ActionResult<T>> {
  try {
    const data = await fn()
    return ok(data)
  } catch (e) {
    if (e instanceof ActionError) {
      return fail(e.code, e.message, e.details)
    }
    console.error('Unhandled error in action:', e)
    return fail('INTERNAL')
  }
}
