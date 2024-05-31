import express from 'express';
const bloodTypeRouter = express.Router();
import BloodTypeController from '../controllers/bloodTypeController.js';
import SecurityUtils from '../utils/securityUtils.js';

bloodTypeRouter.use(SecurityUtils.checkToken);
bloodTypeRouter.use(express.json());

bloodTypeRouter
  .get('/', BloodTypeController.getAllTypes)
  .post('/', BloodTypeController.addType)
  .get('/:id', BloodTypeController.getTypeById)
  .put('/:id', BloodTypeController.updateTypeById)
  .delete('/:id', BloodTypeController.deleteTypeById);

export default bloodTypeRouter;
