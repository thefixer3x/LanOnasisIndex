# Makefile for Lan Onasis development

.PHONY: help dev build test clean stop logs shell netlify-test

help:
	@echo "Lan Onasis Development Commands:"
	@echo "  make dev          - Start development server with hot reload"
	@echo "  make build        - Test production build locally"
	@echo "  make netlify-test - Test Netlify build locally"
	@echo "  make stop         - Stop all containers"
	@echo "  make logs         - View container logs"
	@echo "  make shell        - Open shell in container"
	@echo "  make clean        - Clean up containers and build files"

dev:
	@echo "Starting development server..."
	docker-compose up app

build:
	@echo "Testing production build..."
	docker-compose --profile build up build-test
	@echo "Build completed! Check ./dist directory"

netlify-test:
	@echo "Testing Netlify configuration..."
	@docker run --rm -v $(PWD):/app -w /app node:18-alpine sh -c \
		"npm ci && npm run build && echo 'Build successful!'"
	stop:
	docker-compose down

logs:
	docker-compose logs -f app

shell:
	docker-compose exec app sh

clean:
	docker-compose down -v
	rm -rf dist node_modules
	@echo "Cleaned up containers and build artifacts"