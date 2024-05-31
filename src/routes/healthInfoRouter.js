import express from 'express';
const healthInfoRouter = express.Router();
import HealthInfoController from '../controllers/healthInfoController.js';
import SecurityUtils from '../utils/securityUtils.js';

healthInfoRouter.use(SecurityUtils.checkToken);
healthInfoRouter.use(express.json());

healthInfoRouter
  .get('/', HealthInfoController.getAll)
  .post('/', HealthInfoController.addNew)
  .get('/user/:usercode', HealthInfoController.getByUserCode)
  .put('/user/:usercode', HealthInfoController.updateByUserCode)
  .delete('/user/:usercode', HealthInfoController.deleteByUserCode);

export default healthInfoRouter;
