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
    .refine((value) => dddRegex.test(value), 'invalid "ddd" format'),

  numero: z
    .string()
    .refine((value) => phoneNumberRegex.test(value), 'invalid "numero" format'),
});

export const createUserSchema = z.object({
  nome: z
    .string()
    .refine(
      (value) => typeof value === "string",
      'value of "nome" must be string'
    ),

  email: z
    .string()
    .refine((value) => emailRegex.test(value), 'invalid "email" format'),

  senha: z
    .string()
    .refine(
      (value) => passwordRegex.test(value),
      'the "senha" field must contain at least one number, one uppercase letter, one lowercase letter, one special character and at least 8 characters'
    ),

  telefones: z.array(phoneSchema),
});
