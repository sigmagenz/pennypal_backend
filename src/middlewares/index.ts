import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import appRouter from '../routes';

const appMiddleware = express();

appMiddleware.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  })
);

appMiddleware.options('*', cors());
appMiddleware.use(express.json());
appMiddleware.use(express.urlencoded({ extended: true }));
appMiddleware.use(fileUpload());
appMiddleware.use(express.static('public'));
appMiddleware.use(appRouter);

export default appMiddleware;
