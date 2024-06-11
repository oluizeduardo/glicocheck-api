/* eslint-disable no-undef */
import RejectListDAO from '../../dao/RejectListDAO.js';
import logger from '../../loggerUtil/logger.js';
import Messages from '../../utils/messages.js';
import jwt from 'jsonwebtoken';
const { verify } = jwt;

export default class AuthMiddleware {
  /**
   * Middleware function to check the validity of a
   * token and extract the user ID.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @return {void}
   */
  static checkToken = async (req, res, next) => {
    const authToken = req.headers['authorization'];
    if (!authToken) {
      return res.status(401).json({ message: Messages.TOKEN_REQUIRED });
    }

    const [, token] = authToken.split(' ');
    req.token = token;

    try {
      const decodedToken = verify(req.token, process.env.SECRET_KEY);
      const result = await RejectListDAO.getById(decodedToken.jti);

      if (result.success) {
        return res.status(401).send({ message: Messages.REJECT_LIST_INVALID_TOKEN });
      }

      req.usercode = decodedToken.id;
      return next();
    } catch (err) {
      logger.error(`Error cheking JWT token - ${err.name}`);
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          message: Messages.TOKEN_EXPIRED,
          expiredIn: err.expiredAt,
        });
      }
      return res.status(401).json({ message: Messages.REFUSED_ACCESS });
    }
  };
}
