import express from 'express';
const bloodTypeRouter = express.Router();
import BloodTypeController from '../controllers/bloodTypeController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';
import RoleMiddleware from '../routes/middleware/roleMiddleware.js';

bloodTypeRouter.use(AuthMiddleware.checkToken);
bloodTypeRouter.use(express.json());

bloodTypeRouter
  .get('/', BloodTypeController.getAllTypes)
  .post('/', RoleMiddleware.isAdminUser, BloodTypeController.addType)
  .get('/:id', BloodTypeController.getTypeById)
  .put('/:id', RoleMiddleware.isAdminUser, BloodTypeController.updateTypeById)
  .delete('/:id', RoleMiddleware.isAdminUser, BloodTypeController.deleteTypeById);

export default bloodTypeRouter;
