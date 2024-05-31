import express from 'express';
const markerMealRouter = express.Router();
import MarkerMealController from '../controllers/markerMealController.js';
import SecurityUtils from '../utils/securityUtils.js';

markerMealRouter.use(SecurityUtils.checkToken);
markerMealRouter.use(express.json());

markerMealRouter
  .get('/', MarkerMealController.getAllMarkerMeals)
  .post('/', MarkerMealController.addMarkerMeal)
  .get('/:id', MarkerMealController.getMarkerMealById)
  .put('/:id', MarkerMealController.updateMarkerMealById)
  .delete('/:id', MarkerMealController.deleteMarkerMealById);

export default markerMealRouter;
