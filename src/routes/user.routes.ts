import { Router } from 'express';
import { validateUserInput } from '../middlewares/validators/user.validation';
import { createUser } from '../controllers/user_controller/create.controller';
import { authorizeRoles, verifyToken } from '../middlewares/authorization';
import { me } from '../controllers/user_controller/me.controller';
import { getAllUsers } from '../controllers/user_controller/get-all-users.controller';

const userRouter = Router();

userRouter.get('/me', verifyToken, me);
userRouter.post('/user', validateUserInput, createUser);
userRouter.get(
  '/users',
  verifyToken,
  authorizeRoles(['ADMIN', 'SUPER_ADMIN']),
  getAllUsers
);

export default userRouter;
