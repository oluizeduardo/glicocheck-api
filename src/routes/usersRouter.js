import express from 'express';
const usersRouter = express.Router();
import UserController from '../controllers/userController.js';
import SecurityUtils from '../utils/securityUtils.js';

usersRouter.use(express.json());
usersRouter.use(SecurityUtils.checkToken);

usersRouter
  .get('/', UserController.getAllUsers)
  .post('/', UserController.addUser)
  .get('/:usercode', UserController.getUserByUserCode)
  .put('/:usercode', UserController.updateUserByUserCode)
  .delete('/:usercode', UserController.deleteUserByUserCode);

export default usersRouter;
