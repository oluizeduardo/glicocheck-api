import express from 'express';
const usersRouter = express.Router();
import UserController from '../controllers/userController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';

usersRouter.use(AuthMiddleware.checkToken);
usersRouter.use(express.json());

usersRouter
  .get('/', UserController.getAllUsers)
  .post('/', UserController.addUser)
  .get('/:usercode', UserController.getUserByUserCode)
  .put('/:usercode', UserController.updateUserByUserCode)
  .delete('/:usercode', UserController.deleteUserByUserCode);

export default usersRouter;
