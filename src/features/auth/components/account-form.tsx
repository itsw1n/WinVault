"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { updateProfile } from "@/features/auth/actions/auth"
import Link from "next/link"

interface UserData {
  id: string
  username: string
  email: string
}

export function AccountForm({ user }: { user: UserData }) {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(updateProfile, undefined)

  if (state?.success) {
    router.refresh()
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="text-sm text-pv-muted hover:text-pv-text"
        >
          ← Back
        </Link>
        <h1 className="font-display text-2xl font-bold text-pv-text">
          Account
        </h1>
      </div>

      <Card className="p-6">
        <form action={formAction} className="space-y-4">
          <Input
            name="username"
            label="Username"
            defaultValue={user.username}
          />
          <Input
            name="email"
            label="Email"
            defaultValue={user.email}
          />

          <hr className="border-t-[2.5px] border-pv-border" />
          <p className="text-[11px] font-bold tracking-[0.08em] text-pv-muted uppercase">Change Password</p>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-pv-text">Current Password</label>
            <input
              name="currentPassword"
              type="password"
              placeholder="Leave blank to keep current"
              className="w-full px-3 py-2 text-sm bg-pv-card text-pv-text border-[2px] border-pv-border rounded-pv-sm focus:outline-none focus:border-pv-primary transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-pv-text">New Password</label>
            <input
              name="newPassword"
              type="password"
              placeholder="Leave blank to keep current"
              className="w-full px-3 py-2 text-sm bg-pv-card text-pv-text border-[2px] border-pv-border rounded-pv-sm focus:outline-none focus:border-pv-primary transition-colors"
            />
          </div>
          {state && !state.success && (
            <p className="text-xs text-pv-heart">{state.message}</p>
          )}
          {state?.success && (
            <p className="text-xs text-green-500">Profile updated.</p>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "SAVING..." : "SAVE CHANGES"}
          </Button>
        </form>
      </Card>
    </div>
  )
}
