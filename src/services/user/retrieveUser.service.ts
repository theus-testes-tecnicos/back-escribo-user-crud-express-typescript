import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/user";
import { UserSerializer } from "../../serializers/user.serializer";

export const retrieveUserService = async (userId: string, token: string) => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOneBy({ id: userId });

  if (!user) {
    throw new AppError(404, "Usuário não encontrado");
  }

  const serializedUser = new UserSerializer(user, token);

  return serializedUser;
};
