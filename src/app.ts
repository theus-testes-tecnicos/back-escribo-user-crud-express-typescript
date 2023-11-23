import express, { Request, Response } from "express";
import cors from "cors";
import "express-async-errors";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("", (req: Request, res: Response) => {
  return res.json({ message: "Teste técnico da empresa Escribo" });
});
