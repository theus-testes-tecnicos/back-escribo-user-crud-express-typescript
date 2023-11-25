import { hashSync } from "bcrypt";
import { AppDataSource } from "../../data-source";
import { Phone } from "../../entities/phone";
import { User } from "../../entities/user";
import { AppError } from "../../errors/AppError";
import { UserSerializer } from "../../serializers/user.serializer";
import { IUserRequest } from "../../types/user";
import { generateToken } from "../../utils/generateToken";

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
    throw new AppError(409, "user already exists");
  }

  const password = hashSync(senha, 10);

  const newUser = userRepo.create({
    email,
    password,
    name: nome,
    lastLogin: Date.now(),
  });

  await userRepo.save(newUser);

  const user = await userRepo.findOneBy({ email });

  if (!user) {
    throw new AppError(501, "error when trying to save user");
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
