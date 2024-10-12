import express from 'express';
const authenticationRouter = express.Router();
import AuthenticationController from '../controllers/authenticationController.js';
// import AuthMiddleware from './middleware/authMiddleware.js';

authenticationRouter.use(express.json());

authenticationRouter
  .post('/login', AuthenticationController.doLogin)
  .post('/logout', AuthenticationController.doLogOut)
  .post('/validate-password', AuthenticationController.validatePassword);

export default authenticationRouter;
