import { User } from "../entities/user";

export class UserSerializer {
  id: string;
  data_criacao: Date;
  data_atualizacao: Date;
  ultimo_login: Date;
  token?: string;

  constructor(user: User, token?: string) {
    this.id = user.id;
    this.data_criacao = user.createdAt;
    this.data_atualizacao = user.updatedAt;
    this.ultimo_login = user.lastLogin;
    this.token = token;
  }
}
