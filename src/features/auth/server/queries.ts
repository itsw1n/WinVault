import { prisma } from "@/lib/prisma"
import { ActionError } from "@/lib/errors"
import { userProfileSelect, userWithGamesInclude } from "@/types"

export async function getUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: userWithGamesInclude,
  })

  if (!user) throw new ActionError("NOT_FOUND", "User not found")
  return user
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: userProfileSelect,
  })
  if (!user) throw new ActionError("NOT_FOUND", "User not found")
  return user
}

export async function isUsernameTaken(username: string, excludeId?: string) {
  const user = await prisma.user.findUnique({ where: { username } })
  return !!user && user.id !== excludeId
}

export async function isEmailTaken(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  return !!user
}

export async function getUserPasswordHash(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { passwordHash: true },
  })
  if (!user) throw new ActionError("NOT_FOUND", "User not found")
  return user.passwordHash
}
