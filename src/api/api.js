/* eslint-env node*/
import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Custom routers
import authenticationRouter from '../routes/authenticationRouter.js';
import usersRouter from '../routes/usersRouter.js';
import genderRouter from '../routes/genderRouter.js';
import systemHealthCheckRouter from '../routes/systemHealthCheckRouter.js';
import diabetesTypeRouter from '../routes/diabetesTypeRouter.js';
import bloodTypeRouter from '../routes/bloodTypeRouter.js';
import markerMealRouter from '../routes/markerMealRouter.js';
import carbsCountingRouter from '../routes/carbsCountingRouter.js';
import healthInfoRouter from '../routes/healthInfoRouter.js';
import systemConfigRouter from '../routes/systemConfigurationRouter.js';
import resetPasswordRouter from '../routes/resetPasswordRouter.js';
import diaryRouter from '../routes/diaryRouter.js';

const server = express();

// Applies security headers.
server.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const environment = process.env.ENVIRONMENT || 'dev';
const corsOrigin =
  environment === 'dev'
    ? '*'
    : [
        'https://glicocheck-admin.vercel.app',
        'https://glicocheck.onrender.com',
      ];
const corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: corsOrigin,
};

server.use(cors(corsOptions));

// Disclosing the fingerprinting of this web technology.
server.disable('x-powered-by');

server.use(json({ limit: '2mb' }));

const apiRouter = express.Router();
apiRouter.use('/ping', systemHealthCheckRouter);
apiRouter.use('/genders', genderRouter);
apiRouter.use('/diabetestype', diabetesTypeRouter);
apiRouter.use('/bloodtype', bloodTypeRouter);
apiRouter.use('/markermeal', markerMealRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/healthinfo', healthInfoRouter);
apiRouter.use('/systemconfiguration', systemConfigRouter);
apiRouter.use('/diary', diaryRouter);
apiRouter.use('/authentication', authenticationRouter);
apiRouter.use('/carbscounting', carbsCountingRouter);
apiRouter.use('/reset-password', resetPasswordRouter);

server.use('/api', apiRouter);

export default server;