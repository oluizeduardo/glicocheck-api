/* eslint no-undef: "error"*/
/* eslint-env node*/
import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import jwt from 'jsonwebtoken';
import pkg from 'bcryptjs';
const {verify} = jwt;
const {compareSync, hashSync} = pkg;

/**
 * SecurityUtils.
 */
export default class SecurityUtils {
  /**
   * Middleware function to check the validity of a
   * token and extract the user ID.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @return {void}
   */
  static checkToken = (req, res, next) => {
    const authToken = req.headers['authorization'];
    if (!authToken) {
      return res.status(401).json({message: Messages.TOKEN_REQUIRED});
    }

    const [, token] = authToken.split(' ');
    req.token = token;

    try {
      const decodeToken = verify(req.token, process.env.SECRET_KEY);
      req.userId = decodeToken.id;
      return next();
    } catch (err) {
      logger.error(`Error cheking JWT token - ${err.name}`);
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          message: Messages.TOKEN_EXPIRED,
          expiredIn: err.expiredAt,
        });
      }
      return res.status(401).json({message: Messages.REFUSED_ACCESS});
    }
  };

  /**
   * Compare two passwords in BCrypt format.
   * @param {string} password1 The first password.
   * @param {string} password2 The second password.
   * @return {boolean} true if are the same passwords. Return false otherwise.
   */
  static comparePassword = (password1, password2) => {
    return compareSync(password1, password2);
  };

  /**
   * Generates a hash value for the given string.
   * @param {string} s — String to hash.
   * @return {string} Resulting hash.
   */
  static generateHashValue = (s) => {
    return hashSync(s, 8);
  };
}
