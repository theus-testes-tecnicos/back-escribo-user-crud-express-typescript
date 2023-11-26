import { z } from "zod";

const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const dddRegex = /^\d{2}$/;
const phoneNumberRegex = /^\d{8,9}$/;

const phoneSchema = z.object({
  ddd: z
    .string()
    .refine((value) => dddRegex.test(value), "Formato ddd inválido"),

  numero: z
    .string()
    .refine(
      (value) => phoneNumberRegex.test(value),
      "Formato de número inválido"
    ),
});

export const createUserSchema = z.object({
  nome: z
    .string()
    .refine(
      (value) => typeof value === "string",
      "Campo nome deve ser uma string"
    ),

  email: z
    .string()
    .refine((value) => emailRegex.test(value), "Formato de email inválido"),

  senha: z
    .string()
    .refine(
      (value) => passwordRegex.test(value),
      "O campo senha deve conter ao menos 1 letra maiúscula, 1 minúscula, 1 número, 1 caractere especial e no mínimo 8 caracteres"
    ),

  telefones: z
    .array(phoneSchema)
    .min(1, "Especifique ao menos 1 número de telefone"),
});
