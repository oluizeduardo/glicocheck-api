import database from '../db/dbconfig.js';
import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';

const TABLE_NAME = 'diabetes_types';

export default class DiabetesTypeDAO {
  static async add(newType) {
    try {
      const createdType = await database(TABLE_NAME)
      .insert(newType, ['id', 'description']);

      if (createdType) {
        return {
          success: true,          
          message: Messages.NEW_DIABETES_TYPE_CREATED,
          diabetes_type: createdType[0],
        };
      } else {
        return { success: false, message: Messages.ERROR };
      }
    } catch (error) {
      logger.error(`Error DiabetesTypeDAO.add - Details: ${error}`);
      throw new Error(Messages.ERROR);
    }
  }
  
  static async getAll() {
    try {
      const types = await database(TABLE_NAME).select('*').orderBy('id');

      if (types.length > 0) {
        return { success: true, types };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error(`Error DiabetesTypeDAO.getAll - Details: ${error}`);
      throw new Error(Messages.ERROR);
    }
  }  

  static async getById(id) {
    try {
      const types = await database(TABLE_NAME)
        .where('id', id)
        .select('*');

      if (types.length > 0) {
        return { success: true, type: types[0] };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error(`Error DiabetesTypeDAO.getById - Details: ${error}`);
      throw new Error(Messages.ERROR);
    }
  }

  static async updateById(id, type) {
    try {
      const numAffectedRegisters = await database(TABLE_NAME)
        .where('id', id)
        .update(type);

      if (numAffectedRegisters === 0) {
        return { success: false, message: Messages.NOTHING_FOUND };
      } else {
        return { success: true, type };
      }
    } catch (error) {
      logger.error(`Error DiabetesTypeDAO.updateById - Details: ${error}`);
      throw new Error(Messages.ERROR);
    }
  }

  static async deleteById(id) {
    try {
      const types = await database(TABLE_NAME)
        .where('id', id)
        .select('id');

      if (types.length > 0) {
        const type = types[0];
        await database(TABLE_NAME).where('id', type.id).del();
        return { success: true, message: Messages.DIABETES_TYPE_DELETED };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error(`Error DiabetesTypeDAO.deleteById - Details: ${error}`);
      throw new Error(Messages.ERROR);
    }
  }
}
