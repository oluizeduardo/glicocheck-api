import express from 'express';
const usersRouter = express.Router();
import UserController from '../controllers/userController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';
import RoleMiddleware from '../routes/middleware/roleMiddleware.js';
import UserCodeMiddleware from '../routes/middleware/userCodeMiddleware.js';
import RateLimiter from './middleware/apiRateLimiter.js';

usersRouter.use(express.json());
usersRouter.use(RateLimiter.getLimiter());

usersRouter
  .get('/',
    AuthMiddleware.checkToken,
    RoleMiddleware.isAdminUser,
    UserController.getAllUsers
  )
  .post('/', UserController.addUser)
  .get('/:usercode',
    AuthMiddleware.checkToken,
    UserCodeMiddleware.validateUserCode,
    UserController.getUserByUserCode
  )
  .put('/:usercode',
    AuthMiddleware.checkToken,
    UserCodeMiddleware.validateUserCode,
    UserController.updateUserByUserCode
  )
  .delete('/:usercode',
    AuthMiddleware.checkToken,
    UserCodeMiddleware.validateUserCode,
    UserController.deleteUserAccountByUserCode
  );

export default usersRouter;
