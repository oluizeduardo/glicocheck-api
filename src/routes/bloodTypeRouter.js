import express from 'express';
const bloodTypeRouter = express.Router();
import BloodTypeController from '../controllers/bloodTypeController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';

bloodTypeRouter.use(AuthMiddleware.checkToken);
bloodTypeRouter.use(express.json());

bloodTypeRouter
  .get('/', BloodTypeController.getAllTypes)
  .post('/', BloodTypeController.addType)
  .get('/:id', BloodTypeController.getTypeById)
  .put('/:id', BloodTypeController.updateTypeById)
  .delete('/:id', BloodTypeController.deleteTypeById);

export default bloodTypeRouter;
