import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import DateTimeUtil from '../utils/dateTimeUtil.js';
import UserDAO from '../dao/UserDAO.js';
import SystemConfigurationDAO from '../dao/SystemConfigurationDAO.js';
/**
 * SystemConfigurationController.
 */
class SystemConfigurationController {
  static addSystemConfiguration = async (req, res) => {
    logger.info(
      'Executing SystemConfigurationController.addSystemConfiguration'
    );
    // Destructure fields
    const {
      cod_user,
      id_glucose_unity,
      limit_hypo,
      limit_hyper,
      time_breakfast_pre,
      time_breakfast_pos,
      time_lunch_pre,
      time_lunch_pos,
      time_dinner_pre,
      time_dinner_pos,
      time_sleep,
    } = req.body;

    // Validate input data
    if (
      !cod_user ||
      !id_glucose_unity ||
      !limit_hypo ||
      !limit_hyper ||
      !time_breakfast_pre ||
      !time_breakfast_pos ||
      !time_lunch_pre ||
      !time_lunch_pos ||
      !time_dinner_pre ||
      !time_dinner_pos ||
      !time_sleep
    ) {
      res.status(400).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      return;
    }

    // Check existing user.
    const userResult = await UserDAO.getByUserCode(cod_user);
    if (!userResult.success) {
      return res.status(404).json({ message: userResult.message });
    }

    // Check if there's already a system's configuration for this user.
    const userId = userResult.user.id;
    const result = await SystemConfigurationDAO.getByUserId(userId);
    if (result.success) {
      return res
        .status(400)
        .json({ message: Messages.SYSTEM_CONFIGURATION_EXISTING });
    }

    try {
      const newConfiguration = {
        id_user: userResult.user.id,
        id_glucose_unity,
        limit_hypo,
        limit_hyper,
        time_bf_pre: time_breakfast_pre,
        time_bf_pos: time_breakfast_pos,
        time_lunch_pre,
        time_lunch_pos,
        time_dinner_pre,
        time_dinner_pos,
        time_sleep,
      };

      const result = await SystemConfigurationDAO.add(newConfiguration);

      if (result.success) {
        return res.status(201).json({ message: result.message, cod_user });
      } else {
        return res.status(500).json({ message: Messages.ERROR });
      }
    } catch (error) {
      logger.error('Error SystemConfigurationController.addSystemConfiguration', error);
      return res.status(500).json({ message: Messages.ERROR });
    }
  };

  static getAllSystemConfiguration = async (req, res) => {
    logger.info('Executing SystemConfigurationController.getAllSystemConfiguration');
    try {
      const result = await SystemConfigurationDAO.getAll();

      if (result.success) {
        return res.status(200).json(result.systemConfiguration);
      } else {
        return res.status(500).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error SystemConfigurationController.getAllSystemConfiguration', error);
      return res.status(500).json({ message: Messages.ERROR });
    }
  };

  static saveDefaultSystemConfiguration = async (userId) => {
    logger.info('Executing SystemConfigurationController.saveDefaultSystemConfiguration');
    const defaultSystemConfig = {
      id_user: userId,
      id_glucose_unity: 1,
      limit_hypo: 70,
      limit_hyper: 160,
      time_bf_pre: '06:00',
      time_bf_pos: '08:00',
      time_lunch_pre: '12:00',
      time_lunch_pos: '14:00',
      time_dinner_pre: '19:00',
      time_dinner_pos: '21:00',
      time_sleep: '23:00',
    };
    const result = await SystemConfigurationDAO.add(defaultSystemConfig);

    if (result.success) {
      logger.info(Messages.SAVED_DEFAULT_SYSTEM_CONFIGURATION);
    } else {
      logger.error(Messages.ERROR);
    }
  };

  static getByUserCode = async (req, res) => {
    logger.info('Executing SystemConfigurationController.getByUserCode');
    // Validate param.
    const userCode = req.params.usercode;
    if (!userCode) {
      return res
        .status(400)
        .json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
    }

    // Check existing user.
    const userResult = await UserDAO.getByUserCode(userCode);
    if (!userResult.success) {
      return res.status(404).json({ message: userResult.message });
    }

    // Retrives system's configuration by user id.
    const result = await SystemConfigurationDAO.getByUserId(userResult.user.id);

    if (result.success) {
      return res.status(201).json(result.systemConfiguration);
    } else {
      return res.status(404).json({ message: result.message });
    }
  };

  static getById = async (req, res) => {
    logger.info('Executing SystemConfigurationController.getById');
    // Validate param.
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
    }

    const result = await SystemConfigurationDAO.getById(id);

    if (result.success) {
      return res.status(200).json(result.systemConfiguration);
    } else {
      return res.status(404).json({ message: result.message });
    }
  };

