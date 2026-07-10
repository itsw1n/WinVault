export interface User {
  id: string
  username: string
  email: string
  avatarUrl?: string | null
  bio?: string | null
  createdAt: Date
}

export interface UserWithAuth extends User {
  tokenVersion: number
  passwordHash: string
}
