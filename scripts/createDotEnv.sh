#!/bin/bash

ARQUIVO_ENV=".env"

cat <<EOF > "$ARQUIVO_ENV"
POSTGRES_HOST=database
POSTGRES_USER=escribo
POSTGRES_PASSWORD=12345
POSTGRES_DB=escribo
POSTGRES_PORT=5432

SECRET_KEY=escribosecretkey

POSTGRES_URL=postgres://escribo:12345@database:5432/escribo
POSTGRES_URL_MIG=postgres://escribo:12345@localhost:5050/escribo
EOF

echo "Arquivo $ARQUIVO_ENV criado com sucesso."
