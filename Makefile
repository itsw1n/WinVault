.PHONY: up down restart reset rebuild migrate studio dev logs

up:
	docker compose --env-file .env up -d

down:
	docker compose --env-file .env down

restart: down up

reset:
	docker compose --env-file .env down -v
	docker compose --env-file .env up -d
	$(MAKE) migrate

rebuild:
	docker compose --env-file .env down
	docker compose build --no-cache
	docker compose --env-file .env up -d

migrate:
	DATABASE_URL="$$(grep -oP '^DATABASE_URL="?\K[^"]+' .env)" \
	DIRECT_URL="$$(grep -oP '^DIRECT_URL="?\K[^"]+' .env)" \
	npx prisma migrate dev --name "$${name:-auto}"

studio:
	DATABASE_URL="$$(grep -oP '^DATABASE_URL="?\K[^"]+' .env)" \
	DIRECT_URL="$$(grep -oP '^DIRECT_URL="?\K[^"]+' .env)" \
	npx prisma studio

logs:
	docker compose --env-file .env logs -f
