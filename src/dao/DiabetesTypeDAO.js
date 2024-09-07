import database from '../db/dbconfig.js';
import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';

const TABLE_DIABETES_TYPES = 'diabetes_types';

export default class DiabetesTypeDAO {
  static async getAll() {
    try {
      const types = await database(TABLE_DIABETES_TYPES).select('*').orderBy('id');

      if (types.length > 0) {
        return { success: true, types };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error DiabetesTypeDAO.getAll');
      throw new Error(Messages.ERROR);
    }
  }

  static async add(newType) {
    try {
      const createdType = await database(TABLE_DIABETES_TYPES).insert(newType, [
        'description',
      ]);

      if (createdType) {
        return {
          success: true,
          description: createdType[0].description,
          message: Messages.NEW_DIABETES_TYPE_CREATED,
        };
      } else {
        return { success: false, message: Messages.ERROR };
      }
    } catch (error) {
      logger.error('Error DiabetesTypeDAO.add');
      throw new Error(Messages.ERROR);
    }
  }

  static async getById(id) {
    try {
      const types = await database(TABLE_DIABETES_TYPES)
        .where('id', id)
        .select('id', 'description', 'created_at', 'updated_at');

      if (types.length > 0) {
        return { success: true, type: types[0] };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error DiabetesTypeDAO.getById');
      throw new Error(Messages.ERROR);
    }
  }

  static async updateById(id, type) {
    try {
      const numAffectedRegisters = await database(TABLE_DIABETES_TYPES)
        .where('id', id)
        .update(type);

      if (numAffectedRegisters === 0) {
        return { success: false, message: Messages.NOTHING_FOUND };
      } else {
        return { success: true, type };
      }
    } catch (error) {
      logger.error('Error DiabetesTypeDAO.updateById');
      throw new Error(Messages.ERROR);
    }
  }

  static async deleteById(id) {
    try {
      const types = await database(TABLE_DIABETES_TYPES)
        .where('id', id)
        .select('id');

      if (types.length > 0) {
        const type = types[0];
        await database(TABLE_DIABETES_TYPES).where('id', type.id).del();
        return { success: true, message: Messages.DIABETES_TYPE_DELETED };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error DiabetesTypeDAO.deleteById');
      throw new Error(Messages.ERROR);
    }
  }
}
