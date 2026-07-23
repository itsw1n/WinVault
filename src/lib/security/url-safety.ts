import { env } from '@/lib/env'
import { prisma } from '@/lib/prisma'

const SAFE_BROWSING_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find'

/** Generate all parent domain candidates for subdomain matching. */
function getParentDomains(hostname: string): string[] {
  const parts = hostname.split('.')
  const parents: string[] = []
  for (let i = 1; i < parts.length - 1; i++) {
    parents.push(parts.slice(i).join('.'))
  }
  return parents
}

/**
 * Check a URL against the local blocked-domain database.
 * Returns a rejection message if blocked, or null if allowed.
 */
export async function checkUrlLocal(url: string): Promise<string | null> {
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return 'Invalid URL'
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) return 'Only http and https URLs are allowed'

  const hostname = parsed.hostname.replace(/^www\./, '').replace(/\.$/, '')
  const candidates = [hostname, ...getParentDomains(hostname)]

  const blocked = await prisma.blockedDomain.findFirst({
    where: { domain: { in: candidates } },
  })

  if (blocked) return 'This domain is not allowed'

  return null
}

/**
 * Check a URL against Google Safe Browsing API.
 * Returns a rejection message if flagged, or null if safe or unavailable.
 * Logs warnings when the API key is missing or the request fails.
 */
export async function checkUrlRemote(url: string): Promise<string | null> {
  const apiKey = env.GOOGLE_SAFE_BROWSING_API_KEY
  if (!apiKey) {
    console.error('[Safe Browsing] API key not configured — skipping remote check')
    return null
  }

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

    if (!res.ok) {
      console.error(`[Safe Browsing] API returned ${res.status} — skipping check`)
      return null
    }

    const data = await res.json()
    if (data.matches?.length > 0) return 'This URL was flagged as unsafe by Google Safe Browsing'

    return null
  } catch (e) {
    console.error('[Safe Browsing] Request failed:', e)
    return null
  }
}
