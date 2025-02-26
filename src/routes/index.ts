import { Router } from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import meRouter from './me.routes';

const appRouter = Router();

appRouter.use('/api/auth', authRouter);
appRouter.use('/api', userRouter);
appRouter.use('/aoi', meRouter);

export default appRouter;
