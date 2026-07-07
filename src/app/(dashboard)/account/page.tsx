import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { getUserById } from "@/server/services/user-service"
import { AccountForm } from "./form"

export const metadata: Metadata = {
  title: "Account — PlayVault",
}

export default async function AccountPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/sign-in")

  let user
  try {
    user = await getUserById(session.user.id)
  } catch {
    notFound()
  }

  return <AccountForm user={user} />
}
