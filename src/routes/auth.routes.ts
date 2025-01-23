import { Router } from 'express';
import { validateUserInput } from '../middlewares/validators/user.validation';
import { register } from '../controllers/auth_controller/register.controller';

const userRouter = Router();

userRouter.post('/register', validateUserInput, register);

export default userRouter;
