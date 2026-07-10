# PlayVault — Agent Guide

## Section 1 — Project Overview

PlayVault is a community-driven indie game discovery platform built with **Next.js 16** (App Router), **TypeScript** (strict), **NextAuth v5** (credentials + JWT), **Prisma** (PostgreSQL), **Tailwind CSS** (custom `pv-*` design tokens), **Zod** (validation), and **Docker Compose** (dev environment with Postgres + MinIO S3).

The app lets users browse indie games, sign up, publish their own games (title, description, genre, tags, external link, thumbnail), and favorite others. No game files are hosted — just links. Auth is credentials-only (username/email + password) with JWT sessions and token-version invalidation.

**Repo:** `https://github.com/itsw1n/WinVault`

---

## Section 2 — Critical Rules

These are hard constraints. Violating them will break the project.

1. **Never commit, push, PR, or merge unless explicitly asked.** Stage and commit only when the user says "commit" or "make a commit". Push only when they say "push".

2. **Never run destructive commands** (`make reset-db`, clean, drop, delete volume) unless explicitly asked.

3. **Never modify existing Prisma migration files.** Migrations are timestamped in `prisma/migrations/`. New schema changes go in a new migration via `make migrate name=descriptive_name`.

4. **Never expose secrets** — no hardcoded credentials, no logging `process.env` values, no committing `.env` or `.env.production`.

5. **Read the actual file before editing.** Never assume file contents based on naming alone.

6. **After completing any code change, run `make help` to verify available commands.**

---

## Section 3 — Git Rules

### Branching
- `main` — default branch, deployable at all times
- Feature branches: `feat/descriptive-name`
- Fix branches: `fix/descriptive-name`

### Workflow
1. Branch from `main`
2. Make changes in one logical unit per commit
3. Open PR when ready
4. Merge squash to `main`

### AI policy
**Suggest git commands, never run them.** Present the proposed command and wait for approval: "I suggest running `git add <file>` then `git commit -m "..."`. Shall I proceed?"

---

## Section 4 — Commit Convention

Format: `type(scope):lowercase description`

| Type | When to use |
|---|---|
| `feat` | New capability in one layer |
| `fix` | Bug fix in one layer |
| `refactor` | Restructure without behavior change |
| `docs` | Documentation only (README, AGENTS) |
| `style` | Formatting, spacing, no logic change |
| `chore` | Deps, config, tooling, Docker, Makefile |
| `test` | Adding or updating tests |

| Scope | Where the change lives |
|---|---|
| `docker` | Compose files, Dockerfile |
| `config` | Makefile, env files, next.config, tsconfig |
| `deps` | package.json dependencies |
| `auth` | Authentication/authorization |
| `backend` | Server actions, mutations, queries, lib |
| `ui` | React components, styles, layout |
| `routes` | app/ route files, page/layout/loading/error |
| `db` | Prisma schema, migrations |

**Examples:**
```
feat(backend):add S3 storage abstraction and thumbnail processor
feat(ui):add NotifDialog component with single okay button
chore(docker):add multi-stage Dockerfile and dev/prod compose structure
fix(backend):correct content-type header on upload response
refactor(backend):migrate url-safety to use imported env object
```

---

## Section 5 — Which Pattern to Use

This project uses **Server Actions** for all data mutations. API Routes (`app/api/`) exist only for the NextAuth catch-all (`[...nextauth]/route.ts`).

| Task | Use | Reason |
|---|---|---|
| Sign up, sign in, update profile | Server action | Mutation + redirect |
| Create, update, delete games | Server action | Mutation + revalidate |
| Toggle favorite | Server action | Mutation + revalidate |
| Check URL safety | Server action helper | Called from game actions |
| Auth callbacks | API route (`api/auth/[...nextauth]`) | Required by NextAuth |
| Read data in a page/layout | Direct `async` component or query | Server component, no action needed |
| Read data in a client component | Server action or hook | Use `useActionState` for form state |

**Never create a new API route unless there's a specific reason (webhook, external API, NextAuth).** Default to server actions for everything data-related.

