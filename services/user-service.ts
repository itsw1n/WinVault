import { prisma } from "@/lib/db"
import { hash } from "bcryptjs"
import { AppError } from "@/lib/app-error"

export async function createUser(
  username: string,
  email: string,
  password: string
) {
  const [usernameTaken, emailTaken] = await Promise.all([
    isUsernameTaken(username),
    isEmailTaken(email),
  ])

  if (usernameTaken) throw new AppError("CONFLICT", "Username is already taken")
  if (emailTaken) throw new AppError("CONFLICT", "Email is already registered")

  const passwordHash = await hash(password, 12)

  return prisma.user.create({
    data: { username, email, passwordHash },
  })
}

export async function getUserByLogin(login: string) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: login }, { username: login }],
    },
  })

  if (!user) throw new AppError("UNAUTHORIZED", "Invalid username/email or password")
  return user
}

export async function getUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      _count: { select: { games: true } },
    },
  })

  if (!user) throw new AppError("NOT_FOUND", "User not found")
  return user
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw new AppError("NOT_FOUND", "User not found")
  return user
}

export async function updateUser(
  id: string,
  data: { username?: string; avatarUrl?: string | null; bio?: string | null }
) {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw new AppError("NOT_FOUND", "User not found")

  if (data.username && data.username !== user.username) {
    const taken = await isUsernameTaken(data.username, id)
    if (taken) throw new AppError("CONFLICT", "Username is already taken")
  }

  return prisma.user.update({ where: { id }, data })
}

export async function isUsernameTaken(username: string, excludeId?: string) {
  const user = await prisma.user.findUnique({ where: { username } })
  return !!user && user.id !== excludeId
}

export async function isEmailTaken(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  return !!user
}
