import express from 'express';
const genderRouter = express.Router();
import GenderController from '../controllers/genderController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';

genderRouter.use(AuthMiddleware.checkToken);
genderRouter.use(express.json());

genderRouter
  .get('/', GenderController.getAllGenders)
  .post('/', GenderController.addGender)
  .get('/:id', GenderController.getGenderById)
  .put('/:id', GenderController.updateGenderById)
  .delete('/:id', GenderController.deleteGenderById);

export default genderRouter;
