import "dotenv/config";

import { app } from "./app";
import { AppDataSource } from "./data-source";

const init = async () => {
  const SERVER_PORT = process.env.SERVER_PORT || 3001;

  await AppDataSource.initialize()
    .then((_) => {
      console.log(
        "Banco de dados inicializado e conectado. Portas: local => 5050, container => 5432"
      );

      app.listen(SERVER_PORT, () => {
        console.log(`servidor inicializado na porta ${SERVER_PORT}`);
      });
    })
    .catch((e: any) => {
      console.log("erro ao inicializar o banco de dados:");
      console.log(e);
    });
};

init();
