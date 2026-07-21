import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GameGrid } from '@/features/games/components/game-grid'
import * as gameService from '@/features/games/server/queries'
import { getUserByUsername } from '@/features/auth/server/queries'
import { auth } from '@/lib/nextauth/auth'
import { getFavoritedGameIds } from '@/features/games/server/queries'

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
    return { title: 'Developer Not Found — PlayVault' }
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
    <div className="mx-auto max-w-[1400px] space-y-8 px-4 py-8 lg:px-8">
      {/* Profile header */}
      <section className="flex items-center gap-4 rounded-pv border-pv border-pv-border bg-pv-card p-6">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-pv border-pv border-pv-border bg-pv-bg">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.username} className="h-full w-full object-cover" />
          ) : (
            <span className="text-lg font-bold text-pv-muted">
              {user.username[0].toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-pv-text">{user.username}</h1>
          {user.bio && <p className="mt-1 text-sm text-pv-muted">{user.bio}</p>}
          <p className="mt-1 text-xs text-pv-muted">
            {user._count.games} game{user._count.games !== 1 ? 's' : ''} published
          </p>
        </div>
      </section>

      {/* Games */}
      <section>
        <h2 className="mb-4 font-display text-xl font-bold text-pv-text">Published Games</h2>
        <GameGrid games={games} favoritedIds={favoritedIds} loggedIn={!!session?.user} />
      </section>
    </div>
  )
}
