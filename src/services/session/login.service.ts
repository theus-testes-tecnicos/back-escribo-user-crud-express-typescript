import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user";
import { compareSync } from "bcrypt";
import { AppError } from "../../errors/AppError";
import { generateToken } from "../../utils/generateToken";
import { UserSerializer } from "../../serializers/user.serializer";

export const loginService = async (email?: string, password?: string) => {
  if (!email || !password) {
    throw new AppError(400, "Campos email e senha são obrigatórios");
  }

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ email });

  if (!user) {
    throw new AppError(401, "Usuário e/ou senha inválidos");
  }

  const passwordMatch = compareSync(password, user.password);

  if (!passwordMatch) {
    throw new AppError(401, "Usuário e/ou senha inválidos");
  }

  await userRepo.update(user.id, { lastLogin: new Date() });

  const token = generateToken({ userId: user.id });

  const response = new UserSerializer(user, token);

  return response;
};
