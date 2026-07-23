import { env } from '@/lib/env'
import { prisma } from '@/lib/prisma'

const SAFE_BROWSING_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find'

function getParentDomains(hostname: string): string[] {
  const parts = hostname.split('.')
  const parents: string[] = []
  for (let i = 1; i < parts.length - 1; i++) {
    parents.push(parts.slice(i).join('.'))
  }
  return parents
}

export async function checkUrlLocal(url: string): Promise<string | null> {
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return 'Invalid URL'
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) return 'Only http and https URLs are allowed'

  const hostname = parsed.hostname.replace(/^www\./, '')
  const candidates = [hostname, ...getParentDomains(hostname)]

  const blocked = await prisma.blockedDomain.findFirst({
    where: { domain: { in: candidates } },
  })

  if (blocked) return 'This domain is not allowed'

  return null
}

export async function checkUrlRemote(url: string): Promise<string | null> {
  const apiKey = env.GOOGLE_SAFE_BROWSING_API_KEY
  if (!apiKey) return null

  try {
    const res = await fetch(`${SAFE_BROWSING_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client: { clientId: 'playvault', clientVersion: '1.0.0' },
        threatInfo: {
          threatTypes: [
            'MALWARE',
            'SOCIAL_ENGINEERING',
            'UNWANTED_SOFTWARE',
            'POTENTIALLY_HARMFUL_APPLICATION',
          ],
          platformTypes: ['ANY_PLATFORM'],
          threatEntryTypes: ['URL'],
          threatEntries: [{ url }],
        },
      }),
    })

    if (!res.ok) return null

    const data = await res.json()
    if (data.matches?.length > 0) return 'This URL was flagged as unsafe by Google Safe Browsing'

    return null
  } catch {
    return null
  }
}
