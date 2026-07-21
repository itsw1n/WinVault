import type { Metadata } from 'next'
import { auth } from '@/lib/nextauth/auth'
import { notFound } from 'next/navigation'
import { getUserById } from '@/features/auth/server/queries'
import { AccountForm } from '@/features/auth/components/account-form'

export const metadata: Metadata = {
  title: 'Account — PlayVault',
}

export default async function AccountPage() {
  const session = await auth()
  const userId = session!.user!.id

  let user
  try {
    user = await getUserById(userId)
  } catch {
    notFound()
  }

  return <AccountForm user={user} />
}
