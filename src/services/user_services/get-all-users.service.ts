import { Prisma } from '@prisma/client';
import { getAllUsersRepository } from '../../repositories/user_repositories/get-all-users.repository';
import IUserType from '../../types/user.types';

export const getAllUsersService = async (
  identifier?: Prisma.UserWhereInput
): Promise<IUserType[] | null> => {
  const users = await getAllUsersRepository(identifier);

  return users;
};
