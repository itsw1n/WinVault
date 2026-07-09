"use server"

import { headers } from "next/headers"
import { signIn, auth } from "@/lib/auth"
import { signUpSchema, signInSchema, updateProfileSchema } from "@/features/auth/schemas"
import { createUser, updateUser } from "@/features/auth/utils/queries"
import { wrap, fail } from "@/lib/errors"
import { rateLimit } from "@/lib/auth/rate-limiter"
import { compare, hash } from "bcryptjs"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export async function signUp(_prev: unknown, formData: FormData) {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (!rateLimit(`signup:${ip}`, 5, 15 * 60 * 1000)) {
    return fail("VALIDATION", "Too many attempts. Please try again later.")
  }

  const parsed = signUpSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return fail("VALIDATION", parsed.error.errors[0].message)
  }

  const result = await wrap(() =>
    createUser(parsed.data.username, parsed.data.email, parsed.data.password)
  )

  if (!result.success) return result

  try {
    await signIn("credentials", {
      login: parsed.data.username,
      password: parsed.data.password,
      redirect: false,
    })
  } catch (e) {
    if (e instanceof AuthError) {
      return fail("UNAUTHORIZED", "Account created but sign-in failed. Please sign in manually.")
    }
    throw e
  }

  redirect("/dashboard")
}

export async function signInAction(_prev: unknown, formData: FormData) {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (!rateLimit(`signin:${ip}`, 5, 15 * 60 * 1000)) {
    return fail("VALIDATION", "Too many attempts. Please try again later.")
  }

  const parsed = signInSchema.safeParse({
    login: formData.get("login"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return fail("VALIDATION", parsed.error.errors[0].message)
  }

  try {
    await signIn("credentials", {
      login: parsed.data.login,
      password: parsed.data.password,
      redirectTo: "/dashboard",
    })
  } catch (e) {
    if (e instanceof AuthError) {
      return fail("UNAUTHORIZED", "Invalid username/email or password")
    }
    throw e
  }
}

export async function updateProfile(_prev: unknown, formData: FormData) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return fail("UNAUTHORIZED")

  const parsed = updateProfileSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    currentPassword: formData.get("currentPassword") || undefined,
    newPassword: formData.get("newPassword") || undefined,
  })

  if (!parsed.success) {
    return fail("VALIDATION", parsed.error.errors[0].message)
  }

  const { currentPassword, newPassword, ...profile } = parsed.data

  let passwordHash: string | undefined
  if (currentPassword || newPassword) {
    if (!currentPassword || !newPassword) {
      return fail("VALIDATION", "Both current and new password are required to change password")
    }

    const user = await prisma.user.findUnique({ where: { id: userId }, select: { passwordHash: true } })
    if (!user || !(await compare(currentPassword, user.passwordHash))) {
      return fail("VALIDATION", "Current password is incorrect")
    }

    passwordHash = await hash(newPassword, 12)
  }

  const result = await wrap(() =>
    updateUser(userId, {
      username: profile.username,
      email: profile.email,
      ...(passwordHash ? { passwordHash } : {}),
    })
  )

  if (!result.success) return result

  if (passwordHash) {
    await prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } },
    })
    await signIn("credentials", {
      login: profile.username,
      password: newPassword,
      redirect: false,
    })
  }

  return result
}

export async function revokeAllSessions() {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return fail("UNAUTHORIZED")

  await prisma.user.update({
    where: { id: userId },
    data: { tokenVersion: { increment: 1 } },
  })

  redirect("/sign-in")
}
