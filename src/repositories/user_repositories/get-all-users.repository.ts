import { Prisma } from '@prisma/client';
import prisma from '../../config/prisma';
import IUserType from '../../types/user.types';

export const getAllUsersRepository = async (
  identifier?: Prisma.UserWhereInput
): Promise<IUserType[] | null> => {
  return await prisma.user.findMany({
    where: identifier
  });
};
