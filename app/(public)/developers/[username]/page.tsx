import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { GameGrid } from "@/components/games/game-grid"
import * as gameService from "@/services/game-service"
import { getUserByUsername } from "@/services/user-service"
import { auth } from "@/lib/auth"
import { getFavoritedGameIds } from "@/services/favorite-service"

export async function generateMetadata(props: {
  params: Promise<{ username: string }>
}): Promise<Metadata> {
  try {
    const params = await props.params
    const user = await getUserByUsername(params.username)
    return {
      title: `${user.username} — PlayVault Developer`,
      description: user.bio || `Profile of ${user.username} on PlayVault.`,
    }
  } catch {
    return { title: "Developer Not Found — PlayVault" }
  }
}

export default async function DeveloperProfilePage(props: {
  params: Promise<{ username: string }>
}) {
  const params = await props.params
  const session = await auth()
  let user
  try {
    user = await getUserByUsername(params.username)
  } catch {
    notFound()
  }

  const games = await gameService.getGamesByOwner(user.id)

  let favoritedIds: string[] = []
  if (session?.user?.id) {
    favoritedIds = await getFavoritedGameIds(session.user.id)
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 space-y-8">
        {/* Profile header */}
        <section className="border-pv border-pv-border rounded-pv p-6 bg-pv-card flex items-center gap-4">
          <div className="w-16 h-16 rounded-pv border-pv border-pv-border bg-pv-bg flex items-center justify-center overflow-hidden">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-pv-muted">
                {user.username[0].toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-pv-text">
              {user.username}
            </h1>
            {user.bio && (
              <p className="text-sm text-pv-muted mt-1">{user.bio}</p>
            )}
            <p className="text-xs text-pv-muted mt-1">
              {user._count.games} game{user._count.games !== 1 ? "s" : ""}{" "}
              published
            </p>
          </div>
        </section>

        {/* Games */}
        <section>
          <h2 className="font-display text-xl font-bold text-pv-text mb-4">
            Published Games
          </h2>
          <GameGrid
            games={games.map((g) => ({
              ...g,
              owner: { username: user.username },
            }))}
            favoritedIds={favoritedIds}
          />
        </section>
      </div>
  )
}
