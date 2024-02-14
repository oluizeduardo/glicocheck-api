import express from 'express';
const resetPasswordRouter = express.Router();
import ResetPasswordController from '../controllers/resetPasswordController.js';

resetPasswordRouter.use(express.json());

resetPasswordRouter
  .post('/forgot-password', ResetPasswordController.handleForgotPassword)
  .get('/:resetToken', ResetPasswordController.handleResetPassword)
  .get('/cancel/:resetToken', ResetPasswordController.handleCancelResetRequest)
  .put('/password', ResetPasswordController.updateUserPassword);

  /*
    /forgot-password para solicitar um reset token.
    /reset-password para enviar o reset token e alterar a senha.
    /cancel-reset para cancelar um reset token.
  */

export default resetPasswordRouter;
