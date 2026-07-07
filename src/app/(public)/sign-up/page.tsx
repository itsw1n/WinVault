"use client"

import { useActionState } from "react"
import { signUp } from "@/server/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState(signUp, undefined)

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
            Sign Up
          </h1>
        </div>

        <form action={formAction} className="space-y-3">
          <Input
            name="username"
            label="Username"
            placeholder="Choose a username"
          />
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="At least 6 characters"
          />
          {state && !state.success && (
            <p className="text-xs text-pv-heart">{state.message}</p>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-xs text-center text-pv-muted">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-pv-primary font-medium">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  )
}
