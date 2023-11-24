import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppDataSource } from "../data-source";

export const isAuthenticatedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError(401, "missing authorization token");
  }

  const tokenArr = authorization.split(" ");
  let token: string;

  if (tokenArr.length > 1) {
    if (tokenArr[0].toLowerCase() !== "bearer") {
      throw new AppError(400, "authentication token must be of type bearer");
    }

    token = tokenArr[1];
  } else {
    token = tokenArr[0];
  }

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) {
      throw new AppError(401, "invalid or expired token");
    }

    req.userId = decoded.id;
    next();
  });
};
