import { Request, Response, NextFunction } from "express";
import { AppError } from "../AppError";

export const handleErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: "error", code: err.statusCode, message: err.message });
  } else {
    return res
      .status(500)
      .json({ status: "error", code: 500, message: "internal server error" });
  }
};
