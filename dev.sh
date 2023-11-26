#!/usr/bin/env bash
# exit on error
set -o errexit

chmod +x ./scripts/createDotEnv.sh
chmod +x ./scripts/createDockerCompose.sh
chmod +x ./scripts/dependencies.sh
chmod +x ./scripts/docker.sh

./scripts/createDotEnv.sh
./scripts/createDockerCompose.sh
./scripts/dependencies.sh
./scripts/docker.sh

if [ $? -eq 0 ]; then
  echo "docker.sh foi concluído com sucesso. Executando migrations.sh."
  NODE_ENV=migration npm run typeorm migration:run -- -d src/data-source.ts
  NODE_ENV=local npm run dev
else
  echo "docker.sh falhou. Não executando migrations.sh."
fi








npm i

docker volume create escribo
docker-compose up -d

NODE_ENV=migration npm run typeorm migration:run -- -d ./src/data-source.ts

NODE_ENV=local npm run dev
