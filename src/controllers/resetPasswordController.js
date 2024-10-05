/* eslint-disable no-undef */
import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import ResetPasswordToken from '../utils/resetPasswordToken.js';
import UserDAO from '../dao/UserDAO.js';
import ResetPasswordTokenDAO from '../dao/ResetPasswordTokenDAO.js';
import EmailService from '../service/emailService.js';
import DateTimeUtil from '../utils/dateTimeUtil.js';
import SecurityUtils from '../utils/securityUtils.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { join } from 'path';

const baseFilePath = getBaseFilePath();
const PAGE_RESET_PASSWORD = baseFilePath + 'reset-password.html';
const PAGE_ERROR = baseFilePath + 'error.html';
const PAGE_RESET_CANCEL = baseFilePath + 'reset-cancel.html';
const PAGE_EXPIRED_LINK = baseFilePath + 'expired-link.html';

const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_OK = 200;

/**
 * ResetPasswordController.
 *
 * Contains methods to reset the user's password.
 */
class ResetPasswordController {
  /**
   * Handles the forgot password request, generates a reset token,
   * and sends a reset password email.
   */
  static handleForgotPassword = async (req, res) => {
    try {
      logger.info('Executing ResetPasswordController.handleForgotPassword');

      // Validate email.
      const { email } = req.body;
      if (!email) {
        return res.status(HTTP_BAD_REQUEST).json({
          message: Messages.INCOMPLETE_DATA_PROVIDED,
          details: 'An email must be informed.',
        });
      }

      await ResetPasswordController.processForgotPasswordRequest(email, res);
    } catch (error) {
      logger.error('Error ResetPasswordController.handleForgotPassword', error);
      res.status(HTTP_INTERNAL_SERVER_ERROR).sendFile(PAGE_ERROR);
    }
  };

