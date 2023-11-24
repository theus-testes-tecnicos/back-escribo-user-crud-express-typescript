import { IUser } from "./user";

export interface IPhone {
  id: string;
  ddd: string;
  phoneNumber: string;
  user: IUser;
}

export interface IPhoneRequest {
  numero: string;
  ddd: string;
}
