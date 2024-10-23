import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import DateTimeUtil from '../utils/dateTimeUtil.js';
import BloodTypeDAO from '../dao/BloodTypeDAO.js';
/**
 * BloodTypeController.
 */
class BloodTypeController {

  static getAllTypes = async (req, res) => {
    logger.info('Executing BloodTypeController.getAllTypes');
    try {
      const result = await BloodTypeDAO.getAll();

      if (result.success) {
        return res.status(200).json(result.types);
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error BloodTypeController.getAllTypes - Details: ${error}`);
      return res.status(500).json({ message: Messages.ERROR });
    }
  };

  static addType = async (req, res) => {
    logger.info('Executing BloodTypeController.addType');
    try {

      if (!req.body.description || req.body.description.trim() === '') {
        return res.status(400).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      const newType = { 
        description: req.body.description,
        created_at: DateTimeUtil.getCurrentDateTime(),
        updated_at: DateTimeUtil.getCurrentDateTime()
      };

      const result = await BloodTypeDAO.add(newType);

      if (result.success) {
        return res.status(201).json(result.blood_type);
      } else {
        return res.status(500).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error BloodTypeController.addType - Details: ${error}`);
      return res.status(500).json({ message: Messages.ERROR });
    }
  };

  static getTypeById = async (req, res) => {
    logger.info('Executing BloodTypeController.getTypeById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await BloodTypeDAO.getById(id);

      if (result.success) {
        return res.status(200).json(result.type);
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error BloodTypeController.getTypeById - Details: ${error}`);
      return res.status(500).json({ message: Messages.ERROR });
    }
  };

  static updateTypeById = async (req, res) => {
    logger.info('Executing BloodTypeController.updateTypeById');
    try {
      const id = Number.parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      if (!req.body.description || req.body.description.trim() === '') {
        return res.status(400).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      const updatedType = {
        id,
        description: req.body.description,
        updated_at: DateTimeUtil.getCurrentDateTime(),
      };

      const result = await BloodTypeDAO.updateById(id, updatedType);

      if (result.success) {
        return res.status(200).json(result.type);
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error BloodTypeController.updateTypeById - Details: ${error}`);
      return res.status(500).json({ message: Messages.ERROR });
    }
  };

  static deleteTypeById = async (req, res) => {
    logger.info('Executing BloodTypeController.deleteTypeById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await BloodTypeDAO.deleteById(id);

      if (result.success) {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error BloodTypeController.deleteTypeById - Details: ${error}`);
      return res.status(500).json({ message: Messages.ERROR });
    }
  };
}

export default BloodTypeController;
