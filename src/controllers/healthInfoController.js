import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import DateTimeUtil from '../utils/dateTimeUtil.js';
import HealthInfoDAO from '../dao/HealthInfoDAO.js';
import UserDAO from '../dao/UserDAO.js';
/**
 * HealthInfoController.
 */
class HealthInfoController {
  static getAll = async (req, res) => {
    logger.info('Executing HealthInfoController.getAll');
    try {
      const result = await HealthInfoDAO.getAll();

      if (result.success) {
        return res.status(200).json(result.healthInfo);
      } else {
        return res.status(500).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error HealthInfoController.getAll', error);
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  static addNew = async (req, res) => {
    logger.info('Executing HealthInfoController.addNew');
    try {
      // Validate payload fields.
      const { cod_user, id_diabetes_type, id_blood_type, month_diagnosis } = req.body;
      if (!cod_user || !id_diabetes_type || !id_blood_type || !month_diagnosis) {
        return res.status(400).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      // Check existing user.
      const userResult = await UserDAO.getByUserCode(cod_user);
      if (!userResult.success) {
        return res.status(404).json({ message: userResult.message });
      }

      // Check existing health info for this user.
      const id_user = userResult.user.id;
      if (await this.healthInfoExists(id_user)) {
        return res.status(400).json({ message: Messages.HEALTH_INFO_EXISTING });
      }

      // Add new Health info.
      const healthInfo = {
        id_user,
        id_diabetes_type,
        id_blood_type,
        month_diagnosis,
        created_at: DateTimeUtil.getCurrentDateTime(),
        updated_at: DateTimeUtil.getCurrentDateTime()
      };
      const result = await HealthInfoDAO.add(healthInfo);

      if (result.success) {
        return res.status(201).json({ message: result.message });
      } else {
        return res.status(500).json(Messages.ERROR);
      }
    } catch (error) {
      logger.error('Error HealthInfoController.addNew.', error);
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  static healthInfoExists = async (id_user) => {
    const healthInfoResult = await HealthInfoDAO.getByUserId(id_user);
    return healthInfoResult.success;
  };

  static getByUserCode = async (req, res) => {
    logger.info('Executing HealthInfoController.getByUserCode');
    try {
      // Validate param.
      const userCode = req.params.usercode;
      if (!userCode) {
        return res.status(400).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      // Check existing user.
      const userResult = await UserDAO.getByUserCode(userCode);
      if (!userResult.success) {
        return res.status(404).json({ message: userResult.message });
      }

      // Retrives healthinfo by user id.
      const result = await HealthInfoDAO.getByUserId(userResult.user.id);

      if (result.success) {
        return res.status(200).json(result.healthInfo);
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error HealthInfoController.getByUserCode', error);
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  static updateByUserCode = async (req, res) => {
    logger.info('Executing HealthInfoController.updateByUserCode');
    try {
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
        logger.info('No user found to update health info.');
        return res.status(404).json({ message: result.message });
      }

      const healthInfo = {
        id_diabetes_type: req.body.id_diabetes_type,
        month_diagnosis: req.body.month_diagnosis,
        id_blood_type: req.body.id_blood_type,
        updated_at: DateTimeUtil.getCurrentDateTime(),
      };      

      const id_user = userResult.user.id;
      const result = await HealthInfoDAO.updateByUserId(id_user, healthInfo);

      if (result.success) {
        res.status(201).json(result.healthInfo);
      } else {
        // Add new Health info for this user.
        const resultAdd = await HealthInfoDAO.add({id_user,...healthInfo});

        if (resultAdd.success) {
          res.status(200).json(result.healthInfo);
        }else{
          res.status(404).json({ message: result.message });
        }
      }
    } catch (error) {
      logger.error('Error UserController.updateUserByUserCode', error);
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  static deleteByUserCode = async (req, res) => {
    logger.info('Executing HealthInfoController.deleteByUserCode');
    try {
      // Validate param.
      const userCode = req.params.usercode;
      if (!userCode) {
        return res.status(400).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      // Check existing user.
      const userResult = await UserDAO.getByUserCode(userCode);
      if (!userResult.success) {
        return res.status(404).json({ message: userResult.message });
      }

      // Retrives healthinfo by user id.
      let healthInfoResult = await HealthInfoDAO.getByUserId(userResult.user.id);
      if (!healthInfoResult.success) {
        return res.status(404).json({ message: healthInfoResult.message });
      }
        
      // Deletes Health Info by id.
      healthInfoResult = await HealthInfoDAO.deleteById(healthInfoResult.healthInfo.id);
      if(healthInfoResult.success){
        res.status(200).json({ message: healthInfoResult.message });
      }else{
        res.status(500).json({ message: Messages.ERROR });
      }      
    } catch (error) {
      logger.error('Error HealthInfoController.deleteByUserCode.', error);
      res.status(500).json({ message: Messages.ERROR });
    }
  };
}

export default HealthInfoController;
