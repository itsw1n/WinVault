import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10)

  const users = await Promise.all([
    prisma.user.upsert({
      where: { username: "pixelforge" },
      update: {},
      create: {
        username: "pixelforge",
        email: "pixelforge@playvault.test",
        passwordHash,
      },
    }),
    prisma.user.upsert({
      where: { username: "mossgames" },
      update: {},
      create: {
        username: "mossgames",
        email: "mossgames@playvault.test",
        passwordHash,
      },
    }),
    prisma.user.upsert({
      where: { username: "ironvale" },
      update: {},
      create: {
        username: "ironvale",
        email: "ironvale@playvault.test",
        passwordHash,
      },
    }),
    prisma.user.upsert({
      where: { username: "petalstudio" },
      update: {},
      create: {
        username: "petalstudio",
        email: "petalstudio@playvault.test",
        passwordHash,
      },
    }),
  ])

  const games = [
    {
      title: "Neon Drift",
      thumbnailUrl: "",
      shortDescription: "Drift through neon-lit highways in this arcade racer.",
      externalUrl: "https://neondrift.example.com",
      genre: "Racing",
      tags: ["racing", "arcade", "neon"],
      isFeatured: true,
      ownerId: users[0].id,
    },
    {
      title: "Glyphwood",
      thumbnailUrl: "",
      shortDescription: "Solve ancient rune puzzles in a hand-painted forest.",
      externalUrl: "https://glyphwood.example.com",
      genre: "Puzzle",
      tags: ["puzzle", "forest", "hand-painted"],
      isFeatured: true,
      ownerId: users[1].id,
    },
    {
      title: "Starforge Tactics",
      thumbnailUrl: "",
      shortDescription: "Command fleets in turn-based galactic warfare.",
      externalUrl: "https://starforgetactics.example.com",
      genre: "Strategy",
      tags: ["strategy", "space", "turn-based"],
      isFeatured: true,
      ownerId: users[2].id,
    },
    {
      title: "Bloom Town",
      thumbnailUrl: "",
      shortDescription: "Build a cozy town and trade with your neighbors.",
      externalUrl: "https://bloomtown.example.com",
      genre: "Casual",
      tags: ["casual", "building", "cozy"],
      isFeatured: true,
      ownerId: users[3].id,
    },
  ]

  for (const game of games) {
    await prisma.game.create({ data: game })
  }

  console.log("Seeded 4 users and 4 games")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
