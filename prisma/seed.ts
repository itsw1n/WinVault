import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10)
  const itsw1nHash = await bcrypt.hash('Qwerty123$$$', 10)

  const users = await Promise.all([
    prisma.user.upsert({
      where: { username: 'pixelforge' },
      update: {},
      create: {
        username: 'pixelforge',
        email: 'pixelforge@playvault.test',
        passwordHash,
      },
    }),
    prisma.user.upsert({
      where: { username: 'mossgames' },
      update: {},
      create: {
        username: 'mossgames',
        email: 'mossgames@playvault.test',
        passwordHash,
      },
    }),
    prisma.user.upsert({
      where: { username: 'ironvale' },
      update: {},
      create: {
        username: 'ironvale',
        email: 'ironvale@playvault.test',
        passwordHash,
      },
    }),
    prisma.user.upsert({
      where: { username: 'petalstudio' },
      update: {},
      create: {
        username: 'petalstudio',
        email: 'petalstudio@playvault.test',
        passwordHash,
      },
    }),
    prisma.user.upsert({
      where: { username: 'itsw1n' },
      update: {},
      create: {
        username: 'itsw1n',
        email: 'erwincurato@gmail.com',
        passwordHash: itsw1nHash,
      },
    }),
  ])

  await prisma.comment.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.game.deleteMany()

  const games = [
    {
      title: 'ZTYPE',
      thumbnailUrl: '',
      shortDescription: 'Sample game sourced from zty.pe. Used for demonstration purposes.',
      externalUrl: 'https://zty.pe/',
      genre: 'Shooter',
      tags: ['typing', 'arcade', 'action'],
      isFeatured: false,
      ownerId: users[4].id,
    },
    {
      title: '2048',
      thumbnailUrl: '',
      shortDescription: 'Sample game sourced from play2048.co. Used for demonstration purposes.',
      externalUrl: 'https://play2048.co/',
      genre: 'Puzzle',
      tags: ['puzzle', 'numbers', 'casual'],
      isFeatured: true,
      ownerId: users[4].id,
    },
    {
      title: 'Tetris',
      thumbnailUrl: '',
      shortDescription:
        'Sample game sourced from play.tetris.com. Used for demonstration purposes.',
      externalUrl: 'https://play.tetris.com/',
      genre: 'Puzzle',
      tags: ['puzzle', 'blocks', 'classic'],
      isFeatured: true,
      ownerId: users[4].id,
    },
    {
      title: 'Wordle',
      thumbnailUrl: '',
      shortDescription:
        'Sample game sourced from nytimes.com/games/wordle. Used for demonstration purposes.',
      externalUrl: 'https://www.nytimes.com/games/wordle/index.html',
      genre: 'Puzzle',
      tags: ['puzzle', 'word', 'daily'],
      isFeatured: false,
      ownerId: users[4].id,
    },
    {
      title: 'Chess',
      thumbnailUrl: '',
      shortDescription: 'Sample game sourced from chess.com. Used for demonstration purposes.',
      externalUrl: 'https://www.chess.com/play',
      genre: 'Strategy',
      tags: ['strategy', 'board', 'multiplayer'],
      isFeatured: false,
      ownerId: users[4].id,
    },
    {
      title: 'Snake',
      thumbnailUrl: '',
      shortDescription: 'Sample game sourced from playsnake.org. Used for demonstration purposes.',
      externalUrl: 'https://playsnake.org/',
      genre: 'Action',
      tags: ['arcade', 'classic', 'casual'],
      isFeatured: true,
      ownerId: users[4].id,
    },
    {
      title: 'World Geography',
      thumbnailUrl: '',
      shortDescription:
        'Sample game sourced from world-geography-games.com. Used for demonstration purposes.',
      externalUrl: 'https://world-geography-games.com/',
      genre: 'Puzzle',
      tags: ['geography', 'quiz', 'educational'],
      isFeatured: false,
      ownerId: users[4].id,
    },
  ]

  for (const game of games) {
    await prisma.game.create({ data: game })
  }

  console.log('Seeded 5 users and 7 games')

  // --- Blocklist seeding ---
  console.log('Downloading blocklist...')
  const res = await fetch(
    'https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt'
  )
  if (!res.ok) throw new Error(`Blocklist download failed: ${res.status}`)

  const text = await res.text()
  const domains: string[] = []
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const parts = trimmed.split(/\s+/)
    if (parts.length >= 2) {
      const domain = parts[1].toLowerCase()
      if (domain) domains.push(domain)
    }
  }

  const BATCH_SIZE = 10_000
  let inserted = 0
  for (let i = 0; i < domains.length; i += BATCH_SIZE) {
    const batch = domains.slice(i, i + BATCH_SIZE)
    await prisma.blockedDomain.createMany({
      data: batch.map((domain) => ({ domain })),
      skipDuplicates: true,
    })
    inserted += batch.length
    process.stdout.write(`\rInserted ${inserted} / ${domains.length} blocked domains`)
  }
  console.log(`\nSeeded ${inserted} blocked domains`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
