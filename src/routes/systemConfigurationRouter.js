import express from 'express';
const systemConfigurationRouter = express.Router();
import SystemConfigurationController from '../controllers/systemConfigurationController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';
import RoleMiddleware from '../routes/middleware/roleMiddleware.js';

systemConfigurationRouter.use(AuthMiddleware.checkToken);
systemConfigurationRouter.use(express.json());

systemConfigurationRouter
  .get('/', RoleMiddleware.isAdminUser, SystemConfigurationController.getAll)
  .post('/', RoleMiddleware.isAdminUser, SystemConfigurationController.addNew)
  .get('/:id', RoleMiddleware.isAdminUser, SystemConfigurationController.getById)
  .delete('/:id', RoleMiddleware.isAdminUser, SystemConfigurationController.deleteById)
  .get('/user/:usercode', SystemConfigurationController.getByUserCode)
  .put('/user/:usercode', SystemConfigurationController.updateByUserCode)
  .delete('/user/:usercode', SystemConfigurationController.deleteByUserCode);

export default systemConfigurationRouter;
