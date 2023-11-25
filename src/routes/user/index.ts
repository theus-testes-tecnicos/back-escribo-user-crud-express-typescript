import { Router } from "express";

import { createUserController } from "../../controllers/user/createUser.controller";
import { retrieveUserController } from "../../controllers/user/retrieveUser.controller";
import { getUsersController } from "../../controllers/user/getUsers.controller";

import { verifyCreateUserFieldsMiddleware } from "../../middleware/verifyCreateUserFields.middleware";
import { isAuthenticatedMiddleware } from "../../middleware/isAuthenticated.middleware";

const router = Router();

export const userRoutes = () => {
  router.post("", verifyCreateUserFieldsMiddleware, createUserController);

  router.use(isAuthenticatedMiddleware);

  router.get("", getUsersController);
  router.get("/profile", retrieveUserController);

  return router;
};
