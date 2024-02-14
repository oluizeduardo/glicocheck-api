import express from 'express';
const glucoseRouter = express.Router();
import GlucoseController from '../controllers/glucoseController.js';

glucoseRouter
  .get('/', express.json(), GlucoseController.getAllGlucoseRecords)
  .post('/', express.json(), GlucoseController.createNewGlucoseRecord)
  .get('/:id', GlucoseController.getGlucoseById)
  .put('/:id', express.json(), GlucoseController.updateGlucoseRecordById)
  .delete('/:id', GlucoseController.deleteGlucoseRecordById)
  .get('/user/online', GlucoseController.getGlucoseRecordsByUserId)
  .delete('/user/:userId', GlucoseController.deleteGlucoseRecordsByUserId)
  .get('/markermeal/:markermealid', GlucoseController.getGlucoseRecordsByMarkerMealId);

export default glucoseRouter;
