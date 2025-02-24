import { Prisma } from '@prisma/client';
import prisma from '../../config/prisma';

export const deleteUserRepository = async (
  identifier: Prisma.UserWhereUniqueInput
): Promise<void> => {
  if (!identifier) {
    throw new Error('User identifier is required.');
  }

  await prisma.user.delete({ where: identifier });
};
