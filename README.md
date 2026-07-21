# PlayVault

Community-driven indie game discovery platform. Next.js 16, Prisma + Postgres, Auth.js.
<img width="1446" height="1080" alt="screenshot-2026-07-21_23-53-31" src="https://github.com/user-attachments/assets/328d732d-4022-47f0-bcd3-7cd24802587b" />
<img width="1447" height="1080" alt="screenshot-2026-07-21_23-56-03" src="https://github.com/user-attachments/assets/722b1eb7-342f-4ffb-9351-ead314abc9f2" />
<img width="1380" height="1080" alt="screenshot-2026-07-21_23-56-32" src="https://github.com/user-attachments/assets/6586eb91-459b-42c3-9568-ecb497f0a7e4" />


Publish your game, find something new, favorite the ones you love. No store fees, no approval queues, no ads.

## Tech

**Next.js 16** (App Router) · **PostgreSQL** via Prisma · **Auth.js** v5 (credentials, JWT) · **Tailwind** + CSS custom properties

## Architecture

| Environment | Stack |
|---|---|
| **Development** | Docker Compose (Postgres + MinIO + Next.js) |
| **Production** | Vercel (hosting) + Supabase (PostgreSQL + S3 Storage) |

## Local dev

```bash
make dev          # start Postgres + MinIO + app in Docker
make migrate      # run prisma migrations
make seed         # seed sample data
```

Open [http://localhost:3000](http://localhost:3000)

### Commands

| `make dev` | Start development environment |
|------------|-------------------------------|
| `make stop` | Stop development environment |
| `make restart` | Restart development environment |
| `make logs` | Tail all logs |
| `make rebuild` | Rebuild Docker images and restart |
| `make reset-db` | Wipe volumes, restart, auto-migrate |
| `make migrate name=xyz` | Create + apply a migration |
| `make studio` | Open Prisma Studio |
| `make seed` | Seed sample data |
| `make lint` | Run ESLint |

## Deploy (Vercel + Supabase)

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com) and create a new project. Once it's ready, go to **Settings → Database** and copy:
- **Connection Pooling URI** → `DATABASE_URL`
- **Direct Connection** → `DIRECT_URL`

Then go to **Settings → Storage → S3 Compatibility** and copy the access keys for `STORAGE_*` variables.

### 2. Set environment variables in Vercel

In the **Vercel Dashboard → Settings → Environment Variables**, add these (all marked **Production**):

| Variable | Required | Value |
|---|---|---|
| `DATABASE_URL` | Yes | Supabase pooled connection string |
| `DIRECT_URL` | Yes | Supabase direct connection string |
| `AUTH_SECRET` | Yes | Run `openssl rand -base64 32` and paste the output |
| `NEXT_PUBLIC_APP_URL` | Yes | `https://your-project.vercel.app` |
| `STORAGE_ENDPOINT` | Yes | `https://[PROJECT].supabase.co/storage/v1/s3` |
| `STORAGE_ACCESS_KEY` | Yes | From Supabase Storage S3 settings |
| `STORAGE_SECRET_KEY` | Yes | From Supabase Storage S3 settings |
| `STORAGE_BUCKET` | Yes | `thumbnails` |
| `STORAGE_PUBLIC_URL` | Yes | `https://[PROJECT].supabase.co/storage/v1/object/public/thumbnails` |
| `GOOGLE_SAFE_BROWSING_API_KEY` | No | Leave empty or set to `not-configured` |

### 3. Connect your repo to Vercel

Import your GitHub repo in the Vercel Dashboard. The build command defaults to `npm run build` (which runs `next build` — migrations are **not** part of the build).

### 4. Deploy

```bash
make migrate-prod   # apply migrations to Supabase (run locally with .env.production)
make seed-prod      # (optional) seed production DB
make deploy         # npx vercel --prod
```

These steps are **intentionally separate** — if a migration fails, you fix it and retry without redeploying.

## Layout

```
src/
├── app/                   # Next.js App Router pages
│   ├── (public)/          #   sign-in, sign-up, games, about, developers
│   └── (protected)/       #   dashboard, account
├── components/
│   ├── layout/            # Navbar, Footer, MobileNav, HeroBanner, SearchBar
│   └── ui/                # Button, Input, Modal, Card, Badge, Thumbnail, etc.
├── features/              # Feature-based modules
│   ├── auth/              #   actions, mutations, queries, schemas, components
│   ├── games/             #   actions, mutations, queries, schemas, components
│   └── dashboard/         #   components (game forms, stats, list)
├── hooks/                 # useModal
├── lib/                   # Auth config, Prisma, env, errors, storage, utils
├── styles/                # Global CSS + theme variables
└── types/                 # Shared TypeScript types + next-auth augmentation
```

Reads are server components. Writes are server actions. Zod schemas are shared between client forms and server validation.
