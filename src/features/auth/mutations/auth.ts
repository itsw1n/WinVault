import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { ActionError } from "@/lib/errors"
import { isUsernameTaken, isEmailTaken } from "@/features/auth/queries/auth"

export async function createUser(
  username: string,
  email: string,
  password: string
) {
  const [usernameTaken, emailTaken] = await Promise.all([
    isUsernameTaken(username),
    isEmailTaken(email),
  ])

  if (usernameTaken) throw new ActionError("CONFLICT", "Username is already taken")
  if (emailTaken) throw new ActionError("CONFLICT", "Email is already registered")

  const passwordHash = await hash(password, 12)

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
  if (!user) throw new ActionError("NOT_FOUND", "User not found")

  if (data.username && data.username !== user.username) {
    const taken = await isUsernameTaken(data.username, id)
    if (taken) throw new ActionError("CONFLICT", "Username is already taken")
  }
  if (data.email && data.email !== user.email) {
    const taken = await isEmailTaken(data.email)
    if (taken) throw new ActionError("CONFLICT", "Email is already registered")
  }

  return prisma.user.update({ where: { id }, data })
}
