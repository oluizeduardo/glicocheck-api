import express from 'express';
const resetPasswordRouter = express.Router();
import ResetPasswordController from '../controllers/resetPasswordController.js';
import AuthMiddleware from '../routes/middleware/authMiddleware.js';

resetPasswordRouter.use(AuthMiddleware.checkToken);
resetPasswordRouter.use(express.json());

resetPasswordRouter
  .post('/forgot-password', ResetPasswordController.handleForgotPassword)
  .get('/cancel/:resetToken', ResetPasswordController.handleCancelResetPasswordRequest)
  .get('/:resetToken', ResetPasswordController.handleResetPasswordRequest)
  .put('/', ResetPasswordController.updateUserPassword);

export default resetPasswordRouter;
