import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/password'
import { ActionError } from '@/lib/errors'
import { isUsernameTaken, isEmailTaken } from '@/features/auth/server/queries'

export async function createUser(username: string, email: string, password: string) {
  const [usernameTaken, emailTaken] = await Promise.all([
    isUsernameTaken(username),
    isEmailTaken(email),
  ])

  if (usernameTaken) throw new ActionError('CONFLICT', 'Username is already taken')
  if (emailTaken) throw new ActionError('CONFLICT', 'Email is already registered')

  const passwordHash = await hashPassword(password)

  return prisma.user.create({
    data: { username, email, passwordHash },
  })
}

export async function updateUser(
  id: string,
  data: {
    username?: string
    email?: string
    passwordHash?: string
    avatarUrl?: string | null
    bio?: string | null
  }
) {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw new ActionError('NOT_FOUND', 'User not found')

  if (data.username && data.username !== user.username) {
    const taken = await isUsernameTaken(data.username, id)
    if (taken) throw new ActionError('CONFLICT', 'Username is already taken')
  }
  if (data.email && data.email !== user.email) {
    const taken = await isEmailTaken(data.email)
    if (taken) throw new ActionError('CONFLICT', 'Email is already registered')
  }

  if (data.passwordHash) {
    return prisma.user.update({
      where: { id },
      data: { ...data, tokenVersion: { increment: 1 } },
    })
  }

  return prisma.user.update({ where: { id }, data })
}

export async function revokeSessions(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new ActionError('NOT_FOUND', 'User not found')

  return prisma.user.update({
    where: { id: userId },
    data: { tokenVersion: { increment: 1 } },
  })
}
