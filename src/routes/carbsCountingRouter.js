import express from 'express';
const carbsCountingRouter = express.Router();
import CarbsCountingController from '../controllers/carbsCountingController.js';

carbsCountingRouter.get('/:food', CarbsCountingController.calculatesTotalCarbohydrate);

export default carbsCountingRouter;