  static processForgotPasswordRequest = async (email, res) => {
    const userResult = await UserDAO.getByEmail(email);

    if (userResult.success) {
      const token = ResetPasswordToken.createResetToken(email);
      const resultSaveToken = await ResetPasswordTokenDAO.add(token, email);

      if (resultSaveToken.success) {
        await ResetPasswordController.sendPasswordResetEmail(email, token);

        return res.status(HTTP_OK).json({
          success: true,
          details: `Password reset token sent to ${email}.`,
        });
      } else {
        logger.error(Messages.ERROR_SAVING_RESET_TOKEN);
        return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: Messages.ERROR });
      }
    } else {
      res.status(HTTP_NOT_FOUND).json({ message: Messages.USER_NOT_FOUND });
    }
  };

  static sendPasswordResetEmail = async (email, token) => {
    const emailService = new EmailService();
    await emailService.sendPasswordResetEmail(email, token);
  };

  static handleCancelResetPasswordRequest = async (req, res) => {
    logger.info('Executing ResetPasswordController.handleCancelResetPasswordRequest');
    try {
      const { resetToken } = req.params;

      if (!resetToken) {
        const errorMessage =
          'Error executing ResetPasswordController.handleCancelResetPasswordRequest - ' +
          Messages.UNINFORMED_PASSWORD_RESET_TOKEN;
        logger.error(errorMessage);
        return res.status(HTTP_BAD_REQUEST).sendFile(PAGE_ERROR);
      }

      const resultDeleteToken = await ResetPasswordTokenDAO.delete(resetToken);

      if (resultDeleteToken.success) {
        // Success cancelling reset password request.
        logger.info(Messages.RESET_TOKEN_DELETED);
        return res.status(HTTP_OK).sendFile(PAGE_RESET_CANCEL);
      } else {
        // Reset token not found - show expired link page.
        logger.info(Messages.RESET_TOKEN_NOT_FOUND + ' - Showing expired link page');
        return res.status(HTTP_BAD_REQUEST).sendFile(PAGE_EXPIRED_LINK);
      }
    } catch (error) {
      logger.error('Error ResetPasswordController.handleCancelResetPasswordRequest', error);
      return res.status(HTTP_INTERNAL_SERVER_ERROR).sendFile(PAGE_ERROR);
    }
  };

  static handleResetPasswordRequest = async (req, res) => {
    logger.info('Executing ResetPasswordController.handleResetPasswordRequest');
    try {
      // Check received token.
      const { resetToken } = req.params;
      if (!resetToken) {
        logger.error(Messages.UNINFORMED_PASSWORD_RESET_TOKEN);
        return res.status(HTTP_BAD_REQUEST).sendFile(PAGE_ERROR);
      }

      // Search for the token in the database.
      const resultToken = await ResetPasswordTokenDAO.getByToken(resetToken);
      if (resultToken.success) {
        // Check the token expiration date.
        const dateCreateToken = resultToken.token.created_at;
        const isExpired = DateTimeUtil.isPassedOneHour(dateCreateToken);

        if (isExpired) {
          logger.info(Messages.RESET_TOKEN_EXPIRED);
          await ResetPasswordTokenDAO.delete(resetToken);
          return res.status(HTTP_BAD_REQUEST).sendFile(PAGE_EXPIRED_LINK);
        } 

        const fileContent = createContentResetPasswordPage(resultToken.token);
        return res.status(HTTP_OK).send(fileContent);
      } else {
        // Reset token not found - show expired link page.
        logger.info(Messages.RESET_TOKEN_NOT_FOUND + ' - Showing expired link page');
        return res.status(HTTP_BAD_REQUEST).sendFile(PAGE_EXPIRED_LINK);
      }
    } catch (error) {
      logger.error('Error ResetPasswordController.handleResetPasswordRequest', error);
      res.status(HTTP_INTERNAL_SERVER_ERROR).sendFile(PAGE_ERROR);
    }
  };

  static updateUserPassword = async (req, res) => {
    logger.info('Executing ResetPasswordController.updateUserPassword');
    try {
      const { token, email, password, userId } = req.body;

      let updatedUser;
      let result;

      if(password){
        updatedUser = {
          password: SecurityUtils.generateHashValue(password),
          updated_at: DateTimeUtil.getCurrentDateTime(),
        };
      }else{
        return res
          .status(HTTP_BAD_REQUEST)
          .json({
            message: Messages.ERROR,
            details: Messages.INCOMPLETE_DATA_PROVIDED,
          });
      }
      
      /////////////////////////
      // Forgot password flow.
      /////////////////////////
      if (token && email) {        
        const resultDeleteToken = await ResetPasswordTokenDAO.delete(token);
        
        if (resultDeleteToken.success) {
          logger.info(Messages.RESET_TOKEN_DELETED);
          result = await UserDAO.updateByEmail(email, updatedUser);

        } else {
          logger.error(Messages.ERROR_DELETE_RESET_TOKEN);
        }
      }      

      /////////////////////////
      // Inbound flow.
      /////////////////////////
      if(userId){
        result = await UserDAO.updateByUserCode(userId, updatedUser);
      }

      if (result.success) {
        return res
          .status(HTTP_OK)
          .json({ success: true, details: Messages.PASSWORD_UPDATED });
      } else {
        return res.status(HTTP_NOT_FOUND).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error ResetPasswordController.updateUserPassword', error);
      res.status(HTTP_INTERNAL_SERVER_ERROR).sendFile(PAGE_ERROR);
    }
  };
}

function getBaseFilePath() {
  const curentPath = fileURLToPath(import.meta.url);
  return join(curentPath, '../../', 'assets/');
}

function loadResetPasswordFileContent() {
  return fs.readFileSync(PAGE_RESET_PASSWORD).toString();
}

/**
 * Create content for the reset password page.
 * @param {string} token The reset token object recovered from the database.
 * @return {string} A string with the page's content.
 */
function createContentResetPasswordPage(token) {
  const baseURL = process.env.BASE_URL;
  const urlGlicocheckHomePage = process.env.URL_GLICOCHECK_HOME_PAGE;
  let fileContent = loadResetPasswordFileContent();
  fileContent = fileContent.replaceAll('#{urlGlicocheckHomePage}', urlGlicocheckHomePage);
  fileContent = fileContent.replace('#{email}', token.email_owner);
  fileContent = fileContent.replace('#{token}', token.token);
  fileContent = fileContent.replace(
    '<a href="#{url_cancel_reset_token}">',
    `<a href="${baseURL}/api/reset-password/cancel/${token.token}">`
  );
  return fileContent;
}

export default ResetPasswordController;
