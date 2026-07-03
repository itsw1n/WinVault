"use server"

import { auth } from "@/lib/auth"
import { toggleFavorite as toggleFav } from "@/services/favorite-service"
import { wrap, fail } from "@/lib/action-result"
import { revalidatePath } from "next/cache"

export async function toggleFavorite(gameId: string) {
  const session = await auth()
  if (!session?.user?.id) return fail("UNAUTHORIZED")

  const result = await wrap(() => toggleFav(session.user.id, gameId))
  if (!result.success) return result

  revalidatePath("/")
  revalidatePath("/dashboard")
  revalidatePath(`/games/${gameId}`)
  return result
}
