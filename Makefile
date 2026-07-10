.DEFAULT_GOAL := help

.PHONY: dev stop restart logs rebuild reset-db migrate studio seed \
        migrate-prod seed-prod build-prod deploy help

COMPOSE_DEV   = -f compose.yml -f compose.dev.yml

##=== Development ===

dev: ## Start the development environment (Postgres + MinIO + app)
	docker compose $(COMPOSE_DEV) up -d

stop: ## Stop the development environment
	docker compose $(COMPOSE_DEV) down

restart: stop dev ## Restart the development environment

logs: ## Tail all logs
	docker compose $(COMPOSE_DEV) logs -f

rebuild: ## Rebuild images and restart dev
	docker compose $(COMPOSE_DEV) down
	docker compose $(COMPOSE_DEV) build --no-cache
	docker compose $(COMPOSE_DEV) up -d

reset-db: ## Wipe volumes, restart, auto-migrate
	docker compose $(COMPOSE_DEV) down -v
	docker compose $(COMPOSE_DEV) up -d
	docker compose $(COMPOSE_DEV) exec -T app npx prisma migrate dev

migrate: ## Create + apply a migration (usage: name=xyz)
	docker compose $(COMPOSE_DEV) exec app npx prisma migrate dev $(if $(name),--name $(name),)

studio: ## Open Prisma Studio
	docker compose $(COMPOSE_DEV) exec app npx prisma studio --browser none

seed: ## Seed the database with sample data (dev)
	docker compose $(COMPOSE_DEV) exec app npx prisma db seed

##=== Production (Vercel + Supabase) ===

migrate-prod: ## Apply migrations to the production database (Supabase)
	npx prisma migrate deploy

seed-prod: ## Seed the production database with sample data (Supabase)
	npx prisma db seed

build-prod: ## Build the Next.js application for production
	npm run build

deploy: ## Deploy to Vercel (run migrate-prod + seed-prod first if needed)
	npx vercel --prod

##=== Utility ===

help: ## Show this help
	@awk 'BEGIN {FS = ":.*## "; printf "\n"} \
		/^##===/ { gsub(/^##===/, ""); print "\033[33m=====" $$0 "=====\033[0m" } \
		/^[a-zA-Z_-]+:.*## / { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 } \
		END { printf "\n" }' $(MAKEFILE_LIST)
