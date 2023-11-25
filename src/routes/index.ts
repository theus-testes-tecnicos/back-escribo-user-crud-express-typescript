import { Express } from "express";
import { userRoutes } from "./user";
import { sessionRoutes } from "./session";

export const routes = (app: Express): void => {
  app.use("/users", userRoutes());

  app.use("/login", sessionRoutes());
  app.use("/session/login", sessionRoutes());
  app.use("/signin", sessionRoutes());
};
