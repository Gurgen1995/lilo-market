# Makefile
.PHONY: up down dev seed logs test

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

test:
	cd apps/backend && pnpm run test && \
	cd apps/frontend && pnpm run test

postinstall:
	@echo "Running postinstall setup..."
	cd apps/backend && pnpm run db:migrate && pnpm run seed
	@echo "Setup complete! URLs:"
	@echo "- Frontend: http://localhost:3000"
	@echo "- Backend API: http://localhost:4000"
	@echo "- MailHog: http://localhost:8025"
	@echo "- MinIO Console: http://localhost:9001"