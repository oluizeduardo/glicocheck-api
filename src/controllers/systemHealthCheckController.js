import Messages from '../utils/messages.js';
/**
 * SystemHealthCheckController.
 */
export default class SystemHealthCheckController {
  /**
   * This functions responds a status to inform the client
   * that the system is up and running perfectly.
   * @param {*} _
   * @param {Response} res
   */
  static ping = async (_, res) => {
    res.status(200).json({message: Messages.PONG});
  };
}
