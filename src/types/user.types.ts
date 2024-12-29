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
  role?: 'USER_ACCOUNT' | 'ADMIN' | 'SUPERADMIN';
  created_at: Date;
  updated_at: Date;
}
