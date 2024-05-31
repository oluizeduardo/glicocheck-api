import express from 'express';
const systemConfigurationRouter = express.Router();
import SystemConfigurationController from '../controllers/systemConfigurationController.js';
import SecurityUtils from '../utils/securityUtils.js';

systemConfigurationRouter.use(SecurityUtils.checkToken);
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
