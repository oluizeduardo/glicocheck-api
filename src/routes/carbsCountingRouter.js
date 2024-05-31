import express from 'express';
const carbsCountingRouter = express.Router();
import CarbsCountingController from '../controllers/carbsCountingController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';

carbsCountingRouter.use(AuthMiddleware.checkToken);

carbsCountingRouter.get('/:food', CarbsCountingController.calculatesTotalCarbohydrate);

export default carbsCountingRouter;
