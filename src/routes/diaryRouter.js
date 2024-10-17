import express from 'express';
const diaryRouter = express.Router();
import DiaryController from '../controllers/diaryController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';
import UserCodeMiddleware from '../routes/middleware/userCodeMiddleware.js';
import RateLimiter from './middleware/apiRateLimiter.js';

diaryRouter.use(RateLimiter.getLimiter());
diaryRouter.use(AuthMiddleware.checkToken);
diaryRouter.use(express.json());

diaryRouter
  .post('/users/:usercode',
    UserCodeMiddleware.validateUserCode,
    DiaryController.addNew
  )
  .get('/users/:usercode',
    UserCodeMiddleware.validateUserCode,
    DiaryController.getByUserCode
  )
  .get('/users/:usercode/stats',
    UserCodeMiddleware.validateUserCode,
    DiaryController.getGlycemiaStatsByUserCode
  )
  .put('/users/:usercode/:id',
    UserCodeMiddleware.validateUserCode,
    DiaryController.updateById
  )
  .delete('/users/:usercode/:id',
    UserCodeMiddleware.validateUserCode,
    DiaryController.deleteById
  )
  .delete('/users/:usercode',
    UserCodeMiddleware.validateUserCode,
    DiaryController.deleteByUserCode
  );

export default diaryRouter;
