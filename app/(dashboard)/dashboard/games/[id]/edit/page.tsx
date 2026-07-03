import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import * as gameService from "@/services/game-service"
import { notFound } from "next/navigation"
import { EditGameForm } from "./form"

export const metadata: Metadata = {
  title: "Edit Game — PlayVault",
}

export default async function EditGamePage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  const session = await auth()
  if (!session?.user?.id) redirect("/sign-in")

  let game
  try {
    game = await gameService.getGameById(params.id)
  } catch {
    notFound()
  }
  if (game.ownerId !== session.user.id) notFound()

  return <EditGameForm game={game} />
}
