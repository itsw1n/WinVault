'use client'

import { useActionState, useState } from 'react'
import { signUp } from '@/features/auth/server/actions'
import { Button, Input, PasswordInput, Card } from '@/components/ui'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const rules = [
  { label: 'At least 8 characters', test: (v: string) => v.length >= 8 },
  { label: 'At least one uppercase letter', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'At least one number', test: (v: string) => /[0-9]/.test(v) },
]

function PasswordHints({ password }: { password: string }) {
  if (!password) return null

  return (
    <ul className="space-y-0.5">
      {rules.map((rule) => {
        const ok = rule.test(password)
        return (
          <li
            key={rule.label}
            className={cn('text-xs transition-colors', ok ? 'text-pv-primary' : 'text-pv-muted')}
          >
            {ok ? '✓' : '○'} {rule.label}
          </li>
        )
      })}
    </ul>
  )
}

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState(signUp, undefined)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const confirmError = confirmPassword.length > 0 && password !== confirmPassword

  return (
    <div className="flex min-h-screen items-center justify-center bg-pv-bg px-4">
      <Card className="w-full max-w-sm space-y-4 p-6">
        <div className="text-center">
          <Link href="/" className="font-display text-2xl font-extrabold text-pv-primary">
            PlayVault
          </Link>
          <h1 className="mt-2 font-display text-xl font-bold text-pv-text">Sign Up</h1>
        </div>

        <form action={formAction} className="space-y-3">
          <Input name="username" label="Username" placeholder="Choose a username" />
          <Input name="email" label="Email" type="email" placeholder="Enter your email" />
          <div className="space-y-1">
            <PasswordInput
              name="password"
              label="Password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordHints password={password} />
          </div>
          <div className="space-y-1">
            <PasswordInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmError && <p className="text-xs text-pv-heart">Passwords do not match</p>}
          </div>
          {state && !state.success && <p className="text-xs text-pv-heart">{state.message}</p>}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <p className="text-center text-xs text-pv-muted">
          Already have an account?{' '}
          <Link href="/sign-in" className="font-medium text-pv-primary">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  )
}
