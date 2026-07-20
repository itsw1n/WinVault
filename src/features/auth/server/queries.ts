import { prisma } from "@/lib/prisma"
import { ActionError } from "@/lib/errors"

export async function getUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      _count: { select: { games: true } },
    },
  })

  if (!user) throw new ActionError("NOT_FOUND", "User not found")
  return user
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true, email: true, avatarUrl: true, bio: true },
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
