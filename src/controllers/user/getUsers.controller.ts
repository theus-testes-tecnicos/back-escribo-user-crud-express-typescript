import { Request, Response } from "express";

import { getUsersService } from "../../services/user/getUsers.service";

export const getUsersController = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  const result = await getUsersService(
    req.baseUrl,
    Number(page) || 1,
    Number(limit) || 5
  );

  return res.status(200).json(result);
};
