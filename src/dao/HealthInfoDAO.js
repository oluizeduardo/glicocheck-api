import database from '../db/dbconfig.js';
import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';

const TABLE_HEALTH_INFO = 'health_info';

export default class HealthInfoDAO {
  static async add(healthInfo) {
    try {
      await database(TABLE_HEALTH_INFO).insert(healthInfo, ['id']);
      return { success: true, message: Messages.HEALTH_INFO_CREATED };
    } catch (error) {
      logger.error('Error HealthInfoDAO.add', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getByUserId(userId) {
    try {
      const healthInfo = await database(TABLE_HEALTH_INFO)
        .where('id_user', userId)
        .select('*');

      if (healthInfo.length > 0) {
        return { success: true, healthInfo: healthInfo[0] };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error HealthInfoDAO.getByUserId', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getAll() {
    try {
      const healthInfo = await database(TABLE_HEALTH_INFO).select('*');
      if (healthInfo.length > 0) {
        return { success: true, healthInfo };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error HealthInfoDAO.getAll', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getById(id) {
    try {
      const types = await database(TABLE_HEALTH_INFO)
        .where('id', id)
        .select('*');

      if (types.length > 0) {
        return { success: true, type: types[0] };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error HealthInfoDAO.getById', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async updateByUserId(userId, healthInfo) {
    try {
      const numAffectedRegisters = await database(TABLE_HEALTH_INFO)
        .where('id_user', userId)
        .update(healthInfo);

      if (numAffectedRegisters === 0) {
        return { success: false, message: Messages.NOTHING_FOUND };
      } else {
        return { success: true, healthInfo };
      }
    } catch (error) {
      logger.error('Error HealthInfoDAO.updateByUserId', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async deleteById(id) {
    try {
      await database(TABLE_HEALTH_INFO).where('id', id).del();
      return { success: true, message: Messages.HEALTH_INFO_DELETED };
    } catch (error) {
      logger.error('Error HealthInfoDAO.deleteById', error);
      throw new Error(Messages.ERROR);
    }
  }
}
