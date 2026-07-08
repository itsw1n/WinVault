import { BLOCKED_DOMAINS } from "./blocklist"

const SAFE_BROWSING_URL =
  "https://safebrowsing.googleapis.com/v4/threatMatches:find"

export function checkUrlLocal(url: string): string | null {
  try {
    const parsed = new URL(url)

    if (!["http:", "https:"].includes(parsed.protocol))
      return "Only http and https URLs are allowed"

    const hostname = parsed.hostname.replace(/^www\./, "")
    if (BLOCKED_DOMAINS.some((d) => hostname === d || hostname.endsWith(`.${d}`)))
      return "This domain is not allowed"
  } catch {
    return "Invalid URL"
  }

  return null
}

export async function checkUrlRemote(url: string): Promise<string | null> {
  const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY
  if (!apiKey) return null

  try {
    const res = await fetch(
      `${SAFE_BROWSING_URL}?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client: { clientId: "playvault", clientVersion: "1.0.0" },
          threatInfo: {
            threatTypes: [
              "MALWARE",
              "SOCIAL_ENGINEERING",
              "UNWANTED_SOFTWARE",
              "POTENTIALLY_HARMFUL_APPLICATION",
            ],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url }],
          },
        }),
      }
    )

    if (!res.ok) return null

    const data = await res.json()
    if (data.matches?.length > 0)
      return "This URL was flagged as unsafe by Google Safe Browsing"

    return null
  } catch {
    return null
  }
}
