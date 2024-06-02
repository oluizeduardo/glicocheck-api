import express from 'express';
const diaryRouter = express.Router();
import DiaryController from '../controllers/diaryController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';
import RoleMiddleware from '../routes/middleware/roleMiddleware.js';
import UserCodeMiddleware from '../routes/middleware/userCodeMiddleware.js';

diaryRouter.use(AuthMiddleware.checkToken);
diaryRouter.use(express.json());

diaryRouter
  .get('/', RoleMiddleware.isAdminUser, DiaryController.getAll)
  .post('/:usercode', UserCodeMiddleware.validateUserCode, DiaryController.addNew)
  .get('/:id', DiaryController.getById)
  .put('/:id', DiaryController.updateById)
  .delete('/:id', DiaryController.deleteById)
  .delete('/user/:usercode', UserCodeMiddleware.validateUserCode, DiaryController.deleteByUserCode)
  .get('/user/:usercode', UserCodeMiddleware.validateUserCode, DiaryController.getByUserCode);

export default diaryRouter;
