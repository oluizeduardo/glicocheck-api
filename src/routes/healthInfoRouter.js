import express from 'express';
const healthInfoRouter = express.Router();
import HealthInfoController from '../controllers/healthInfoController.js';

healthInfoRouter.use(express.json());

healthInfoRouter
  .get('/', HealthInfoController.getAll)
  .post('/', HealthInfoController.addNew)
  .get('/user/:usercode', HealthInfoController.getByUserCode)
  .put('/user/:usercode', HealthInfoController.updateByUserCode)
  .delete('/user/:usercode', HealthInfoController.deleteByUserCode);

export default healthInfoRouter;
