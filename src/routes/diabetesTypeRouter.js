import express from 'express';
const diabetesTypeRouter = express.Router();
import DiabetesTypeController from '../controllers/diabetesTypeController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';
import RoleMiddleware from '../routes/middleware/roleMiddleware.js';
import RateLimiter from './middleware/apiRateLimiter.js';

diabetesTypeRouter.use(RateLimiter.getLimiter());
diabetesTypeRouter.use(AuthMiddleware.checkToken);
diabetesTypeRouter.use(express.json());

diabetesTypeRouter
  .get('/', DiabetesTypeController.getAllTypes)
  .post('/', RoleMiddleware.isAdminUser, DiabetesTypeController.addType)
  .get('/:id', DiabetesTypeController.getTypeById)
  .put('/:id', RoleMiddleware.isAdminUser, DiabetesTypeController.updateTypeById)
  .delete('/:id', RoleMiddleware.isAdminUser, DiabetesTypeController.deleteTypeById);

export default diabetesTypeRouter;
