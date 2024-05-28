import express from 'express';
const diabetesTypeRouter = express.Router();
import DiabetesTypeController from '../controllers/diabetesTypeController.js';

diabetesTypeRouter.use(express.json());

diabetesTypeRouter
  .get('/', DiabetesTypeController.getAllTypes)
  .post('/', DiabetesTypeController.addType)
  .get('/:id', DiabetesTypeController.getTypeById)
  .put('/:id', DiabetesTypeController.updateTypeById)
  .delete('/:id', DiabetesTypeController.deleteTypeById);

export default diabetesTypeRouter;
