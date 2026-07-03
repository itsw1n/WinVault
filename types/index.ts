export type { Session } from "next-auth"

export interface GameWithFavorites {
  id: string
  title: string
  thumbnailUrl: string
  shortDescription: string
  externalUrl: string
  genre: string
  tags: string[]
  isFeatured: boolean
  ownerId: string
  owner: { username: string; avatarUrl: string | null }
  _count: { favorites: number }
  createdAt: Date
  updatedAt: Date
}

export interface GameWithFavoriteStatus extends GameWithFavorites {
  isFavorited: boolean
}

export interface UserProfile {
  id: string
  username: string
  avatarUrl: string | null
  bio: string | null
  createdAt: Date
  _count: { games: number }
}
