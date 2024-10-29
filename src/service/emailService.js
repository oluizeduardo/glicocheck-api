/* eslint-disable no-undef */
import nodemailer from 'nodemailer';
import logger from '../loggerUtil/logger.js';
import ResetPasswordHTMLMessage from '../utils/resetPasswordHTMLMessage.js';
import env from '../envSchema.js';

/**
 * Email service.
 */
export default class EmailService {
  /**
   * This function sends a reset password message to the informed email address.
   * @param {string} destination The email address that will
   * receive the reset password message.
   * @param {string} resetToken The hexadecimal string representing
   * the reset password token.
   */
  async sendPasswordResetEmail(destination, resetToken) {
    const resource = 'EmailService.sendPasswordResetEmail';
    logger.info(`Executing ${resource}`);

    const host = env.EMAIL_HOST;
    const port = env.EMAIL_PORT;
    const user = env.EMAIL_USER;
    const pass = env.EMAIL_PASS;

    const transporter = nodemailer.createTransport({
      host: host,
      port: port,
      auth: {user, pass},
      debug: false,
      logger: false
    });

    transporter
        .sendMail({
          from: `"Glicocheck" <${user}>`,
          to: destination,
          subject: 'Reset password',
          html: ResetPasswordHTMLMessage.createHTMLMessage(resetToken),
        }).then(() => {
          logger.info(`${resource} - Email sent to the destination`);
        })
        .catch((error) => {
          logger.error(`${resource} - ${error}`);
        });
  }
}
