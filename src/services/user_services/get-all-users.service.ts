import { getAllUsersRepository } from '../../repositories/user_repositories/get-all-users.repository';
import IUserType from '../../types/user.types';

export const getAllUsersService = async (): Promise<IUserType[] | null> => {
  const users = await getAllUsersRepository();

  return users;
};
