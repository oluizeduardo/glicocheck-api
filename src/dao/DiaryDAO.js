import database from '../db/dbconfig.js';
import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';

const TABLE_NAME = 'blood_sugar_diary';

export default class DiaryDAO {
  static async add(diaryData) {
    try {
      const result = await database(TABLE_NAME).insert(diaryData, ['id']);

      if (result) {
        return { success: true, message: Messages.NEW_DIARY_DATA_ADDED };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error DiaryDAO.add', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getAll() {
    try {
      const diary = await database(TABLE_NAME)
        .select('*')
        .orderBy('dateTime', 'asc');

      if (diary.length > 0) {
        return { success: true, diary };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error DiaryDAO.getAll', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getById(id) {
    try {
      const result = await database(TABLE_NAME).where('id', id).select('*');

      if (result.length > 0) {
        return { success: true, diary: result[0] };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error DiaryDAO.getById', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getByUserCode(userCode) {
    try {
      const result = await database(TABLE_NAME + ' as bsd')
        .where('users.cod_user', userCode)
        .join('users', 'users.id', 'bsd.id_user')
        .select(
          'bsd.id',
          'users.cod_user',
          'bsd.glucose',
          'bsd.total_carbs',
          'bsd.dateTime',
          'bsd.id_markermeal',
          'bsd.created_at',
          'bsd.updated_at'
        );

      if (result.length > 0) {
        return { success: true, diary: result[0] };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error UserDAO.getByUserCode', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async updateById(id, diary) {
    try {
      const numAffectedRegisters = await database(TABLE_NAME)
        .where('id', id)
        .update(diary);

      if (numAffectedRegisters === 0) {
        return { success: false, message: Messages.NOTHING_FOUND };
      } else {
        return { success: true, diary };
      }
    } catch (error) {
      logger.error('Error DiaryDAO.updateById', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async deleteById(id) {
    try {
      const result = await database(TABLE_NAME).where('id', id).select('id');

      if (result.length > 0) {
        await database(TABLE_NAME).where('id', result[0].id).del();
        return { success: true, message: Messages.DIARY_DATA_DELETED };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error DiaryDAO.deleteById', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async deleteByUserCode(userCode) {
    try {
      const result = await database(TABLE_NAME + ' as bsd')
        .where('users.cod_user', userCode)
        .join('users', 'users.id', 'bsd.id_user')
        .select('bsd.id_user');

      if (result.length > 0) {
        await database(TABLE_NAME).where('id_user', result[0].id_user).del();
        return { success: true, message: Messages.DIARY_DATA_DELETED };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error DiaryDAO.deleteByUserCode', error);
      throw new Error(Messages.ERROR);
    }
  }
}
