import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

import { AppError } from "../errors/AppError";

export const isAuthenticatedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError(401, "Token de autorização ausente");
  }

  const tokenArr = authorization.split(" ");
  0;
  if (tokenArr.length < 2 || tokenArr[0].toLowerCase() !== "bearer") {
    throw new AppError(400, "Token inválido, deve ser do tipo Bearer");
  }

  const token: string = tokenArr[1];

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err instanceof TokenExpiredError) {
      throw new AppError(401, "Sessão inválida");
    }

    if (err) {
      throw new AppError(401, "Não autorizado");
    }

    req.userId = decoded.userId;
    next();
  });
};
