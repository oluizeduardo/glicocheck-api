import express from 'express';
const genderRouter = express.Router();
import GenderController from '../controllers/genderController.js';

genderRouter.use(express.json());

genderRouter
  .get('/', GenderController.getAllGenders)
  .post('/', GenderController.addGender)
  .get('/:id', GenderController.getGenderById)
  .put('/:id', GenderController.updateGenderById)
  .delete('/:id', GenderController.deleteGenderById);

export default genderRouter;
