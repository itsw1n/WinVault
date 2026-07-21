'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, PasswordInput, Card } from '@/components/ui'
import { updateProfile } from '@/features/auth/server/actions'
import type { User } from '@/types'
import Link from 'next/link'

export function AccountForm({ user }: { user: Pick<User, 'id' | 'username' | 'email'> }) {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(updateProfile, undefined)

  if (state?.success) {
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="text-sm text-pv-muted hover:text-pv-text">
          ← Back
        </Link>
        <h1 className="font-display text-2xl font-bold text-pv-text">Account</h1>
      </div>

      <Card className="p-6">
        <form action={formAction} className="space-y-4">
          <Input name="username" label="Username" defaultValue={user.username} />
          <Input name="email" label="Email" defaultValue={user.email} />

          <hr className="border-t-[2.5px] border-pv-border" />
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-pv-muted">
            Change Password
          </p>

          <PasswordInput
            name="currentPassword"
            label="Current Password"
            placeholder="Leave blank to keep current"
          />
          <PasswordInput
            name="newPassword"
            label="New Password"
            placeholder="Leave blank to keep current"
          />
          {state && !state.success && <p className="text-xs text-pv-heart">{state.message}</p>}
          {state?.success && <p className="text-xs text-green-500">Profile updated.</p>}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'SAVING...' : 'SAVE CHANGES'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
