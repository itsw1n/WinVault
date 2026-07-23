import { hash, compare } from 'bcryptjs'

const SALT_ROUNDS = 12

/** Hash a plaintext password using bcrypt with 12 salt rounds. */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS)
}

/** Verify a plaintext password against a bcrypt hash. */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return compare(password, hash)
}
