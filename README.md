# PlayVault

Community-driven indie game discovery platform. Next.js 14+, Prisma + Postgres, Auth.js.
<img width="1920" height="1080" alt="screenshot-2026-07-08_08-59-13" src="https://github.com/user-attachments/assets/1f384545-7f91-43ae-8ff5-18fa9fa0d3fc" />
<img width="1920" height="1080" alt="screenshot-2026-07-08_08-58-36" src="https://github.com/user-attachments/assets/ca7129cc-b71a-4d1e-9456-ba2b94b38174" />

Publish your game, find something new, favorite the ones you love. No store fees, no approval queues, no ads.

## Tech

**Next.js 16** (App Router) · **PostgreSQL** via Prisma · **Auth.js** v5 (credentials, JWT) · **Tailwind** + CSS custom properties

## Local dev

```bash
npm install
cp .env.example .env
make up        # start postgres
make migrate   # run prisma migrations
make dev       # start dev server at localhost:3000
```

Or seed some sample data: `make seed`

### Commands

| `make up` | Start database |
|-----------|----------------|
| `make down` | Stop database |
| `make dev` | Next.js dev server |
| `make migrate` | Prisma migration |
| `make studio` | Prisma Studio |
| `make reset` | Wipe + recreate DB |
| `make seed` | Seed sample data |

## Layout

```
src/
├── app/               # Next.js App Router pages
│   ├── (public)/      #   sign-in, sign-up, games, about, developers
│   └── (dashboard)/   #   dashboard, account
├── components/
│   ├── ui/            # Button, Input, Modal, Card, Badge, Skeleton
│   ├── layout/        # Navbar, Footer, MobileNav, ThemeToggle
│   └── games/         # GameCard, FavoriteButton, SearchBar, forms
├── server/
│   ├── actions/       # Server actions (writes)
│   ├── services/      # Data access (reads)
│   └── errors/        # ActionError, wrap/ok/fail utilities
├── lib/               # Auth config, Prisma client, rate limiter, env
├── schemas/           # Zod validation schemas
├── types/             # Shared TypeScript types + next-auth augmentation
├── hooks/             # useModal
└── styles/            # Global CSS + theme variables
```

Reads are server components. Writes are server actions. Services stay framework-agnostic. Zod schemas are shared between client forms and server validation.

## Deploy

1. Supabase project → pooled URL as `DATABASE_URL`, direct as `DIRECT_URL`
2. Generate `AUTH_SECRET` with `openssl rand -base64 32`
3. Set env vars in Vercel, connect repo, push
