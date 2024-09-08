/* eslint-env node*/
import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { readFile } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import logger from './src/loggerUtil/logger.js';
import executeInvalidTokenTableCleanupScheduler from './src/service/invalidTokenTableCleanupScheduler.js';

// Root router
const apiRouter = express.Router();
// Custom routers
import authenticationRouter from './src/routes/authenticationRouter.js';
import usersRouter from './src/routes/usersRouter.js';
import genderRouter from './src/routes/genderRouter.js';
import systemHealthCheckRouter from './src/routes/systemHealthCheckRouter.js';
import diabetesTypeRouter from './src/routes/diabetesTypeRouter.js';
import bloodTypeRouter from './src/routes/bloodTypeRouter.js';
import markerMealRouter from './src/routes/markerMealRouter.js';
import carbsCountingRouter from './src/routes/carbsCountingRouter.js';
import healthInfoRouter from './src/routes/healthInfoRouter.js';
import systemConfigRouter from './src/routes/systemConfigurationRouter.js';
import resetPasswordRouter from './src/routes/resetPasswordRouter.js';
import diaryRouter from './src/routes/diaryRouter.js';

const app = express();

// Applies security headers.
app.use(
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

app.use(cors(corsOptions));

// Disclosing the fingerprinting of this web technology.
app.disable('x-powered-by');

app.use(json({ limit: '2mb' }));

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

app.use('/api', apiRouter);

const port = process.env.PORT || 3000;

// Get the app version from package.json.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const data = await readFile(`${__dirname}/package.json`, 'utf-8');
const packageJson = JSON.parse(data);
const appVersion = packageJson.version;

// Inicialize the server.
app.listen(port, function () {
  logger.info(`Glicocheck API [v${appVersion}] running on port [${port}] with profile [${environment}].`);
});

executeInvalidTokenTableCleanupScheduler();

export default app;
