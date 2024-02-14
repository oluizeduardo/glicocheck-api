import express from 'express';
const healthInfoRouter = express.Router();
import HealthInfoController from '../controllers/healthInfoController.js';

healthInfoRouter.use(express.json());

healthInfoRouter
  .post('/', HealthInfoController.addNew)
  .get('/', HealthInfoController.getAll)
  .get('/user/:usercode', HealthInfoController.getByUserCode)
  .put('/user/:usercode', HealthInfoController.updateByUserCode)
  .delete('/user/:usercode', HealthInfoController.deleteByUserCode);

export default healthInfoRouter;
