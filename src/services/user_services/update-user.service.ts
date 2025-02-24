import { Prisma } from '@prisma/client';
import { updateUserRepository } from '../../repositories/user_repositories/update-user.repository';
import IUserType from '../../types/user.types';

export const updateUserService = async (
  identifier: Prisma.UserWhereUniqueInput,
  payload: IUserType
) => {
  if (!identifier) {
    throw new Error('User identifier is required.');
  }
  return await updateUserRepository(identifier, payload);
};
