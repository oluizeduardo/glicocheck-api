import { Router } from 'express';
const systemHealthCheckRouter = Router();
import SystemHealthCheckController from '../controllers/systemHealthCheckController.js';

systemHealthCheckRouter.get('/', SystemHealthCheckController.ping);

export default systemHealthCheckRouter;
