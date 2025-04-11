# NU-DATA-UI Makefile
# Provides convenient commands for local development

.PHONY: up down logs db-reset clean help

# Default target
help:
	@echo "NU-DATA-UI Development Commands"
	@echo "------------------------------"
	@echo "make up        - Start all services"
	@echo "make down      - Stop all services"
	@echo "make logs      - View logs from all services"
	@echo "make db-reset  - Reset the database"
	@echo "make clean     - Remove all containers and volumes"
	@echo "make help      - Show this help message"

# Start all services
up:
	docker-compose up -d

# Start all services with logs
up-logs:
	docker-compose up

# Stop all services
down:
	docker-compose down

# View logs from all services
logs:
	docker-compose logs -f

# Reset the database
db-reset:
	docker-compose down -v postgres
	docker-compose up -d postgres

# Remove all containers and volumes
clean:
	docker-compose down -v
	docker system prune -f
