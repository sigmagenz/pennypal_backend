import { Router } from 'express';

const appRouter = Router();

appRouter.use('/', (req, res) => {
  console.log('init');
});

export default appRouter;