---

## Section 6 — Folder Responsibilities

```
src/
├── app/                        # Next.js App Router pages
│   ├── (public)/               # Public routes (no auth required)
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Public layout (Navbar + Footer)
│   │   ├── loading.tsx         # Top-level loading state
│   │   ├── error.tsx           # Top-level error boundary
│   │   ├── about/page.tsx      # About page
│   │   ├── sign-in/page.tsx    # Sign-in page
│   │   ├── sign-up/page.tsx    # Sign-up page
│   │   ├── games/page.tsx      # Browse games
│   │   ├── games/[id]/page.tsx # Game detail
│   │   ├── games/[id]/page-client.tsx  # Game detail client interactivity
│   │   └── developers/[username]/page.tsx  # Developer profile
│   ├── (protected)/            # Protected routes (auth required)
│   │   ├── layout.tsx          # Dashboard layout (Navbar + Footer)
│   │   ├── dashboard/page.tsx  # Dashboard page
│   │   ├── dashboard/page-client.tsx    # Dashboard client interactivity
│   │   └── account/page.tsx    # Account settings
│   ├── api/auth/[...nextauth]/ # NextAuth route handler ONLY
│   ├── layout.tsx              # Root layout (fonts, providers, metadata)
│   ├── providers.tsx           # ThemeProvider + SessionProvider
│   └── not-found.tsx           # Custom 404
│
├── components/
│   ├── layout/                 # Layout components (navbar, footer, etc.)
│   └── ui/                     # Reusable UI primitives (index.ts barrel export)
│
├── features/                   # Feature-based modules
│   ├── auth/                   # Auth feature
│   │   ├── actions/auth.ts     # Server actions (signUp, signIn, updateProfile, revokeAllSessions)
│   │   ├── components/         # Auth-related client components
│   │   ├── mutations/auth.ts   # Pure Prisma writes
│   │   ├── queries/auth.ts     # Pure Prisma reads
│   │   └── schemas.ts          # Zod schemas (signUpSchema, signInSchema, updateProfileSchema)
│   ├── games/                  # Games feature
│   │   ├── actions/crud.ts     # Server actions (createGame, updateGame, deleteGame, toggleFavorite)
│   │   ├── components/         # Game-related components (game-card, thumbnail, etc.)
│   │   ├── mutations/games.ts  # Pure Prisma writes
│   │   ├── queries/games.ts    # Pure Prisma reads
│   │   └── schemas.ts          # Zod schemas + GENRES constant
│   └── dashboard/              # Dashboard feature
│       └── components/         # Dashboard-specific components (stat-card, etc.)
│
├── hooks/                      # Shared React hooks (use-modal)
├── lib/                        # Shared utilities
│   ├── auth/auth.ts            # NextAuth config (handlers, signIn, signOut, auth)
│   ├── auth/rate-limiter.ts    # In-memory rate limiter
│   ├── security/blocklist.ts   # Adult domain blocklist
│   ├── security/url-safety.ts  # URL safety check (blocklist + Google Safe Browsing)
│   ├── env.ts                  # Env var validation + export
│   ├── errors.ts               # ActionError class + ok/fail/wrap helpers
│   ├── prisma.ts               # Prisma client singleton
│   ├── process-thumbnail.ts    # Sharp thumbnail processor
│   ├── storage.ts              # S3 upload wrapper
│   └── utils.ts                # cn() helper
│
├── styles/
│   └── globals.css             # CSS reset + custom properties (light/dark themes)
│
└── types/                       # Shared TypeScript types (index.ts barrel export)
    ├── action-result.ts         # ErrorCode, ActionResult<T>
    ├── game.ts                  # Game, FavoriteGame
    ├── user.ts                  # User
    └── index.ts                 # Barrel export of all types
```

**Rules:**
- Feature logic goes in `features/<name>/`. Never put game logic in `lib/` or `components/`.
- Reusable UI goes in `components/ui/` with barrel export.
- Layout-specific components go in `components/layout/`.
- Shared types go in `types/` with barrel export.
- No file should import from `prisma` directly outside of `features/*/mutations/`, `features/*/queries/`, and `lib/auth/auth.ts`.

