import { Router } from 'express';
const systemHealthCheckRouter = Router();
import SystemHealthCheckController from '../controllers/systemHealthCheckController.js';
import RateLimiter from './middleware/apiRateLimiter.js';

systemHealthCheckRouter.use(RateLimiter.getLimiter());
systemHealthCheckRouter.get('/', SystemHealthCheckController.ping);

export default systemHealthCheckRouter;
