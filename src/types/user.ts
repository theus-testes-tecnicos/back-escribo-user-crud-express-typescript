import { Phone } from "../entities/phone";
import { Session } from "../entities/session";

import { IPhoneRequest } from "./phone";

export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: string;
  name: string;
  email: string;
  password: string;
  phones: Phone[];
  session: Session;
}

export interface IUserRequest {
  nome: string;
  email: string;
  senha: string;
  telefones: IPhoneRequest[];
}
