import { Router } from "express";
import { isAuthenticatedMiddleware } from "../../middleware/isAuthenticated.middleware";
import { getUsersController } from "../../controllers/user/getUsers.controller";

const router = Router();

export const userRoutes = () => {
  router.get("", isAuthenticatedMiddleware, getUsersController);

  return router;
};
