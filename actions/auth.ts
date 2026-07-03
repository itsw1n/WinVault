"use server"

import { signIn } from "@/lib/auth"
import { signUpSchema, signInSchema } from "@/lib/validations/auth"
import { createUser } from "@/services/user-service"
import { wrap, fail } from "@/lib/action-result"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export async function signUp(_prev: unknown, formData: FormData) {
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
