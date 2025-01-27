import { Role } from '@prisma/client';

export default interface IUserType {
  id?: string;
  user_code: string;
  fullname: string;
  username: string;
  email: string;
  phone?: string | null;
  password: string;
  confirm_password?: string | null;
  avatar?: string | null;
  role?: Role;
  created_at?: Date;
  updated_at?: Date;
}
