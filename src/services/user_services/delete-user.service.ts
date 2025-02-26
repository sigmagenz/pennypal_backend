import { Prisma } from '@prisma/client';
import { deleteUserRepository } from '../../repositories/user_repositories/delete-user.repository';

export const deleteUserService = async (
  identifier: Prisma.UserWhereUniqueInput
) => {
  if (!identifier) {
    throw new Error('User identifier is required.');
  }

  return await deleteUserRepository(identifier);
};
