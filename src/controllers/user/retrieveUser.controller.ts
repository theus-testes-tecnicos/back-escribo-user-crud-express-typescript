import { Request, Response } from "express";

import { retrieveUserService } from "../../services/user/retrieveUser.service";

export const retrieveUserController = async (req: Request, res: Response) => {
  const {
    userId,
    headers: { authorization },
  } = req;

  const token = authorization!.split(" ")[1];

  const user = await retrieveUserService(userId!, token);

  return res.status(200).json(user);
};
