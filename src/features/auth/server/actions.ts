"use server"

import { headers } from "next/headers"
import { signIn, auth } from "@/lib/nextauth/auth"
import { signUpSchema, signInSchema, updateProfileSchema } from "@/features/auth/schemas"
import { createUser, updateUser, revokeSessions } from "@/features/auth/server/mutations"
import { getUserPasswordHash } from "@/features/auth/server/queries"
import { wrap, ok, fail } from "@/lib/errors"
import { rateLimit } from "@/lib/nextauth/rate-limiter"
import { hashPassword, verifyPassword } from "@/lib/password"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

function getClientIp(headersList: Headers): string {
  return (
    headersList.get("x-real-ip") ??
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  )
}

export async function signInAction(callbackUrl: string, _prev: unknown, formData: FormData) {
  const ip = getClientIp(await headers())
  if (!(await rateLimit(`signin:${ip}`, 5, 15 * 60 * 1000))) {
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
      redirect: false,
    })
  } catch (e) {
    if (e instanceof AuthError) {
      return fail("UNAUTHORIZED", "Invalid username/email or password")
    }
    throw e
  }

  redirect(callbackUrl)
}

export async function signUp(_prev: unknown, formData: FormData) {
  const ip = getClientIp(await headers())
  if (!(await rateLimit(`signup:${ip}`, 5, 15 * 60 * 1000))) {
    return fail("VALIDATION", "Too many attempts. Please try again later.")
  }

  const parsed = signUpSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
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

    const pwResult = await wrap(() => getUserPasswordHash(userId))
    if (!pwResult.success) return pwResult
    if (!(await verifyPassword(currentPassword, pwResult.data))) {
      return fail("VALIDATION", "Current password is incorrect")
    }

    passwordHash = await hashPassword(newPassword)
  }

  const result = await wrap(() =>
    updateUser(userId, {
      username: profile.username,
      email: profile.email,
      passwordHash,
    })
  )

  if (!result.success) return result

  if (passwordHash) {
    return ok({ requiresReauth: true })
  }

  return result
}

export async function revokeAllSessions() {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return fail("UNAUTHORIZED")

  const result = await wrap(() => revokeSessions(userId))
  if (!result.success) return result

  redirect("/sign-in")
}
