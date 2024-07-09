import database from '../db/dbconfig.js';
import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';

const TABLE_NAME = 'jwt_token_reject_list';

export default class RejectListDAO {
  static async add(tokenId) {
    try {
      const addedTokenId = await database(TABLE_NAME).insert(tokenId);

      if (addedTokenId) {
        return {
          success: true,
          message: Messages.REJECT_LIST_TOKEN_ID_ADDED,
        };
      } else {
        return { success: false, message: Messages.ERROR };
      }
    } catch (error) {
      logger.error('Error RejectListDAO.add');
      throw new Error(Messages.ERROR);
    }
  }

  static async getById(id) {
    try {
      const result = await database(TABLE_NAME)
        .where('token_id', id)
        .select('*');

      if (result.length > 0) {
        return { success: true, data: result[0] };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error RejectListDAO.getById');
      throw new Error(Messages.ERROR);
    }
  }

  static async deleteRegistersOlderThan(hours) {
    try {
      const hoursAgo = new Date(new Date().getTime() - hours * 3600000);
      const formattedDate = this.formatDate(hoursAgo);

      await database(TABLE_NAME)
        .where('created_at', '<', formattedDate)
        .del();

      return { success: true };
    } catch (error) {
      logger.error('Error RejectListDAO.deleteRegistersOlderThan');
      return { success: false };
    }
  }

  /**
   * Formatting the date/time in the same format that is stored in the database.
   * @param {Date} hour The hour to be formatted.
   * @returns A string with the date in the same format that is stored in the database.
   */
  static async formatDate(hour) {
    return `${hour.getFullYear()}-
      ${(hour.getMonth() + 1).toString().padStart(2, '0')}-${hour
        .getDate()
        .toString()
        .padStart(2, '0')} ${hour.getHours().toString()
        .padStart(2, '0')}:${hour.getMinutes().toString()
        .padStart(2, '0')}:${hour.getSeconds().toString()
        .padStart(2, '0')}`;
  }
}
