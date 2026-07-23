import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** Download the upstream blocklist and replace the local BlockedDomain table. */
async function main() {
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

  console.log(`Deleting ${await prisma.blockedDomain.count()} existing rows...`)
  await prisma.blockedDomain.deleteMany()

  const BATCH_SIZE = 10_000
  let inserted = 0
  for (let i = 0; i < domains.length; i += BATCH_SIZE) {
    const batch = domains.slice(i, i + BATCH_SIZE)
    await prisma.blockedDomain.createMany({
      data: batch.map((domain) => ({ domain })),
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
