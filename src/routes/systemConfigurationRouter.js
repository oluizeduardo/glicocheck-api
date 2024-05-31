import express from 'express';
const systemConfigurationRouter = express.Router();
import SystemConfigurationController from '../controllers/systemConfigurationController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';

systemConfigurationRouter.use(AuthMiddleware.checkToken);
systemConfigurationRouter.use(express.json());

systemConfigurationRouter
  .get('/', SystemConfigurationController.getAll)
  .post('/', SystemConfigurationController.addNew)
  .get('/:id', SystemConfigurationController.getById)
  .delete('/:id', SystemConfigurationController.deleteById)
  .get('/user/:usercode', SystemConfigurationController.getByUserCode)
  .put('/user/:usercode', SystemConfigurationController.updateByUserCode)
  .delete('/user/:usercode', SystemConfigurationController.deleteByUserCode);

export default systemConfigurationRouter;
