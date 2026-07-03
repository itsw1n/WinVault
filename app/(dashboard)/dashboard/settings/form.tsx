"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface UserData {
  id: string
  username: string
  avatarUrl: string | null
  bio: string | null
}

export default function SettingsForm({ user }: { user: UserData }) {
  const router = useRouter()

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
          Settings
        </h1>
      </div>

      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-pv border-pv-border bg-pv-bg flex items-center justify-center overflow-hidden">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-bold text-pv-muted">
                {user.username[0].toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="font-display font-bold text-pv-text">{user.username}</p>
            {user.bio && <p className="text-xs text-pv-muted">{user.bio}</p>}
          </div>
        </div>
      </Card>
    </div>
  )
}