---

## Section 7 — Coding Standards

### TypeScript
- Use `strict: true` — no `any` unless absolutely necessary and justified
- `@/*` path alias maps to `./src/*` — always use this, never relative imports outside the same directory
- Prefer `interface` over `type` for object shapes; use `type` for unions, aliases
- Use `export function Foo()` — never `export default`
- Use PascalCase for types/interfaces, camelCase for functions/variables, UPPER_SNAKE for constants

### Naming
- Server actions: `verbNoun` — `createGame`, `signIn`, `toggleFavorite`
- Mutations: same as action but focused on DB — `updateUser`, `deleteGame`
- Queries: `getNoun` — `getGames`, `getGameById`, `getFavoritedGameIds`
- Components: PascalCase — `GameCard`, `Navbar`, `SignOutButton`
- Files: kebab-case — `sign-out-button.tsx`, `auth-aware-link.tsx`

### Error handling
All server actions must use the `wrap()`/`ok()`/`fail()` pattern from `@/lib/errors`:
```ts
import { wrap, fail } from "@/lib/errors"
import { ActionError } from "@/lib/errors"

const result = await wrap(() => someOperation())
if (!result.success) return result
```
Mutations throw `ActionError`, `wrap()` catches it and returns `fail(code, message)`.

### What to avoid
- No `tailwind-merge` usage in the current codebase — use `clsx` from `clsx` or `cn()` from `@/lib/utils`
- No `zsa` usage — imported in deps but unused
- No inline `process.env` access — import `env` from `@/lib/env` instead
- No `console.log` in production code — use `console.error` for server-side error logging only
- No `"use client"` on components that don't need it (server components by default)

### Component styling
- Use custom `pv-*` Tailwind tokens: `bg-pv-primary`, `border-pv-border`, `text-pv-text`, `text-pv-muted`, `bg-pv-card`, `rounded-pv`/`rounded-pv-sm`
- Themed border style: `border-[2.5px] border-pv-border rounded-pv` is the standard card/box style

---

## Section 8 — API Contracts

All server actions return `ActionResult<T>`:

```ts
// Success
{ success: true, data: T }

// Error
{ success: false, code: ErrorCode, message: string, details?: unknown }
```

Error codes and their default messages:

| Code | Default message | When thrown |
|---|---|---|
| `UNAUTHORIZED` | "You must be signed in to do that" | Session check fails |
| `NOT_FOUND` | "Resource not found" | DB query returns empty |
| `VALIDATION` | "Invalid data provided" | Zod parse fails |
| `CONFLICT` | "This resource already exists" | Unique constraint violation |
| `FORBIDDEN` | "You don't have permission to do that" | Owner check fails |
| `INTERNAL` | "Something went wrong" | Unhandled error |

Import: `import type { ActionResult, ErrorCode } from "@/types"`

---

## Section 9 — Database Rules

### Prisma client
- Singleton via `@/lib/prisma` — uses global caching in dev
- Never create a new `PrismaClient()` — always import `prisma` from `@/lib/prisma`

### Read/write separation
- **Queries** (`features/*/queries/`) — pure reads via `prisma.game.findMany()`, etc. Throw `ActionError` if not found.
- **Mutations** (`features/*/mutations/`) — pure writes via `prisma.game.create()`, etc. Throw `ActionError` on missing records.

### Migrations
- Never edit existing migration files in `prisma/migrations/`
- Create new migrations: `make migrate name=descriptive_name`
- Always `npx prisma generate` after schema changes (done automatically by `migrate dev`)

### No raw SQL
Never use `$queryRaw` or `$executeRaw` — Prisma's query API is sufficient.

---

## Section 10 — When Adding a New Feature

Follow this checklist in order:

