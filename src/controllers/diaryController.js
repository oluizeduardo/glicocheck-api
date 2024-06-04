import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import DiaryDAO from '../dao/DiaryDAO.js';
import UserDAO from '../dao/UserDAO.js';
import moment from 'moment';
import DateTimeUtil from '../utils/dateTimeUtil.js';

// HTTP status code
const OK = 200;
const CREATED = 201;
const CLIENT_ERROR = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

class DiaryController {
  static addNew = async (req, res) => {
    logger.info('Executing DiaryController.addNew');
    try {
      // Validate param.
      const userCode = req.params.usercode;
      if (!userCode) {
        return res.status(CLIENT_ERROR).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      // Validate input.
      const { glucose, total_carbs, dateTime, id_markermeal } = req.body;
      if (!glucose || !dateTime || !id_markermeal) {
        return res
          .status(CLIENT_ERROR)
          .json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      // Check existing user.
      const userResult = await UserDAO.getByUserCode(userCode);
      if (!userResult.success) {
        return res.status(NOT_FOUND).json({ message: userResult.message });
      }

      const result = await DiaryDAO.add({
        id_user: userResult.user.id,
        glucose,
        total_carbs,
        dateTime,
        id_markermeal,
      });

      if (result.success) {
        return res.status(CREATED).json({ message: result.message });
      } else {
        return res.status(CLIENT_ERROR).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error DiaryController.addNew.', error);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: Messages.ERROR });
    }
  };

  static getAll = async (req, res) => {
    logger.info('Executing DiaryController.getAll');
    try {
      const { start, end } = req.query;

      const result = await DiaryDAO.getAll();

      if (result.success) {
        let diary = result.diary;

        if (start && end) {
          diary = diary.filter((record) => {
            return DiaryController.isDateBetween(start, end, record.dateTime);
          });
        }
        return res.status(OK).json(diary);
      } else {
        return res.status(CLIENT_ERROR).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error DiaryController.getAll');
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: Messages.ERROR });
    }
  };

  /**
   * Checks if a date is between two given dates, inclusive of the boundaries.
   * @param {string} start - The start date in the format 'YYYY-MM-DD'.
   * @param {string} end - The end date in the format 'YYYY-MM-DD'.
   * @param {string} dateToCheck - The date to be checked in the format 'YYYY-MM-DD'.
   * @return {boolean} True if the date is between the start and end dates, inclusive; otherwise, false.
   */
  static isDateBetween(start, end, dateToCheck) {
    const dateFormat = 'YYYY-MM-DD';
    const inclusivity = '[]';
    const startDate = moment(start, dateFormat);
    const endDate = moment(end, dateFormat);
    const date = moment(dateToCheck, dateFormat);
    return date.isBetween(startDate, endDate, null, inclusivity);
  }

  static getById = async (req, res) => {
    logger.info('Executing DiaryController.getById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res
          .status(CLIENT_ERROR)
          .json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      const result = await DiaryDAO.getById(id);

      if (result.success) {
        return res.status(OK).json(result.diary);
      } else {
        return res.status(CLIENT_ERROR).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error DiaryController.getById');
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: Messages.ERROR });
    }
  };

  static updateById = async (req, res) => {
    logger.info('Executing DiaryController.updateById');
    try {
      // Validate user code
      const userCode = req.params.usercode;
      if (!userCode) {
        return res.status(CLIENT_ERROR).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      // Validate id
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(NOT_FOUND).json({ message: Messages.NOTHING_FOUND });
      }

      // Validate input data
      const { glucose, total_carbs, id_markermeal } = req.body;
      if (!glucose || !total_carbs || !id_markermeal) {
        return res
          .status(CLIENT_ERROR)
          .json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      const updatedDiary = {
        glucose,
        total_carbs,
        id_markermeal,
        updated_at: DateTimeUtil.getCurrentDateTime(),
      };

      const result = await DiaryDAO.updateById(id, userCode, updatedDiary);

      if (result.success) {
        return res.status(OK).json(result.diary);
      } else {
        return res.status(NOT_FOUND).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error DiaryController.updateById');
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: Messages.ERROR });
    }
  };

  static deleteById = async (req, res) => {
    logger.info('Executing DiaryController.deleteById');
    try {
      // Validate user code
      const userCode = req.params.usercode;
      if (!userCode) {
        return res.status(CLIENT_ERROR).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      // Validate id
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(NOT_FOUND).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await DiaryDAO.deleteById(id, userCode);

      if (result.success) {
        return res.status(OK).json({ message: result.message });
      } else {
        return res.status(NOT_FOUND).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error DiaryController.deleteById');
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: Messages.ERROR });
    }
  };

  static deleteDiaryRecordByUserCode = async (req, res) => {
    logger.info('Executing DiaryController.deleteDiaryRecordById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(NOT_FOUND).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await DiaryDAO.deleteById(id);

      if (result.success) {
        return res.status(OK).json({ message: result.message });
      } else {
        return res.status(NOT_FOUND).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error DiaryController.deleteDiaryRecordById');
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: Messages.ERROR });
    }
  };

  static deleteByUserCode = async (req, res) => {
    logger.info('Executing DiaryController.deleteByUserCode');
    try {
      // Validate user code.
      const userCode = req.params.usercode;
      if (!userCode) {
        return res.status(CLIENT_ERROR).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      const result = await DiaryDAO.deleteByUserCode(userCode);

      if (result.success) {
        return res.status(OK).json({ message: result.message });
      } else {
        return res.status(NOT_FOUND).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error DiaryController.deleteByUserCode');
      return res.status(INTERNAL_SERVER_ERROR).json({ message: Messages.ERROR });
    }
  };

  static getByUserCode = async (req, res) => {
    logger.info('Executing DiaryController.getByUserCode');
    try {
      const userCode = req.params.usercode;

      if (!userCode) {
        return res.status(CLIENT_ERROR).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      const result = await DiaryDAO.getByUserCode(userCode);

      if (result.success) {
        res.status(OK).json(result.diary);
      } else {
        res.status(NOT_FOUND).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error DiaryController.getByUserCode');
      return res.status(INTERNAL_SERVER_ERROR).json({ message: Messages.ERROR });
    }
  };
}

export default DiaryController;
