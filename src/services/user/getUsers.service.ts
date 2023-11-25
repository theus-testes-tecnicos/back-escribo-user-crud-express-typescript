import { AppDataSource } from "../../data-source";

import { User } from "../../entities/user";
import { UserSerializer } from "../../serializers/user.serializer";

export const getUsersService = async (
  currentUrl: string,
  page: number,
  limit: number
) => {
  const userRepo = AppDataSource.getRepository(User);
  const count = await userRepo.count();

  page < 1 || ((page - 1) * limit > count && (page = 1));
  limit < 1 && (limit = 5);

  const skip = (page - 1) * limit;

  const users = await userRepo.find({
    skip,
    take: limit,
    order: { createdAt: "desc" },
  });

  const next =
    page * limit <= count
      ? `${currentUrl}?page=${page + 1}&limit=${limit}`
      : null;

  const prev =
    page <= 1 ? null : `${currentUrl}?page=${page - 1}&limit=${limit}`;

  const serializedUsers = users.map((user) => new UserSerializer(user));

  const response = {
    page,
    count,
    next,
    prev,
    limit,
    result: serializedUsers,
  };

  return response;
};