1. **Define the schema** in `features/<name>/schemas.ts` (Zod)
2. **Define types** in `types/<name>.ts` if new shapes are needed
3. **Write mutations** in `features/<name>/mutations/` (Prisma writes, throw `ActionError`)
4. **Write queries** in `features/<name>/queries/` (Prisma reads)
5. **Write server actions** in `features/<name>/actions/` (auth + validation + call mutations/queries + revalidate)
6. **Build UI components** in `features/<name>/components/`
7. **Create route file** in `app/(group)/path/page.tsx`
8. **Verify** — `make help` to check commands, `npx tsc --noEmit` for type errors

---

## Section 11 — Commands Reference (Makefile)

```
Usage: make <target>

Development:
  dev                   Start the development environment (Postgres + MinIO + app)
  stop                  Stop the development environment
  restart               Restart the development environment
  logs                  Tail all logs
  rebuild               Rebuild images and restart dev
  reset-db              Wipe volumes, restart, auto-migrate
  migrate name=xyz      Create + apply a migration
  studio                Open Prisma Studio

Production:
  prod                  Start the production environment
  stop-prod             Stop the production environment
  restart-prod          Restart the production environment
  logs-prod             Tail production logs
  rebuild-prod          Rebuild images and restart prod
  migrate-prod          Apply production migrations

Utility:
  help                  Show this help
```

---

## Section 12 — What NOT to Do

- **Do not commit, push, PR, or merge** unless told
- **Do not edit existing migrations** — new schema changes = new migration
- **Do not run `make reset-db`** unless asked (wipes all data)
- **Do not add API routes** unless truly necessary (NextAuth only)
- **Do not add `"use client"` unnecessarily** — server components are the default
- **Do not use `any`** without an explicit justification comment
- **Do not hardcode secrets** in any file
- **Do not use `process.env` directly** — import `env` from `@/lib/env`
- **Do not create new PrismaClient instances** — use the singleton from `@/lib/prisma`
- **Do not use raw SQL** (`$queryRaw`, `$executeRaw`)
- **Do not put feature logic in `lib/`** — use `features/<name>/`
- **Do not use relative imports** for cross-module imports — use `@/` alias
- **Do not write components without reading existing similar components first** — match the codebase style
- **Do not create a file without first checking .prettierrc and .editorconfig** (formatting rules)

---

## Section 13 — Linting, Formatting, and Quality Rules

### Formatting
- No Prettier config exists yet. The codebase uses **implicit conventions**: single quotes, no semicolons, 2-space indentation. Match the existing file style.
- If `.prettierrc` is added later, all files must conform.
- Trailing commas on multiline (ES5 standard).

### Linting
- ESLint is configured via `.eslintrc.json` with `{ "extends": "next/core-web-vitals" }`.
- Run `make lint` after every change (maps to `npm run lint` which runs `next lint`).
- Never present code as complete if it contains ESLint violations.

### TypeScript
- Run `npx tsc --noEmit` to verify type correctness.
- Fix all type errors before marking work as done.

### Testing
- No test framework is configured yet.
- For any new non-trivial logic, include an `assert`-based demo check if possible.

### Server vs Client Components
- **Server component by default.** Only add `"use client"` when you need:
  - `useState`, `useEffect`, `useActionState`
  - `useSession` from `next-auth/react`
  - `useRouter`, `usePathname`
  - Event handlers (`onClick`, `onSubmit`)
  - Browser-only APIs (`window`, `localStorage`)
- Example: `navbar.tsx` is a server component that calls `auth()` and passes `session` as a prop to `MobileNav` (client). `MobileNav` needs `"use client"` because it has interactive state (open/close drawer).

### Security
- Never log user data, tokens, or secrets
- Never expose tokens in client components
- Never skip auth checks — every server action that mutates data must call `auth()` and validate `userId`
- Never pass `session` from a parent to bypass auth in a child — each action re-checks on the server

### When to ask vs when to proceed
- **Proceed** with: fixing obvious bugs, adding validated features, updating config files, refactoring within established patterns
- **Ask** before: adding new dependencies, changing the database schema, creating new API routes, restructuring folders, running destructive commands
