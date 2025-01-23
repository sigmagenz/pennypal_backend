import { Router } from 'express';
import authRouter from './auth.routes';

const appRouter = Router();

appRouter.use('/api/auth', authRouter);
export default appRouter;
