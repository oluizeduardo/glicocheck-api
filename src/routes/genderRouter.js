import express from 'express';
const genderRouter = express.Router();
import GenderController from '../controllers/genderController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';
import RoleMiddleware from '../routes/middleware/roleMiddleware.js';

genderRouter.use(AuthMiddleware.checkToken);
genderRouter.use(express.json());

genderRouter
  .get('/', GenderController.getAllGenders)
  .post('/', RoleMiddleware.isAdminUser, GenderController.addGender)
  .get('/:id', GenderController.getGenderById)
  .put('/:id', RoleMiddleware.isAdminUser, GenderController.updateGenderById)
  .delete('/:id', RoleMiddleware.isAdminUser, GenderController.deleteGenderById);

export default genderRouter;
