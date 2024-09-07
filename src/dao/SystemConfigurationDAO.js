import database from '../db/dbconfig.js';
import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';

const TABLE_SYSTEM_CONFIGURATION = 'system_config_by_user';

export default class SystemConfigurationDAO {
  static async add(configuration) {
    try {
      await database(TABLE_SYSTEM_CONFIGURATION).insert(configuration, ['id']);
      return { success: true, message: Messages.NEW_CONFIGURATION_CREATED };
    } catch (error) {
      logger.error('SystemConfigurationDAO.add', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getByUserId(userId) {
    try {
      const systemConfiguration = await database(TABLE_SYSTEM_CONFIGURATION)
        .where('id_user', userId)
        .select('*');

      if (systemConfiguration.length > 0) {
        return { success: true, systemConfiguration: systemConfiguration[0] };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('SystemConfigurationDAO.getByUserId', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getAll() {
    try {
      const systemConfiguration = await database(TABLE_SYSTEM_CONFIGURATION).select('*').orderBy('id');
      if (systemConfiguration.length > 0) {
        return { success: true, systemConfiguration };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('SystemConfigurationDAO.getAll', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getById(id) {
    try {
      const result = await database(TABLE_SYSTEM_CONFIGURATION)
        .where('id', id)
        .select('*');

      if (result.length > 0) {
        return { success: true, systemConfiguration: result[0] };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('SystemConfigurationDAO.getById', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async updateByUserId(userId, systemConfig) {
    try {
      const numAffectedRegisters = await database(TABLE_SYSTEM_CONFIGURATION)
        .where('id_user', userId)
        .update(systemConfig);

      if (numAffectedRegisters === 0) {
        return { success: false, message: Messages.NOTHING_FOUND };
      } else {
        return { success: true, systemConfig };
      }
    } catch (error) {
      logger.error('SystemConfigurationDAO.updateByUserId', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async deleteById(id) {
    try {
      await database(TABLE_SYSTEM_CONFIGURATION).where('id', id).del();
      return { success: true, message: Messages.SYSTEM_CONFIGURATION_DELETED };
    } catch (error) {
      logger.error('SystemConfigurationDAO.deleteById', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async deleteByUserId(userId) {
    try {
      await database(TABLE_SYSTEM_CONFIGURATION).where('id_user', userId).del();
      return { success: true, message: Messages.SYSTEM_CONFIGURATION_DELETED };
    } catch (error) {
      logger.error('SystemConfigurationDAO.deleteByUserId', error);
      throw new Error(Messages.ERROR);
    }
  }
}
