import express from 'express';
const diaryRouter = express.Router();
import DiaryController from '../controllers/diaryController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';
import UserCodeMiddleware from '../routes/middleware/userCodeMiddleware.js';

diaryRouter.use(AuthMiddleware.checkToken);
diaryRouter.use(express.json());

diaryRouter
  .post('/user/:usercode', UserCodeMiddleware.validateUserCode, DiaryController.addNew)
  .get('/user/:usercode', UserCodeMiddleware.validateUserCode, DiaryController.getByUserCode)
  .put('/user/:usercode/:id', UserCodeMiddleware.validateUserCode, DiaryController.updateById)
  .delete('/user/:usercode/:id', UserCodeMiddleware.validateUserCode, DiaryController.deleteById)
  .delete('/user/:usercode', UserCodeMiddleware.validateUserCode, DiaryController.deleteByUserCode);

export default diaryRouter;
