.PHONY: dev stop restart logs rebuild reset-db migrate studio \
        prod stop-prod restart-prod logs-prod migrate-prod rebuild-prod

COMPOSE_DEV   = -f compose.yml -f compose.dev.yml
COMPOSE_PROD  = -f compose.yml -f compose.prod.yml

# ── Development ──────────────────────────────────────────

dev:
	docker compose $(COMPOSE_DEV) up -d

stop:
	docker compose $(COMPOSE_DEV) down

restart: stop dev

logs:
	docker compose $(COMPOSE_DEV) logs -f

rebuild:
	docker compose $(COMPOSE_DEV) down
	docker compose $(COMPOSE_DEV) build --no-cache
	docker compose $(COMPOSE_DEV) up -d

reset-db:
	docker compose $(COMPOSE_DEV) down -v
	docker compose $(COMPOSE_DEV) up -d
	docker compose $(COMPOSE_DEV) exec -T app npx prisma migrate dev

migrate:
	docker compose $(COMPOSE_DEV) exec app npx prisma migrate dev $(if $(name),--name $(name),)

studio:
	docker compose $(COMPOSE_DEV) exec app npx prisma studio --browser none

# ── Production ───────────────────────────────────────────

prod:
	docker compose $(COMPOSE_PROD) up -d

stop-prod:
	docker compose $(COMPOSE_PROD) down

restart-prod: stop-prod prod

logs-prod:
	docker compose $(COMPOSE_PROD) logs -f

rebuild-prod:
	docker compose $(COMPOSE_PROD) down
	docker compose $(COMPOSE_PROD) build --no-cache
	docker compose $(COMPOSE_PROD) up -d

migrate-prod:
	docker compose $(COMPOSE_PROD) exec -T app npx prisma migrate deploy
