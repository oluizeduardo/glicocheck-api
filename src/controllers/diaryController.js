import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import DiaryDAO from '../dao/DiaryDAO.js';
import UserDAO from '../dao/UserDAO.js';
import DateTimeUtil from '../utils/dateTimeUtil.js';
import GlycemiaStatistics from '../utils/GlycemiaStatistics.js';

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
      const { glucose, total_carbs, dateTime, id_markermeal, id_measurement_unity } = req.body;
      if (!glucose || !dateTime || !id_markermeal || !id_measurement_unity) {
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
        datetime: dateTime,
        id_markermeal,
        id_measurement_unity,
        created_at: DateTimeUtil.getCurrentDateTime(),
        updated_at: DateTimeUtil.getCurrentDateTime()
      });

      if (result.success) {
        return res.status(CREATED).json({ message: result.message });
      } else {
        return res.status(CLIENT_ERROR).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error DiaryController.addNew - Details: ${error}`);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: Messages.ERROR });
    }
  };

  static getAll = async (req, res) => {
    logger.info('Executing DiaryController.getAll');
    try {
      const { start, end } = req.query;
      const result = await DiaryDAO.getAll({ start, end });

      if (result.success) {
        return res.status(OK).json(result.diary);
      } else {
        return res.status(CLIENT_ERROR).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error DiaryController.getAll - Details: ${error}`);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: Messages.ERROR });
    }
  };

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
      logger.error(`Error DiaryController.getById - Details: ${error}`);
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
      logger.error(`Error DiaryController.updateById - Details: ${error}`);
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

      // Deletes a record by id.
      const result = await DiaryDAO.deleteById(id, userCode);

      if (result.success) {
        return res.status(OK).json({ message: result.message });
      } else {
        return res.status(NOT_FOUND).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error DiaryController.deleteById - Details: ${error}`);
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

      // Deletes all records for this user.
      const result = await DiaryDAO.deleteByUserCode(userCode);

      if (result.success) {
        return res.status(OK).json({ message: result.message });
      } else {
        return res.status(NOT_FOUND).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error DiaryController.deleteByUserCode - Details: ${error}`);
      return res.status(INTERNAL_SERVER_ERROR).json({ message: Messages.ERROR });
    }
  };

  static getByUserCode = async (req, res) => {
    logger.info('Executing DiaryController.getByUserCode');
    try {
      const userCode = req.params.usercode;
      let { start, end, orderBy, sort } = req.query;
      
      if (!userCode) {
        return res.status(CLIENT_ERROR).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      const result = await DiaryDAO.getByUserCode(userCode, { start, end, orderBy, sort });

      if (result.success) {
        return res.status(OK).json(result.diary);
      } else {
        return res.status(NOT_FOUND).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error DiaryController.getByUserCode - Details: ${error}`);
      return res.status(INTERNAL_SERVER_ERROR).json({ message: Messages.ERROR });
    }
  };

  static getGlycemiaStatsByUserCode = async (req, res) => {
    logger.info('Executing DiaryController.getGlycemiaStatsByUserCode');
    try {
      const userCode = req.params.usercode;

      if (!userCode) {
        return res.status(CLIENT_ERROR).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      const result = await DiaryDAO.getByUserCode(userCode, {});

      if (result.success) {
        res.status(OK).json(this.calculateStatistics(result.diary));
      } else {
        res.status(NOT_FOUND).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error DiaryController.getGlycemiaStatsByUserCode - Details: ${error}`);
      return res.status(INTERNAL_SERVER_ERROR).json({ message: Messages.ERROR });
    }
  };

  static calculateStatistics(readings) {    
    const date_start = new Date(Math.min(...readings.map(item => new Date(item.dateTime))));
    const date_end = new Date(Math.max(...readings.map(item => new Date(item.dateTime))));

    const glucoseReadings = readings.map(entry => entry.glucose);
    const stats = new GlycemiaStatistics(glucoseReadings).getAllStatistics();
    return {
      date_start,
      date_end,
      ...stats
    };
  }
}

export default DiaryController;
