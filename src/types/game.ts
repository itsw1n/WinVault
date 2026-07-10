export interface Game {
  id: string
  title: string
  thumbnailUrl: string
  shortDescription: string
  externalUrl: string
  genre: string
  tags: string[]
  ownerId: string
  isFeatured: boolean
  owner: { username: string; avatarUrl: string | null }
  _count: { favorites: number }
  createdAt?: Date
  updatedAt?: Date
}

export interface FavoriteGame {
  game: Game
  createdAt: Date
}
