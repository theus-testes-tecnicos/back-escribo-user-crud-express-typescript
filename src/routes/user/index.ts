import { Router } from "express";
import { isAuthenticatedMiddleware } from "../../middleware/isAuthenticated.middleware";
import { getUsersController } from "../../controllers/user/getUsers.controller";
import { createUserController } from "../../controllers/user/createUser.controller";
import { verifyCreateUserFieldsMiddleware } from "../../middleware/verifyCreateUserFields.middleware";
import { retrieveUserController } from "../../controllers/user/retrieveUser.controller";

const router = Router();

export const userRoutes = () => {
  router.post("", verifyCreateUserFieldsMiddleware, createUserController);

  router.use(isAuthenticatedMiddleware);

  router.get("", getUsersController);
  router.get("/profile", retrieveUserController);

  return router;
};
