#!/bin/bash

docker volume create escribo
docker-compose up -d

if [ $? -eq 0 ]; then
  echo "Tarefas do Docker concluídas com sucesso."
  exit 0
else
  echo "Erro ao executar as tarefas do Docker."
  exit 1
fi
