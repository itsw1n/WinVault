"use server"

import { auth } from "@/lib/auth"
import { toggleFavorite as toggleFav } from "@/server/services/favorite-service"
import { wrap, fail } from "@/lib/action-result"
import { revalidatePath } from "next/cache"

export async function toggleFavorite(gameId: string) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return fail("UNAUTHORIZED")

  const result = await wrap(() => toggleFav(userId, gameId))
  if (!result.success) return result

  revalidatePath("/")
  revalidatePath("/dashboard")
  revalidatePath(`/games/${gameId}`)
  return result
}
