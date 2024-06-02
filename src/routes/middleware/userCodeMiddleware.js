/* eslint-disable no-undef */
import logger from '../../loggerUtil/logger.js';
import Messages from '../../utils/messages.js';

export default class UserCodeMiddleware {
  static validateUserCode = (req, res, next) => {
    const requestedUserCode = req.params.usercode;
    const authenticatedUserCode = req.usercode;

    if (!requestedUserCode && !authenticatedUserCode) {
      logger.info(Messages.USER_CODE_NOT_INFORMED);
      return res.status(400).json({ message: Messages.USER_CODE_NOT_INFORMED });
    }

    if (requestedUserCode !== authenticatedUserCode) {
      return res.status(403).json({ 
        message: Messages.REFUSED_ACCESS,
        reason: 'Incorrect user code.' 
      });
    }
    return next();
  };
}
