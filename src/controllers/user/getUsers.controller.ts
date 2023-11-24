import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { getUsersService } from "../../services/user/getUsers.service";

export const getUsersController = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  const result = await getUsersService(
    req.baseUrl,
    Number(page),
    Number(limit)
  );

  return res.status(200).json(instanceToPlain(result));
};
