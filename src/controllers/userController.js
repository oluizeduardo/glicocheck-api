import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import UserDAO from '../dao/UserDAO.js';
import DateTimeUtil from '../utils/dateTimeUtil.js';
import SystemConfigurationController from './systemConfigurationController.js';
import HealthInfoDAO from '../dao/HealthInfoDAO.js';
import SystemConfigurationDAO from '../dao/SystemConfigurationDAO.js';
import DiaryDAO from '../dao/DiaryDAO.js';

/**
 * UserController.
 */
class UserController {
  static getAllUsers = async (req, res) => {
    logger.info('Executing UserController.getAllUsers');
    try {
      const result = await UserDAO.getAll();

      if (result.success) {
        return res.status(200).json(result.users);
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error UserController.getAllUsers - Details: ${error}`);
      return res.status(500).json({
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

      // Save new user.
      const user = { 
        name, 
        email, 
        password, 
        id_role,
        created_at: DateTimeUtil.getCurrentDateTime(),
        updated_at: DateTimeUtil.getCurrentDateTime()
       };
      const addUserResult = await UserDAO.add(user);      

      if (addUserResult.success) {
        // Save default system configuration.
        SystemConfigurationController.saveDefaultSystemConfiguration(addUserResult.id);

        return res
          .status(201)
          .json({ message: addUserResult.message, cod_user: addUserResult.cod_user });
      } else {
        return res.status(400).json({ message: addUserResult.message });
      }
    } catch (error) {
      logger.error(`Error UserController.addUser - Details: ${error}`);
      return res.status(500).json({
        message: Messages.ERROR,
      });
    }
  };

  static getUserByUserCode = async (req, res) => {
    logger.info('Executing UserController.getUserByUserCode');
    try {
      const userCode = req.params.usercode;

      if (!userCode) {
        return res
          .status(400)
          .json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      const result = await UserDAO.getByUserCode(userCode);

      if (result.success) {
        return res.status(200).json(result.user);
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error UserController.getUserByUserCode - Details: ${error}`);
      return res.status(500).json({
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
        return res.status(200).json(result.updatedUser);
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error UserController.updateUserByUserCode - Details: ${error}`);
      return res.status(500).json({
        message: Messages.ERROR,
      });
    }
  };

  static deleteUserAccountByUserCode = async (req, res) => {
    logger.info('Executing UserController.deleteUserAccountByUserCode');

    const userCode = req.params.usercode;
    if (!userCode) 
      return res.status(400).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });

    try {
      // Get user id.
      const {userId} = await UserDAO.getUserIdByUserCode(userCode);
      if(!userId){
        logger.error('UserController.deleteUserAccountByUserCode ' + Messages.USER_NOT_FOUND);
        return res.status(404).json({ message: Messages.USER_NOT_FOUND });
      }        

      // Delete health info.
      let result = await HealthInfoDAO.deleteByUserId(userId);
      if(!result.success)
        logger.error(Messages.ERROR_DELETE_HEALTH_INFO);

      // Delete system configuration.
      result = await SystemConfigurationDAO.deleteByUserId(userId);
      if(!result.success)
        logger.error(Messages.ERROR_DELETE_SYSTEM_CONFIGURATION);
      
      // Delete glucose diary registers.
      result = await DiaryDAO.deleteByUserCode(userCode);
      if(!result.success)
        logger.error(Messages.ERROR_DELETING_DIARY);

      // Delete user.
      result = await UserDAO.deleteByUserId(userId);
      if(!result.success)
        logger.error(Messages.ERROR_DELETE_USER);

      if (result.success) {
        return res.status(200).json({ message: Messages.USER_DELETED });
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error UserController.deleteUserAccountByUserCode - Details: ${error}`);
      return res.status(500).json({
        message: Messages.ERROR,
      });
    }
  };
}

export default UserController;
