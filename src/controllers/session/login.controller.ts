import { Request, Response } from "express";

import { loginService } from "../../services/session/login.service";

export const loginController = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  const loggedUser = await loginService(email, senha);

  return res.status(200).json(loggedUser);
};
