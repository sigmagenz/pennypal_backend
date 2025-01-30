import { User } from '@prisma/client';
import IUserType from '../../types/user.types';
import prisma from '../../config/prisma';

export const createUserRepository = async (
  payload: IUserType
): Promise<User> => {
  return await prisma.user.create({
    data: {
      ...payload
    }
  });
};
