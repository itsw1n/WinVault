# PlayVault

Community-driven indie game discovery platform. Next.js 14+, Prisma + Postgres, Auth.js.

## Local Development

### Prerequisites

- Node.js 18+
- Docker + Docker Compose

### First-time setup

```bash
# 1. Clone and install
npm install

# 2. Configure environment
cp .env.example .env.local

# 3. Start the database
make up

# 4. Run initial migration
make migrate

# 5. Start the dev server
make dev
```

Open [http://localhost:3000](http://localhost:3000).

### Daily flow

```bash
make up        # Start the database (detached)
make dev       # Start the Next.js dev server

# --- work ---

make down      # Stop the database
```

### Resetting the database

```bash
make reset     # Wipes volume, recreates, runs migrations
```

### Migrations

```bash
make migrate   # Create/apply a new migration (prisma migrate dev)
make studio    # Open Prisma Studio to browse data
```

## Production (Supabase + Vercel)

Steps to deploy (one-time config, no code changes needed):

1. Create a Supabase project
2. Copy the pooled connection string → `DATABASE_URL` (port 6543)
3. Copy the direct connection string → `DIRECT_URL` (port 5432)
4. Generate a random `AUTH_SECRET` with `openssl rand -base64 32`
5. Set all env vars in Vercel's project dashboard
6. Connect the repo to Vercel — every push auto-deploys
7. The build script (`prisma migrate deploy && next build`) runs migrations on every deploy

## Architecture

- **Server components** handle all reads — no client-side data fetching.
- **Server actions** handle all writes — no REST endpoints.
- **Services** contain business logic, zero Next.js dependency, unit-testable.
- **Zod schemas** live in `lib/validations/` and are shared by forms and actions.
