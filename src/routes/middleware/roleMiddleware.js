import UserDAO from '../../dao/UserDAO.js';
import logger from '../../loggerUtil/logger.js';
import Messages from '../../utils/messages.js';

const HTTP_UNAUTHORIZED = 403;
const HTTP_INTERNAL_SERVER_ERROR = 500;

const ADMIN_ROLE_ID = 1;
const REGULAR_ROLE_ID = 2;

export default class RoleMiddleware {
  /**
   * Middleware function to check if the user has admin role.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @return {void}
   */
  static isAdminUser = async (req, res, next) => {
    const userId = req.userId;

    try {
      const result = await UserDAO.getUserRoleId(userId);
      logger.info('result: '+result.user_role_id);

      if (result.user_role_id === ADMIN_ROLE_ID) {
        next();
      } else {
        logger.info(Messages.EXECUTION_NOT_ALLOWED);
        res.status(HTTP_UNAUTHORIZED).json({message: Messages.EXECUTION_NOT_ALLOWED});
      }
    } catch (err) {
      logger.error(`Error executing RoleMiddleware.isAdminUser: ${err.message}`);
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({
        message: Messages.ERROR_CHECKING_USER_ROLE,
      });
    }
  };

  /**
   * Middleware function to check if the user has regular role.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @return {void}
   */
  static isRegularUser = async (req, res, next) => {
    const userId = req.userId;

    try {
      const result = await UserDAO.getUserRoleId(userId);

      if (result.user_role_id === REGULAR_ROLE_ID) {
        next();
      } else {
        logger.info(Messages.EXECUTION_NOT_ALLOWED);
        res.status(HTTP_UNAUTHORIZED).json({message: Messages.EXECUTION_NOT_ALLOWED});
      }
    } catch (err) {
      logger.error(`Error executing RoleMiddleware.isAdminUser: ${err.message}`);
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({
        message: Messages.ERROR_CHECKING_USER_ROLE,
      });
    }
  };
}
