.PHONY: up down dev seed logs

up:
	docker compose up -d

down:
	docker compose down

dev:
	cd apps/backend && pnpm run start:dev & \
	cd apps/frontend && pnpm run dev

seed:
	cd apps/backend && pnpm run seed

logs:
	docker compose logs -f
