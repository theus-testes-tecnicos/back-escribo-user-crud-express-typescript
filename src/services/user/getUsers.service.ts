import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user";

export const getUsersService = async (
  currentUrl: string,
  limit: number = 5,
  page: number = 1
) => {
  const userRepo = AppDataSource.getRepository(User);
  const count = await userRepo.count();

  (page - 1) * limit > count || (page < 1 && (page = 1));
  limit < 1 && (limit = 5);

  const skip = (page - 1) * limit;

  const users = userRepo.find({
    skip,
    take: limit,
    order: { createdAt: "desc" },
    relations: { phones: true, session: true },
  });

  const next =
    page * limit <= count
      ? `${currentUrl}?page=${page + 1}&limit=${limit}`
      : null;

  const prev =
    page <= 1 ? null : `${currentUrl}?page=${page - 1}&limit=${limit}`;

  const response = {
    page,
    count,
    next,
    prev,
    limit,
    result: users,
  };

  return response;
};
