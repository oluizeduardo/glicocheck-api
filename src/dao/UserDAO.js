import database from '../db/dbconfig.js';
import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import CryptoUtil from '../utils/cryptoUtil.js';
import SecurityUtils from '../utils/securityUtils.js';

const TABLE_USERS = 'users';

export default class UserDAO {
  static async add(user) {
    try {
      const emailAlreadyUsed = await this.isEmailAlreadyUsed(user.email);

      if (emailAlreadyUsed) {
        return { success: false, message: Messages.EMAIL_ALREADY_USED };
      } else {
        const cod_user = CryptoUtil.createRandomUUID();
        const hashedPassword = SecurityUtils.generateHashValue(user.password);

        await database(TABLE_USERS).insert(
          {
            cod_user,
            name: user.name,
            email: user.email,
            password: hashedPassword,
            id_role: user.id_role,
          },
          ['cod_user']
        );

        return { success: true, cod_user, message: Messages.NEW_USER_CREATED };
      }
    } catch (error) {
      logger.error('Error UserDAO.add', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getAll() {
    try {
      const users = await database(TABLE_USERS).select('*');
      if (users.length > 0) {
        return { success: true, users };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error UserDAO.getAll', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getByUserCode(userCode) {
    try {
      const users = await database(TABLE_USERS)
        .where('cod_user', userCode)
        .select('*');

      if (users.length > 0) {
        return { success: true, user: users[0] };
      } else {
        return { success: false, message: Messages.USER_NOT_FOUND };
      }
    } catch (error) {
      logger.error('Error UserDAO.getByUserCode', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getByEmail(email) {
    try {
      const users = await database(TABLE_USERS)
        .where('email', email)
        .select('*');

      if (users.length > 0) {
        return { success: true, user: users[0] };
      } else {
        return { success: false, message: Messages.USER_NOT_FOUND };
      }
    } catch (error) {
      logger.error('Error UserDAO.getByEmail', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getPasswordByUserCode(userCode) {
    try {
      const users = await database(TABLE_USERS)
        .where('cod_user', userCode)
        .select('password');

      if (users.length > 0) {
        return { success: true, user: users[0] };
      } else {
        return { success: false, message: Messages.USER_NOT_FOUND };
      }
    } catch (error) {
      logger.error('Error UserDAO.getPasswordByUserCode', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async updateByUserCode(userCode, updatedUser) {
    try {
      const numAffectedRegisters = await database(TABLE_USERS)
        .where('cod_user', userCode)
        .update(updatedUser);

      if (numAffectedRegisters === 0) {
        return { success: false, message: Messages.USER_NOT_FOUND };
      } else {
        return { success: true, updatedUser };
      }
    } catch (error) {
      logger.error('Error UserDAO.updateByUserCode', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async deleteByUserCode(userCode) {
    try {
      const users = await database(TABLE_USERS)
        .where('cod_user', userCode)
        .select('id');

      if (users.length === 0) {
        return { success: false, message: Messages.USER_NOT_FOUND };
      } else {
        const user = users[0];

        await database(TABLE_USERS).where('id', user.id).del();

        return { success: true, message: Messages.USER_DELETED };
      }
    } catch (error) {
      logger.error('Error UserDAO.deleteByUserCode', error);
      throw new Error(Messages.ERROR);
    }
  }

  /**
   * @param {string} email
   * @return {boolean} A boolean indicating whether the email
   * is already used.
   */
  static async isEmailAlreadyUsed(email) {
    const registers = await database(TABLE_USERS)
      .where('email', email)
      .select('id')
      .limit(1);
    return registers.length > 0;
  }
}
