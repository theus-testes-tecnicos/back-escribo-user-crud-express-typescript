import { Request, Response } from "express";

import { createUserService } from "../../services/user/createUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const createdUser = await createUserService(req.body);

  return res.status(201).json(createdUser);
};
