import { prisma } from '@/lib/prisma'
import { ActionError } from '@/lib/errors'
import { userProfileSelect } from '@/types'

/** Fetch a user by username with their game count. Throws NOT_FOUND if missing. */
export async function getUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { ...userProfileSelect, _count: { select: { games: true } } },
  })

  if (!user) throw new ActionError('NOT_FOUND', 'User not found')
  return user
}

/** Fetch a user's public profile by ID. Throws NOT_FOUND if missing. */
export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: userProfileSelect,
  })
  if (!user) throw new ActionError('NOT_FOUND', 'User not found')
  return user
}

/** Check if a username is already in use, optionally excluding a specific user ID. */
export async function isUsernameTaken(username: string, excludeId?: string) {
  const user = await prisma.user.findUnique({ where: { username } })
  return !!user && user.id !== excludeId
}

/** Check if an email is already registered. */
export async function isEmailTaken(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  return !!user
}

/** Fetch a user's password hash for verification. */
export async function getUserPasswordHash(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { passwordHash: true },
  })
  if (!user) throw new ActionError('NOT_FOUND', 'User not found')
  return user.passwordHash
}
