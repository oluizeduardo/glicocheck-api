import express from 'express';
const healthInfoRouter = express.Router();
import HealthInfoController from '../controllers/healthInfoController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';
import RoleMiddleware from '../routes/middleware/roleMiddleware.js';

healthInfoRouter.use(AuthMiddleware.checkToken);
healthInfoRouter.use(express.json());

healthInfoRouter
  .get('/', RoleMiddleware.isAdminUser, HealthInfoController.getAll)
  .post('/', HealthInfoController.addNew)
  .get('/user/:usercode', HealthInfoController.getByUserCode)
  .put('/user/:usercode', HealthInfoController.updateByUserCode)
  .delete('/user/:usercode', HealthInfoController.deleteByUserCode);

export default healthInfoRouter;
