export interface Game {
  id: string
  title: string
  thumbnailUrl: string
  shortDescription: string
  externalUrl: string
  genre: string
  tags: string[]
  owner: { username: string }
  _count: { favorites: number }
  createdAt?: Date
  updatedAt?: Date
}
