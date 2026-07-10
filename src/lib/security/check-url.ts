import { BLOCKED_DOMAINS } from "./blocklist"

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