  static updateByUserCode = async (req, res) => {
    logger.info('Executing SystemConfigurationController.updateByUserCode');
    try {
      const { usercode } = req.params;

      // Check existing user.
      const userResult = await UserDAO.getByUserCode(usercode);
      if (!userResult.success) {
        return res.status(404).json({ message: userResult.message });
      }

      // Retrives system's configuration by user id.
      const result = await SystemConfigurationDAO.getByUserId(
        userResult.user.id
      );

      if (result.success) {
        const updatedConfiguration = {
          id_glucose_unity: req.body.id_glucose_unity,
          limit_hypo: req.body.limit_hypo,
          limit_hyper: req.body.limit_hyper,
          time_bf_pre: req.body.time_breakfast_pre,
          time_bf_pos: req.body.time_Breakfast_pos,
          time_lunch_pre: req.body.time_lunch_pre,
          time_lunch_pos: req.body.time_lunch_Pos,
          time_dinner_pre: req.body.time_dinner_pre,
          time_dinner_pos: req.body.time_dinner_pos,
          time_sleep: req.body.time_sleep,
          updated_at: DateTimeUtil.getCurrentDateTime(),
        };

        const userId = userResult.user.id;
        const result = await SystemConfigurationDAO.updateByUserId(
          userId,
          updatedConfiguration
        );

        if (result.success) {
          res.status(200).json(result.systemConfig);
        } else {
          res.status(404).json({ message: result.message });
        }
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error SystemConfigurationController.updateByUserCode');
      return res.status(500).json({
        message: Messages.ERROR,
        details: error.message,
      });
    }
  };

  static deleteById = async (req, res) => {
    logger.info('Executing SystemConfigurationController.deleteById');
    try {
      const { id } = req.params;
      const result = await SystemConfigurationDAO.deleteById(id);

      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(500).json({ message: Messages.ERROR });
      }
    } catch (error) {
      logger.error('Error SystemConfigurationController.deleteByUserCode.', error);
      return res.status(500).json({ message: Messages.ERROR });
    }
  };

  static deleteByUserCode = async (req, res) => {
    logger.info('Executing SystemConfigurationController.deleteByUserCode');
    try {
      const { usercode } = req.params;

      // Check existing user.
      const userResult = await UserDAO.getByUserCode(usercode);
      if (!userResult.success) {
        return res.status(404).json({ message: userResult.message });
      }

      // Check existing system configuration.
      const userId = userResult.user.id;
      const sysConfig = await SystemConfigurationDAO.getByUserId(userId);
      if (!sysConfig.success) {
        return res.status(404).json({ message: sysConfig.message });
      }

      // Delete system configuration by user ID.
      const deleteResult = await SystemConfigurationDAO.deleteByUserId(userId);

      if (deleteResult.success) {
        res.status(200).json({ message: deleteResult.message });
      } else {
        res.status(500).json({ message: Messages.ERROR });
      }
    } catch (error) {
      logger.error('Error SystemConfigurationController.deleteByUserCode.', error);
      return res.status(500).json({ message: Messages.ERROR });
    }
  };
}

export default SystemConfigurationController;
