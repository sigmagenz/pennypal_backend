import { Router } from 'express';
import { validateUserInput } from '../middlewares/validators/user.validation';
import { createUser } from '../controllers/user_controller/create.controller';
import { verifyToken } from '../middlewares/authorization';
import { me } from '../controllers/user_controller/me.controller';

const userRouter = Router();

userRouter.get('/me', verifyToken, me);
userRouter.post('/user', validateUserInput, createUser);

export default userRouter;
