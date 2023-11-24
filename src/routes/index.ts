import { Express } from "express";
import { userRoutes } from "./user";

export const routes = (app: Express): void => {
  app.use("/users", userRoutes());
};
