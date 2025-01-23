import express from 'express';
import 'dotenv/config';
import appMiddleware from './middlewares';

const app = express();
const port: number = process.env.PORT != null ? parseInt(process.env.PORT) : 3003;

app.listen(port, () => {
  console.log(`🍆 Welcome to Pennypal!`);
  console.log(`🍑 Listening on port ${port}`);
});

app.use(appMiddleware);
