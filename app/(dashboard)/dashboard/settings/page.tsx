import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getUserById } from "@/services/user-service"
import SettingsForm from "./form"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Settings — PlayVault",
}

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/sign-in")

  let user
  try {
    user = await getUserById(session.user.id)
  } catch {
    notFound()
  }

  return <SettingsForm user={user} />
}
