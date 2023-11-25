import { Request, Response, NextFunction } from "express";
import { createUserSchema } from "../schemas/createUser.schema";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";

export const verifyCreateUserFieldsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nome, email, senha, telefones } = req.body;

  if (!nome || !email || !senha || !telefones) {
    throw new AppError(
      400,
      "The nome, email, senha and telefones fields are mandatory"
    );
  }

  try {
    const validated = createUserSchema.parse({ nome, email, senha, telefones });

    console.log(validated);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMsg = error.errors.map((err) => err.message).join(". ");

      throw new AppError(400, errorMsg);
    } else {
      throw new AppError(500, "internal server error");
    }
  }
};
