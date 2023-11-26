#!/bin/bash

ARQUIVO_DOCKER_COMPOSE="docker-compose.yml"

cat <<EOF > "$ARQUIVO_DOCKER_COMPOSE"
version: "3.9"

services:
  database:
    container_name: database
    image: postgres:latest
    env_file:
      - .env
    ports:
      - 5050:5432
    healthcheck:
      test: ["CMD-SHELL", "pg_is_ready -U escribo -d escribo"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 5s
    volumes:
      - escribo:/var/lib/postgresql/data:rw

volumes:
  escribo:
    external: true
EOF

echo "Arquivo $ARQUIVO_DOCKER_COMPOSE criado com sucesso."

