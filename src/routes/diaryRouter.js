import express from 'express';
const diaryRouter = express.Router();
import DiaryController from '../controllers/diaryController.js';

diaryRouter.use(express.json());

diaryRouter
  .get('/', DiaryController.getAll)
  .post('/', DiaryController.addNew)
  .get('/:id', DiaryController.getById)
  .put('/:id', DiaryController.updateById)
  .delete('/:id', DiaryController.deleteById)
  .delete('/user/:usercode', DiaryController.deleteByUserCode)
  .get('/user/:usercode', DiaryController.getByUserCode);

export default diaryRouter;
