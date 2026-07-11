import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10)
  const itsw1nHash = await bcrypt.hash("Qwerty123$$$", 10)

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
    prisma.user.upsert({
      where: { username: "itsw1n" },
      update: {},
      create: {
        username: "itsw1n",
        email: "erwincurato@gmail.com",
        passwordHash: itsw1nHash,
      },
    }),
  ])

  await prisma.favorite.deleteMany()
  await prisma.game.deleteMany()

  const games = [
    {
      title: "ZTYPE",
      thumbnailUrl: "",
      shortDescription: "Sample game sourced from zty.pe. Used for demonstration purposes.",
      externalUrl: "https://zty.pe/",
      genre: "Shooter",
      tags: ["typing", "arcade", "action"],
      isFeatured: false,
      ownerId: users[4].id,
    },
    {
      title: "2048",
      thumbnailUrl: "",
      shortDescription: "Sample game sourced from play2048.co. Used for demonstration purposes.",
      externalUrl: "https://play2048.co/",
      genre: "Puzzle",
      tags: ["puzzle", "numbers", "casual"],
      isFeatured: true,
      ownerId: users[4].id,
    },
    {
      title: "Tetris",
      thumbnailUrl: "",
      shortDescription: "Sample game sourced from play.tetris.com. Used for demonstration purposes.",
      externalUrl: "https://play.tetris.com/",
      genre: "Puzzle",
      tags: ["puzzle", "blocks", "classic"],
      isFeatured: true,
      ownerId: users[4].id,
    },
    {
      title: "Wordle",
      thumbnailUrl: "",
      shortDescription: "Sample game sourced from nytimes.com/games/wordle. Used for demonstration purposes.",
      externalUrl: "https://www.nytimes.com/games/wordle/index.html",
      genre: "Puzzle",
      tags: ["puzzle", "word", "daily"],
      isFeatured: false,
      ownerId: users[4].id,
    },
    {
      title: "Chess",
      thumbnailUrl: "",
      shortDescription: "Sample game sourced from chess.com. Used for demonstration purposes.",
      externalUrl: "https://www.chess.com/play",
      genre: "Strategy",
      tags: ["strategy", "board", "multiplayer"],
      isFeatured: false,
      ownerId: users[4].id,
    },
    {
      title: "Snake",
      thumbnailUrl: "",
      shortDescription: "Sample game sourced from playsnake.org. Used for demonstration purposes.",
      externalUrl: "https://playsnake.org/",
      genre: "Action",
      tags: ["arcade", "classic", "casual"],
      isFeatured: true,
      ownerId: users[4].id,
    },
    {
      title: "World Geography",
      thumbnailUrl: "",
      shortDescription: "Sample game sourced from world-geography-games.com. Used for demonstration purposes.",
      externalUrl: "https://world-geography-games.com/",
      genre: "Puzzle",
      tags: ["geography", "quiz", "educational"],
      isFeatured: false,
      ownerId: users[4].id,
    },
  ]

  for (const game of games) {
    await prisma.game.create({ data: game })
  }

  console.log("Seeded 5 users and 7 games")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
