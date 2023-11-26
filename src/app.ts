import "express-async-errors";
import express, { Request, Response } from "express";
import cors from "cors";

import { handleErrorMiddleware } from "./errors/HandleError";
import { routes } from "./routes";
import { AppError } from "./errors/AppError";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("", (req: Request, res: Response) => {
  return res.json({ message: "Teste técnico da empresa Escribo" });
});

routes(app);

app.use((req: Request, res: Response) => {
  throw new AppError(404, "Rota não encontrada");
});

app.use(handleErrorMiddleware);
