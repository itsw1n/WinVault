.PHONY: up down restart reset rebuild migrate studio dev logs

up:
	docker compose --env-file .env up -d

down:
	docker compose --env-file .env down

restart: down up

reset:
	docker compose --env-file .env.local down -v
	docker compose --env-file .env.local up -d
	$(MAKE) migrate

rebuild:
	docker compose --env-file .env.local down
	docker compose build --no-cache
	docker compose --env-file .env.local up -d

migrate:
	DATABASE_URL="$$(grep -oP '^DATABASE_URL="?\K[^"]+' .env.local)" \
	DIRECT_URL="$$(grep -oP '^DIRECT_URL="?\K[^"]+' .env.local)" \
	npx prisma migrate dev --name "$${name:-auto}"

studio:
	DATABASE_URL="$$(grep -oP '^DATABASE_URL="?\K[^"]+' .env.local)" \
	DIRECT_URL="$$(grep -oP '^DIRECT_URL="?\K[^"]+' .env.local)" \
	npx prisma studio

dev:
	fuser -k 3000/tcp 2>/dev/null || true
	npm run dev

logs:
	docker compose --env-file .env.local logs -f
