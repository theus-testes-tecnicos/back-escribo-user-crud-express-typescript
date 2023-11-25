import { hashSync } from "bcrypt";
import { AppDataSource } from "../../data-source";

import { Phone } from "../../entities/phone";
import { User } from "../../entities/user";
import { AppError } from "../../errors/AppError";
import { UserSerializer } from "../../serializers/user.serializer";
import { generateToken } from "../../utils/generateToken";
import { IUserRequest } from "../../types/user";

export const createUserService = async ({
  nome,
  email,
  senha,
  telefones,
}: IUserRequest) => {
  const userRepo = AppDataSource.getRepository(User);
  const phoneRepo = AppDataSource.getRepository(Phone);

  const userAlreadyExists = await userRepo.findOneBy({ email });

  if (userAlreadyExists) {
    throw new AppError(409, "E-mail já existente");
  }

  const password = hashSync(senha, 10);

  const newUser = userRepo.create({
    email,
    password,
    name: nome,
    lastLogin: new Date(),
  });

  console.log(newUser);

  await userRepo.save(newUser);

  const user = await userRepo.findOneBy({ email });

  if (!user) {
    throw new AppError(501, "Erro ao tentar salvar o usuário");
  }

  telefones.map(async (phone) => {
    const newPhone = phoneRepo.create({
      ddd: phone.ddd,
      phoneNumber: phone.numero,
      user,
    });

    await phoneRepo.save(newPhone);
  });

  const token = generateToken({ userId: user.id });

  const response = new UserSerializer(user, token);

  return response;
};
