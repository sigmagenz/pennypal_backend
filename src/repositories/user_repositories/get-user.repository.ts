import { Prisma } from '@prisma/client';
import IUserType from '../../types/user.types';
import prisma from '../../config/prisma';

export const getUserRepository = async (
  identifier: Prisma.UserWhereUniqueInput
): Promise<IUserType | null> => {
  if (!identifier) {
    throw new Error('User identifier is required.');
  }
  return await prisma.user.findUnique({
    where: identifier
  });
};
