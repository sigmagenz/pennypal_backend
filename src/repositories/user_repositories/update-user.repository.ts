import { Prisma } from '@prisma/client';
import prisma from '../../config/prisma';
import IUserType from '../../types/user.types';

export const updateUserRepository = async (
  identifier: Prisma.UserWhereUniqueInput,
  payload: IUserType
) => {
  if (!identifier) {
    throw new Error('User identifier is required.');
  }
  return await prisma.user.update({
    where: identifier,
    data: payload
  });
};
