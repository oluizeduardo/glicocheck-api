import database from '../db/dbconfig.js';
import env from '../envSchema.js';
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
      logger.error(`Error DiaryDAO.add - Details: ${error}`);
      throw new Error(Messages.ERROR);
    }
  }

  static async getAll({ start, end, orderBy = 'dateTime', sort = 'asc' }) {
    try {
      let query = database(TABLE_NAME).select('*');

      if (start && end) {
        const environment = env.ENVIRONMENT;

        if(environment === 'prod') {
          // PostgreSQL
          query = query.whereBetween(database.raw('to_timestamp(bsd.dateTime, \'YYYY-MM-DD\')'), [start, end]);
        } else {
          // SQLite          
          query = query.whereBetween(database.raw('strftime(\'%Y-%m-%d\', bsd.dateTime)'), [start, end]);
        }
      }

      query = query.orderBy(orderBy, (sort.toLowerCase() === 'asc' ? 'asc' : 'desc'));

      const diary = await query;

      if (diary.length > 0) {
        return { success: true, diary };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error(`Error DiaryDAO.getAll - Details: ${error}`);
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
      logger.error(`Error DiaryDAO.getById - Details: ${error}`);
      throw new Error(Messages.ERROR);
    }
  }

  static async getByUserCode(userCode, { start, end, orderBy = 'dateTime', sort = 'desc' }) {
    try {
      let query = database(TABLE_NAME + ' as bsd')
        .join('users', 'users.id', 'bsd.id_user')
        .where('users.cod_user', userCode)
        .select(
          'bsd.id',
          'users.cod_user',
          'bsd.glucose',
          'bsd.total_carbs',
          'bsd.datetime as dateTime',
          'bsd.id_markermeal',
          'bsd.created_at',
          'bsd.updated_at'
        );

      if (start && end) {
        const environment = env.ENVIRONMENT;

        if(environment === 'prod') {
          // PostgreSQL
          query = query.whereBetween(database.raw('to_timestamp(bsd.dateTime, \'YYYY-MM-DD\')'), [start, end]);
        } else {
          // SQLite          
          query = query.whereBetween(database.raw('strftime(\'%Y-%m-%d\', bsd.dateTime)'), [start, end]);
        }
      }

      query = query.orderBy(orderBy, (sort.toLowerCase() === 'desc' ? 'desc' : 'asc'));

      const result = await query;

      if (result.length > 0) {
        return { success: true, diary: result };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error(`Error DiaryDAO.getByUserCode - Details: ${error}.`);
      throw new Error(Messages.ERROR_CONSULTING_DIARY);
    }
  }

  static async updateById(id, userCode, diary) {
    try {
      const numAffectedRegisters = await database(TABLE_NAME)
        .where('id', id)
        .whereIn('id_user', function() {
          this.select('id')
            .from('users')
            .where('cod_user', userCode);
        })
        .update(diary);

      if (numAffectedRegisters === 0) {
        return { success: false, message: Messages.NOTHING_FOUND };
      } else {
        return { success: true, diary };
      }
    } catch (error) {
      logger.error(`Error DiaryDAO.updateById - Details: ${error}`);
      throw new Error(Messages.ERROR);
    }
  }

  static async deleteById(id, userCode) {
    try {
      // Check the register existence.
      const result = await database(TABLE_NAME).where('id', id).select('id');

      if (result.length > 0) {
        await database(TABLE_NAME)
        .where('id', result[0].id)
        .whereIn('id_user', function() {
          this.select('id')
            .from('users')
            .where('cod_user', userCode);
        })
        .del();

        return { success: true, message: Messages.DIARY_DATA_DELETED };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error(`Error DiaryDAO.deleteById - Details: ${error}`);
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
      logger.error(`Error DiaryDAO.deleteByUserCode - Details: ${error}`);
      throw new Error(Messages.ERROR);
    }
  }
}
