import { Router } from 'express';
import { validateUserInput } from '../middlewares/validators/user.validation';
import { createUser } from '../controllers/user_controller/create.controller';

const userRouter = Router();

userRouter.post('/user', validateUserInput, createUser);

export default userRouter;
