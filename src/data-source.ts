import "dotenv/config";
import "reflect-metadata";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/**.{ts,js}");
  const migrationPath: string = path.join(__dirname, "./migrations/**.{ts,js}");

  const dbUrl: string | undefined = process.env.POSTGRES_URL;
  const dbUrlMig: string | undefined = process.env.POSTGRES_URL_MIG;

  if (!dbUrl) throw new Error("Missing env var: 'POSTGRES_URL'");

  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (nodeEnv === "migration" || nodeEnv === "local") {
    return {
      type: "postgres",
      url: dbUrlMig,
      synchronize: false,
      logging: true,
      entities: [entitiesPath],
      migrations: [migrationPath],
    };
  }

  return {
    type: "postgres",
    url: dbUrl,
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationPath],
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());
