import { Prisma } from '@prisma/client';
import IUserType from '../../types/user.types';
import { getUserRepository } from '../../repositories/user_repositories/get-user.repository';

export const getUserService = async (
  identifier: Prisma.UserWhereUniqueInput
): Promise<IUserType | null> => {
  if (!identifier) {
    return null;
  }

  return await getUserRepository(identifier);
};
