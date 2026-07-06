# Security Plan

## Critical — fix now

### Open redirect on sign-in
- **File**: `app/(public)/sign-in/page.tsx:14`
- **Fix**: validate `callbackUrl` is a relative path before calling `router.push()`
- **Change**: `const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"` → check starts with `/`, fallback to `/dashboard`

## High — fix soon

### Rate limit auth endpoints
- Add a simple in-memory rate limiter in `actions/auth.ts` (or wrap `signIn/signUp`):
  - N attempts per IP per window (e.g. 5 attempts per 15 min)
  - Return generic "Too many attempts" on exceed
- ponytail: skip Redis/external store unless the app scales past one instance

### Email verification
- Add `emailVerified` field to User model in `prisma/schema.prisma`
- Generate a verification token on sign-up, email a confirmation link
- Block sign-in until `emailVerified` is set
- ponytail: skip for MVP if this is a hobby project — email sending requires an external service

## Moderate — next iteration

### Strengthen password policy
- Increase minimum to 8 chars
- Add Zod `.regex()` for at least one uppercase + one digit
- Pros and cons of more complex requirements — balance security with UX

### Password change/reset flow
- Add `resetToken` + `resetTokenExpires` fields to User model
- Create `actions/auth.ts` → `requestPasswordReset(email)` + `resetPassword(token, newPassword)`
- Create `/reset-password/[token]` page
- Requires email sending (same dependency as email verification)

## Low — nice to have

### Limit per-tag length
- In `lib/validations/game.ts`, add `.max(30)` after splitting tags

### Limit bio length
- Add Zod schema for bio in settings form (e.g. max 500 chars)
