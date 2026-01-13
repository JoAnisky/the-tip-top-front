# Lancer le projet en dev
up-dev:
	docker compose --env-file .docker/.env.docker.dev up -d --build

# Lancer le projet en prod
up-prod:
	docker compose --env-file .docker/.env.docker.prod up -d --build

# Stopper et nettoyer en dev
down-dev:
	docker compose --env-file .docker/.env.docker.dev down -v

# Stopper en prod
down-prod:
	docker compose --env-file .docker/.env.docker.prod down

# Afficher les logs du conteneur ttt-front en dev
logs-dev:
	docker compose --env-file .docker/.env.docker.dev logs -f ttt-front

# Afficher les logs du conteneur ttt-front en prod
logs-prod:
	docker compose --env-file .docker/.env.docker.prod logs -f ttt-front