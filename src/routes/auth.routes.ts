import { Router } from 'express';
import { validateUserInput } from '../middlewares/validators/user.validation';
import { register } from '../controllers/auth_controller/register.controller';
import { login } from '../controllers/auth_controller/login.controller';

const userRouter = Router();

userRouter.post('/register', validateUserInput, register);
userRouter.post('/login', login);

export default userRouter;
