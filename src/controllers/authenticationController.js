import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import SecurityUtils from '../utils/securityUtils.js';
import UserDAO from '../dao/UserDAO.js';
import jwt from 'jsonwebtoken';
/**
 * AuthenticationController.
 *
 * Contains methods to deal with authentication issues.
 */
export default class AuthenticationController {
  static TOKEN_EXPIRING_TIME = '30m';

  static doLogin = async (req, res) => {
    logger.info('Executing AuthenticationController.doLogin');
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
    }

    try {
      const result = await UserDAO.getByEmail(email);

      if (result.success) {
        const user = result.user;
        const isValidPassword = SecurityUtils.comparePassword(
          password,
          user.password
        );

        if (isValidPassword) {
          const tokenJWT = AuthenticationController.createTokenJWT(user);
          res.set('Authorization', tokenJWT);
          res.status(200).json({
            cod_user: user.cod_user,
            access_token: tokenJWT,
          });
        } else {
          res.status(401).json({ message: Messages.WRONG_CREDENTIALS });
        }
      } else {
        res.status(401).json({ message: Messages.WRONG_CREDENTIALS });
      }
    } catch (error) {
      logger.error('Error AuthenticationController.doLogin', error);
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  static validatePassword = async (req, res) => {
    logger.info('Executing AuthenticationController.validatePassword');
    const { cod_user, password } = req.body;

    if (!cod_user || !password) {
      return res
        .status(400)
        .json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
    }

    try {
      const result = await UserDAO.getPasswordByUserCode(cod_user);

      if (result.success) {
        const user = result.user;
        const isValidPassword = SecurityUtils.comparePassword(password, user.password);

        res.status(200).json({ is_valid: isValidPassword });
      } else {
        res.status(404).json({ message: Messages.NOTHING_FOUND });
      }
    } catch (error) {
      logger.error('Error AuthenticationController.validatePassword.', error);
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Create a new JWT token with user details embeded.
   * @param {*} user The user whose details will be embeded in the JWT token.
   * @return {string} A new JWT token.
   */
  static createTokenJWT(user) {
    return AuthenticationController.signToken(user.cod_user);
  }

  /**
   * Returns a signed token.
   * @param {number} id The user id to be embeded in the JWT token.
   * @return {string} JWT signed token.
   */
  static signToken(id) {
    const payload = {
      id: id,
    };
    const expires = {
      expiresIn: AuthenticationController.TOKEN_EXPIRING_TIME,
    };
    // eslint-disable-next-line no-undef
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, expires);
    return token;
  }
}
