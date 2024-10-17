import express from 'express';
const healthInfoRouter = express.Router();
import HealthInfoController from '../controllers/healthInfoController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';
import RoleMiddleware from '../routes/middleware/roleMiddleware.js';
import UserCodeMiddleware from '../routes/middleware/userCodeMiddleware.js';
import RateLimiter from './middleware/apiRateLimiter.js';

healthInfoRouter.use(RateLimiter.getLimiter());
healthInfoRouter.use(AuthMiddleware.checkToken);
healthInfoRouter.use(express.json());

healthInfoRouter
  .get('/', RoleMiddleware.isAdminUser, HealthInfoController.getAll)
  .post('/', HealthInfoController.addNew)
  .get('/user/:usercode', UserCodeMiddleware.validateUserCode, HealthInfoController.getByUserCode)
  .put('/user/:usercode', UserCodeMiddleware.validateUserCode, HealthInfoController.updateByUserCode)
  .delete('/user/:usercode', UserCodeMiddleware.validateUserCode, HealthInfoController.deleteByUserCode);

export default healthInfoRouter;
