import express from 'express';
const markerMealRouter = express.Router();
import MarkerMealController from '../controllers/markerMealController.js';

markerMealRouter.use(express.json());

markerMealRouter
  .post('/', MarkerMealController.createNewMarkerMeal)
  .get('/', MarkerMealController.getAllMarkerMeals)
  .get('/:id', MarkerMealController.getMarkerMealById)
  .put('/:id', MarkerMealController.updateMarkerMealById)
  .delete('/:id', MarkerMealController.deleteMarkerMealById);

export default markerMealRouter;
