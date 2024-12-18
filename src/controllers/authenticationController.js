import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import SecurityUtils from '../utils/securityUtils.js';
import UserDAO from '../dao/UserDAO.js';
import jwt from 'jsonwebtoken';
import CryptoUtil from '../utils/cryptoUtil.js';
import RejectListDAO from '../dao/RejectListDAO.js';
import env from '../envSchema.js';
const { verify } = jwt;
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
        const isValidPassword = SecurityUtils.comparePassword(password,user.password);

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
        res.status(404).json({ message: Messages.USER_NOT_FOUND });
      }
    } catch (error) {
      logger.error('Error AuthenticationController.doLogin', error);
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  static doLogOut = async (req, res) => {
    logger.info('Executing AuthenticationController.doLogOut');
    const { access_token } = req.body;

    if(!access_token){
      logger.info(Messages.TOKEN_REQUIRED);
      res.status(400).send({ message: Messages.TOKEN_REQUIRED });
      return;
    }

    try {
      const decodedToken = verify(access_token, env.SECRET_KEY);
      const token_id = decodedToken.jti;
      const result = await RejectListDAO.add(token_id);

      if (result.success) {
        logger.info(Messages.LOGOUT_SUCCESSFUL);
        res.status(200).send({ message: Messages.LOGOUT_SUCCESSFUL });
      } else {
        logger.error('Error during Logout - The system could not save the token identifier.');
        res.status(500).send({ message: result.message });
      }
    } catch (err) {
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
   * @param {number} userCode The user code to be embeded in the JWT token.
   * @return {string} JWT signed token.
   */
  static signToken(userCode) {
    const payload = {
      id: userCode,
      jti: CryptoUtil.createRandomUUID(),
    };
    const expires = {
      expiresIn: AuthenticationController.TOKEN_EXPIRING_TIME,
    };
    // eslint-disable-next-line no-undef
    const secretKey = env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, expires);
    return token;
  }
}
