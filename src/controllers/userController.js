import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import UserDAO from '../dao/UserDAO.js';
import DateTimeUtil from '../utils/dateTimeUtil.js';
import SystemConfigurationDAO from '../dao/SystemConfigurationDAO.js';

/**
 * UserController.
 */
class UserController {
  static getAllUsers = async (req, res) => {
    logger.info('Executing UserController.getAllUsers');
    try {
      const result = await UserDAO.getAll();

      if (result.success) {
        res.status(200).json(result.users);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error UserController.getAllUsers');
      res.status(500).json({
        message: Messages.ERROR,
      });
    }
  };

  static addUser = async (req, res) => {
    logger.info('Executing UserController.addUser');
    try {
      const { name, email, password, id_role } = req.body;

      if (!name || !email || !password || !id_role) {
        return res
          .status(400)
          .json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      const user = { name, email, password, id_role };
      const addUserResult = await UserDAO.add(user);

      const defaultConfiguration = {
        id_user: addUserResult.id,
        id_glucose_unity: 1,
        limit_hypo: 70,
        limit_hyper: 160,
        time_bf_pre: '05:00',
        time_bf_pos: '07:00',
        time_lunch_pre: '11:00',
        time_lunch_pos: '13:00',
        time_dinner_pre: '19:00',
        time_dinner_pos: '21:00',
        time_sleep: '22:00'
      };
      const addSysConfigResult = await SystemConfigurationDAO.add(defaultConfiguration);

      if (addUserResult.success && addSysConfigResult.success) {
        res
          .status(201)
          .json({ message: addUserResult.message, cod_user: addUserResult.cod_user });
      } else {
        res.status(400).json({ message: addUserResult.message });
      }
    } catch (error) {
      logger.error(`Error UserController.addUser - ${error.message}`);
      res.status(500).json({
        message: Messages.ERROR,
      });
    }
  };

  static getUserByUserCode = async (req, res) => {
    logger.info('Executing UserController.getUserById');
    try {
      const userCode = req.params.usercode;

      if (!userCode) {
        return res
          .status(400)
          .json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      const result = await UserDAO.getByUserCode(userCode);

      if (result.success) {
        res.status(200).json(result.user);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error UserController.getUserById');
      res.status(500).json({
        message: Messages.ERROR,
      });
    }
  };

  static updateUserByUserCode = async (req, res) => {
    logger.info('Executing UserController.updateUserByUserCode');
    try {
      const userCode = req.params.usercode;

      const updatedUser = {
        name: req.body.name,
        email: req.body.email,
        birthdate: req.body.birthdate,
        phone: req.body.phone,
        id_gender: req.body.id_gender,
        weight: req.body.weight,
        height: req.body.height,
        picture: req.body.picture,
        id_role: req.body.id_role,
        updated_at: DateTimeUtil.getCurrentDateTime(),
      };

      const result = await UserDAO.updateByUserCode(userCode, updatedUser);

      if (result.success) {
        res.status(200).json(result.updatedUser);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error UserController.updateUserByUserCode');
      res.status(500).json({
        message: Messages.ERROR,
      });
    }
  };

  static deleteUserByUserCode = async (req, res) => {
    logger.info('Executing UserController.deleteUserByUserCode');

    try {
      const userCode = req.params.usercode;

      if (!userCode) {
        return res
          .status(400)
          .json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      const result = await UserDAO.deleteByUserCode(userCode);

      if (result.success) {
        res.status(200).json({ message: Messages.USER_DELETED });
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error UserController.deleteUserByUserCode');
      res.status(500).json({
        message: Messages.ERROR,
      });
    }
  };
}

export default UserController;
