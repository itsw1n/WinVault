'use client'

import { useActionState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { signInAction } from '@/features/auth/server/actions'
import { Button, Input, PasswordInput, Card } from '@/components/ui'
import Link from 'next/link'

function SignInForm() {
  const searchParams = useSearchParams()
  const raw = searchParams.get('callbackUrl') || '/dashboard'
  const callbackUrl = raw.startsWith('/') ? raw : '/dashboard'
  const [state, formAction, pending] = useActionState(
    signInAction.bind(null, callbackUrl),
    undefined
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-pv-bg px-4">
      <Card className="w-full max-w-sm space-y-4 p-6">
        <div className="text-center">
          <Link href="/" className="font-display text-2xl font-extrabold text-pv-primary">
            PlayVault
          </Link>
          <h1 className="mt-2 font-display text-xl font-bold text-pv-text">Sign In</h1>
        </div>

        <form action={formAction} className="space-y-3">
          <Input
            name="login"
            label="Username or Email"
            placeholder="Enter your username or email"
          />
          <PasswordInput name="password" label="Password" placeholder="Enter your password" />
          {state && !state.success && <p className="text-xs text-pv-heart">{state.message}</p>}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-xs text-pv-muted">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="font-medium text-pv-primary">
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
