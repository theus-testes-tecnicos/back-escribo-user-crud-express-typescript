#!/usr/bin/env bash
# exit on error
set -o errexit

npm i
npm run build

docker volume create escribo
docker-compose up -d

NODE_ENV=migration npm run typeorm migration:run -- -d dist/src/data-source.js

NODE_ENV=local npm run start
