import express, { Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
import { handleErrorMiddleware } from "./errors/HandleError";
import { AppError } from "./errors/AppError";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("", (req: Request, res: Response) => {
  // throw new AppError(404, "Teste de erro não encontrado");
  return res.json({ message: "Teste técnico da empresa Escribo" });
});

app.use(handleErrorMiddleware);
