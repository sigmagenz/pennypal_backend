import { Router } from 'express';
import { validateUserInput } from '../middlewares/validators/user.validation';
import { createUser } from '../controllers/user_controller/create-user.controller';
import { authorizeRoles, verifyToken } from '../middlewares/authorization';
import { getAllUsers } from '../controllers/user_controller/get-all-users.controller';
import { getUser } from '../controllers/user_controller/get-user.controller';

const userRouter = Router();

userRouter.post(
  '/user',
  verifyToken,
  authorizeRoles(['ADMIN', 'SUPER_ADMIN']),
  validateUserInput,
  createUser
);
userRouter.get(
  '/user',
  verifyToken,
  authorizeRoles(['ADMIN', 'SUPER_ADMIN']),
  getAllUsers
);
userRouter.get(
  '/user/:id',
  verifyToken,
  authorizeRoles(['ADMIN', 'SUPER_ADMIN']),
  getUser
);
userRouter.delete(
  '/user/:id',
  verifyToken,
  authorizeRoles(['ADMIN', 'SUPER_ADMIN']),
  getUser
);
userRouter.patch(
  '/user/:id',
  verifyToken,
  authorizeRoles(['ADMIN', 'SUPER_ADMIN']),
  getUser
);

export default userRouter;
