import express from 'express';
const usersRouter = express.Router();
import UserController from '../controllers/userController.js';

usersRouter.use(express.json());

usersRouter
  .post('/', UserController.addUser)
  .get('/', UserController.getAllUsers)
  .get('/:usercode', UserController.getUserByUserCode)
  .put('/:usercode', UserController.updateUserByUserCode)
  .delete('/:usercode', UserController.deleteUserByUserCode);

export default usersRouter;
