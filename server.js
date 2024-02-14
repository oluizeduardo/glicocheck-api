/* eslint-env node*/
import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import helmet from 'helmet';
import logger from './src/loggerUtil/logger.js';
// Routers
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
// import resetPasswordRouter from './src/routes/resetPasswordRouter.js';
// import glucoseRouter from './src/routes/glucoseRouter.js';

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

app.use('/api/users', usersRouter);
app.use('/api/genders', genderRouter);
app.use('/api/ping', systemHealthCheckRouter);
app.use('/api/diabetestype', diabetesTypeRouter);
app.use('/api/bloodtype', bloodTypeRouter);
app.use('/api/markermeal', markerMealRouter);
app.use('/api/authentication', authenticationRouter);
app.use('/api/carbscounting', carbsCountingRouter);
app.use('/api/healthinfo', healthInfoRouter);
app.use('/api/systemconfiguration', systemConfigRouter);
// app.use('/api/reset', resetPasswordRouter);
// app.use('/api/glucose', glucoseRouter);

const port = process.env.PORT || 3000;

// Inicialize the server.
app.listen(port, function () {
  logger.info(`Server running on ${port}.`);
});

export default app;
