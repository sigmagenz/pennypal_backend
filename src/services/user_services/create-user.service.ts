import bcrypt from 'bcryptjs';
import IUserType from '../../types/user.types';
import { createUserRepository } from '../../repositories/user_repositories/create-user.repository';

export const createUserService = async (
  payload: Omit<IUserType, 'user_code'>
) => {
  const userCode = `USR_${new Date().getTime()}`;
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await createUserRepository({
    ...payload,

    user_code: userCode,
    password: hashedPassword,
    phone: payload.phone || null,
    avatar: payload.avatar || null
  });

  return newUser;
};
