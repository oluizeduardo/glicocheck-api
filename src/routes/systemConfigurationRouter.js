import express from 'express';
const systemConfigurationRouter = express.Router();
import SystemConfigurationController from '../controllers/systemConfigurationController.js';

systemConfigurationRouter.use(express.json());

systemConfigurationRouter
  .post('/', SystemConfigurationController.addSystemConfiguration)
  .get('/', SystemConfigurationController.getAllSystemConfiguration)
  .get('/:id', SystemConfigurationController.getById)
  .delete('/:id', SystemConfigurationController.deleteById)
  .get('/user/:usercode', SystemConfigurationController.getByUserCode)
  .put('/user/:usercode', SystemConfigurationController.updateByUserCode)
  .delete('/user/:usercode', SystemConfigurationController.deleteByUserCode);

export default systemConfigurationRouter;
