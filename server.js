/* eslint-env node*/
import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import helmet from 'helmet';
import logger from './src/loggerUtil/logger.js';

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

// Disclosing the fingerprinting of this web technology.
app.disable('x-powered-by');

app.use(json({ limit: '2mb' }));

apiRouter.use('/users', usersRouter);
apiRouter.use('/genders', genderRouter);
apiRouter.use('/ping', systemHealthCheckRouter);
apiRouter.use('/diabetestype', diabetesTypeRouter);
apiRouter.use('/bloodtype', bloodTypeRouter);
apiRouter.use('/markermeal', markerMealRouter);
apiRouter.use('/authentication', authenticationRouter);
apiRouter.use('/carbscounting', carbsCountingRouter);
apiRouter.use('/healthinfo', healthInfoRouter);
apiRouter.use('/systemconfiguration', systemConfigRouter);
apiRouter.use('/reset-password', resetPasswordRouter);
apiRouter.use('/diary', diaryRouter);

app.use('/api', apiRouter);

const port = process.env.PORT || 3000;

// Inicialize the server.
app.listen(port, function () {
  logger.info(`Server running on ${port}.`);
});

export default app;
