import express from 'express';
const diaryRouter = express.Router();
import DiaryController from '../controllers/diaryController.js';

diaryRouter.use(express.json());

diaryRouter
  .post('/', DiaryController.addDiaryRecord)
  .get('/', DiaryController.getAllDiaryRecords)
  .get('/:id', DiaryController.getDiaryRecordById)
  .put('/:id', DiaryController.updateDiaryRecordById)
  .delete('/:id', DiaryController.deleteDiaryRecordById)
  .delete('/user/:usercode', DiaryController.deleteDiaryRecordsByUserCode)
  .get('/user/:usercode', DiaryController.getDiaryRecordsByUserCode);

export default diaryRouter;
