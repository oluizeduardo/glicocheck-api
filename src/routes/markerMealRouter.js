import express from 'express';
const markerMealRouter = express.Router();
import MarkerMealController from '../controllers/markerMealController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';
import RoleMiddleware from '../routes/middleware/roleMiddleware.js';

markerMealRouter.use(AuthMiddleware.checkToken);
markerMealRouter.use(express.json());

markerMealRouter
  .get('/', MarkerMealController.getAllMarkerMeals)
  .post('/', RoleMiddleware.isAdminUser, MarkerMealController.addMarkerMeal)
  .get('/:id', MarkerMealController.getMarkerMealById)
  .put('/:id', RoleMiddleware.isAdminUser, MarkerMealController.updateMarkerMealById)
  .delete('/:id', RoleMiddleware.isAdminUser, MarkerMealController.deleteMarkerMealById);

export default markerMealRouter;
