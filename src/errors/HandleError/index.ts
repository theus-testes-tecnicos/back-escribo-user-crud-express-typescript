import { Request, Response, NextFunction } from "express";

import { AppError } from "../AppError";

export const handleErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: "error", codigo: err.statusCode, mensagem: err.message });
  } else {
    return res.status(500).json({
      status: "error",
      codigo: 500,
      mensagem: "internal server error",
    });
  }
};
