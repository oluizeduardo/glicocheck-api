import express from 'express';
const bloodTypeRouter = express.Router();
import BloodTypeController from '../controllers/bloodTypeController.js';

bloodTypeRouter.use(express.json());

bloodTypeRouter
  .get('/', BloodTypeController.getAllTypes)
  .post('/', BloodTypeController.createNewType)
  .get('/:id', BloodTypeController.getTypeById)
  .put('/:id', BloodTypeController.updateTypeById)
  .delete('/:id', BloodTypeController.deleteTypeById);

export default bloodTypeRouter;
