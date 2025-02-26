import prisma from '../../config/prisma';
import IUserType from '../../types/user.types';

export const getAllUsersRepository = async (): Promise<IUserType[] | null> => {
  return await prisma.user.findMany();
};
