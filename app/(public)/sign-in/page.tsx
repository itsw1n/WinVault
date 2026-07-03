"use client"

import { Suspense, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setError("")

    const form = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      login: form.get("login") as string,
      password: form.get("password") as string,
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username/email or password")
      setPending(false)
      return
    }

    router.push(callbackUrl)
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pv-bg px-4">
      <Card className="w-full max-w-sm p-6 space-y-4">
        <div className="text-center">
          <Link
            href="/"
            className="font-display text-2xl font-extrabold text-pv-primary"
          >
            PlayVault
          </Link>
          <h1 className="font-display text-xl font-bold text-pv-text mt-2">
            Sign In
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            name="login"
            label="Username or Email"
            placeholder="Enter your username or email"
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          {error && <p className="text-xs text-pv-heart">{error}</p>}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-xs text-center text-pv-muted">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-pv-primary font-medium">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  )
}
