import { Router } from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';

const appRouter = Router();

appRouter.use('/api/auth', authRouter);
appRouter.use('/api', userRouter);
export default appRouter;
