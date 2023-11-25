import { Request, Response } from "express";
import { createUserService } from "../../services/user/createUser.service";
import { IUserRequest } from "../../types/user";

export const createUserController = async (req: Request, res: Response) => {
  const createdUser = await createUserService(req.body);

  return res.status(201).json(createdUser);
};
