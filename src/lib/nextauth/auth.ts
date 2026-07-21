import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { verifyPassword } from '@/lib/password'
import { prisma } from '@/lib/prisma'

export const { handlers, signIn, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        login: { label: 'Username or Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) return null

        const login = credentials.login as string
        const password = credentials.password as string

        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: login }, { username: login }],
          },
        })

        if (!user) return null

        const isValid = await verifyPassword(password, user.passwordHash)
        if (!isValid) return null

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          image: user.avatarUrl,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { tokenVersion: true },
        })
        token.tokenVersion = dbUser?.tokenVersion ?? 0
      }

      if (trigger === 'update') {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { tokenVersion: true },
        })
        if (!dbUser || dbUser.tokenVersion !== (token.tokenVersion as number)) {
          return null
        }
        token.tokenVersion = dbUser.tokenVersion
      }

      return token
    },
    async session({ session, token }) {
      if (!token?.id) return {} as typeof session
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
