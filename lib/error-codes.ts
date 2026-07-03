export const ErrorCode = {
  UNAUTHORIZED: "UNAUTHORIZED",
  NOT_FOUND: "NOT_FOUND",
  VALIDATION: "VALIDATION",
  CONFLICT: "CONFLICT",
  FORBIDDEN: "FORBIDDEN",
  INTERNAL: "INTERNAL",
} as const

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode]

export const ErrorMessages: Record<ErrorCode, string> = {
  UNAUTHORIZED: "You must be signed in to do that",
  NOT_FOUND: "Resource not found",
  VALIDATION: "Invalid data provided",
  CONFLICT: "This resource already exists",
  FORBIDDEN: "You don't have permission to do that",
  INTERNAL: "Something went wrong",
}
