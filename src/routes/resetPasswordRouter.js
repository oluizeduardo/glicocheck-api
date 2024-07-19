import express from 'express';
const resetPasswordRouter = express.Router();
import ResetPasswordController from '../controllers/resetPasswordController.js';

resetPasswordRouter.use(express.json());

resetPasswordRouter
  .post('/forgot-password', ResetPasswordController.handleForgotPassword)
  .get('/cancel/:resetToken', ResetPasswordController.handleCancelResetPasswordRequest)
  .get('/:resetToken', ResetPasswordController.handleResetPasswordRequest)
  .put('/', ResetPasswordController.updateUserPassword);

export default resetPasswordRouter;
