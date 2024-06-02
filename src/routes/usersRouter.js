import express from 'express';
const usersRouter = express.Router();
import UserController from '../controllers/userController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';
import RoleMiddleware from '../routes/middleware/roleMiddleware.js';
import UserCodeMiddleware from '../routes/middleware/userCodeMiddleware.js';

usersRouter.use(AuthMiddleware.checkToken);
usersRouter.use(express.json());

usersRouter
  .get('/', RoleMiddleware.isAdminUser, UserController.getAllUsers)
  .post('/', UserController.addUser)
  .get('/:usercode', UserCodeMiddleware.validateUserCode, UserController.getUserByUserCode)
  .put('/:usercode', UserCodeMiddleware.validateUserCode, UserController.updateUserByUserCode)
  .delete('/:usercode', UserCodeMiddleware.validateUserCode, UserController.deleteUserByUserCode);

export default usersRouter;
