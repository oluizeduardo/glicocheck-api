/* eslint-disable no-undef */
import nodemailer from 'nodemailer';
import logger from '../loggerUtil/logger.js';
import ResetPasswordHTMLMessage from '../utils/resetPasswordHTMLMessage.js';

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

    const host = process.env.EMAIL_HOST;
    const port = process.env.EMAIL_PORT;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    const transporter = nodemailer.createTransport({
      host: host,
      port: port,
      auth: {user, pass},
      debug: true,
      logger: true
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
