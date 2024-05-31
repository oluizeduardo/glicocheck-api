import express from 'express';
const carbsCountingRouter = express.Router();
import CarbsCountingController from '../controllers/carbsCountingController.js';
import SecurityUtils from '../utils/securityUtils.js';

carbsCountingRouter.use(SecurityUtils.checkToken);

carbsCountingRouter.get('/:food', CarbsCountingController.calculatesTotalCarbohydrate);

export default carbsCountingRouter;
