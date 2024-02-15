import database from '../db/dbconfig.js';
import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';

const TABLE_RESET_TOKENS = 'password_reset_tokens';

export default class ResetPasswordTokenDAO {
  static async add(token, email_owner) {
    try {
      await database(TABLE_RESET_TOKENS).insert({ token, email_owner });
      return { success: true, message: Messages.RESET_TOKEN_CREATED };
    } catch (error) {
      logger.error('Error ResetPasswordTokenDAO.add', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getByToken(token) {
    try {
      const result = await database(TABLE_RESET_TOKENS)
        .where('token', token)
        .select('*');

      if (result.length > 0) {
        return { success: true, token: result[0] };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error ResetPasswordTokenDAO.getByToken', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getAll() {
    try {
      const tokens = await database(TABLE_RESET_TOKENS).select('*');
      if (tokens.length > 0) {
        return { success: true, tokens };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error ResetPasswordTokenDAO.getAll', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async getByEmailOwner(email) {
    try {
      const tokens = await database(TABLE_RESET_TOKENS)
        .where('email_owner', email)
        .select('*');

      if (tokens.length > 0) {
        return { success: true, token: tokens[0] };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error ResetPasswordTokenDAO.getByEmailOwner', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async delete(token) {
    try {
      const tokens = await database(TABLE_RESET_TOKENS)
        .where('token', token)
        .select('id');

      if (tokens.length === 0) {
        return { success: false, message: Messages.NOTHING_FOUND };
      } else {
        await database(TABLE_RESET_TOKENS).where('token', token).del();
        return { success: true, message: Messages.RESET_TOKEN_DELETED };
      }
    } catch (error) {
      logger.error('Error ResetPasswordTokenDAO.delete', error);
      throw new Error(Messages.ERROR);
    }
  }

  static async deleteByEmailOwner(email) {
    try {
      const tokens = await database(TABLE_RESET_TOKENS)
        .where('email_owner', email)
        .select('id');

      if (tokens.length === 0) {
        return { success: false, message: Messages.NOTHING_FOUND };
      } else {
        await database(TABLE_RESET_TOKENS).where('id', tokens[0].id).del();
        return { success: true, message: Messages.RESET_TOKEN_DELETED };
      }
    } catch (error) {
      logger.error('Error ResetPasswordTokenDAO.deleteByEmailOwner', error);
      throw new Error(Messages.ERROR);
    }
  }
}
