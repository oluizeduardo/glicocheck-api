import database from '../db/dbconfig.js';
import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';

const TABLE_NAME = 'genders';

export default class GenderDAO {
  static async getAll() {
    try {
      const genders = await database(TABLE_NAME)
        .select('id', 'description')
        .orderBy('id');

      if (genders.length > 0) {
        return { success: true, genders };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error GenderDAO.getAll');
      throw new Error(Messages.ERROR);
    }
  }

  static async add(gender) {
    try {
      const createdGender = await database(TABLE_NAME)
      .insert(gender, ['id', 'description']);

      if (createdGender) {
        return {
          success: true,
          message: Messages.NEW_GENDER_CREATED,
          gender: createdGender[0],
        };
      } else {
        return { success: false, message: Messages.ERROR };
      }
    } catch (error) {
      logger.error('Error GenderDAO.add');
      throw new Error(Messages.ERROR);
    }
  }

  static async getById(id) {
    try {
      const genders = await database(TABLE_NAME)
        .where('id', id)
        .select('id', 'description');

      if (genders.length > 0) {
        return { success: true, gender: genders[0] };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error GenderDAO.getById');
      throw new Error(Messages.ERROR);
    }
  }

  static async updateById(id, gender) {
    try {
      const numAffectedRegisters = await database(TABLE_NAME)
        .where('id', id)
        .update(gender);

      if (numAffectedRegisters === 0) {
        return { success: false, message: Messages.NOTHING_FOUND };
      } else {
        return { success: true, gender };
      }
    } catch (error) {
      logger.error('Error GenderDAO.updateById');
      throw new Error(Messages.ERROR);
    }
  }

  static async deleteById(id) {
    try {
      const genders = await database(TABLE_NAME)
        .where('id', id)
        .select('id');

      if (genders.length > 0) {
        const gender = genders[0];
        await database(TABLE_NAME).where('id', gender.id).del();
        return { success: true, message: Messages.GENDER_DELETED };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error GenderDAO.deleteById');
      throw new Error(Messages.ERROR);
    }
  }
}
