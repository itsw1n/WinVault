.DEFAULT_GOAL := help

.PHONY: dev stop restart logs rebuild reset-db migrate studio seed \
        prod stop-prod restart-prod logs-prod migrate-prod rebuild-prod seed-prod help

COMPOSE_DEV   = -f compose.yml -f compose.dev.yml
COMPOSE_PROD  = -f compose.yml -f compose.prod.yml

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

##=== Production ===

prod: ## Start the production environment
	docker compose $(COMPOSE_PROD) up -d

stop-prod: ## Stop the production environment
	docker compose $(COMPOSE_PROD) down

restart-prod: stop-prod prod ## Restart the production environment

logs-prod: ## Tail production logs
	docker compose $(COMPOSE_PROD) logs -f

rebuild-prod: ## Rebuild images and restart prod
	docker compose $(COMPOSE_PROD) down
	docker compose $(COMPOSE_PROD) build --no-cache
	docker compose $(COMPOSE_PROD) up -d

migrate-prod: ## Apply production migrations
	docker compose $(COMPOSE_PROD) exec -T app npx prisma migrate deploy

seed-prod: ## Seed the database with sample data (production)
	docker compose $(COMPOSE_PROD) exec app npx prisma db seed

##=== Utility ===

help: ## Show this help
	@awk 'BEGIN {FS = ":.*## "; printf "\n"} \
		/^##===/ { gsub(/^##===/, ""); print "\033[33m=====" $$0 "=====\033[0m" } \
		/^[a-zA-Z_-]+:.*## / { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 } \
		END { printf "\n" }' $(MAKEFILE_LIST)
