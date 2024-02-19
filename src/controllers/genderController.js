import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import DateTimeUtil from '../utils/dateTimeUtil.js';
import GenderDAO from '../dao/GenderDAO.js';
/**
 * GenderController.
 */
class GenderController {

  static getAllGenders = async (req, res) => {
    logger.info('Executing GenderController.getAllGenders');
    try {
      const result = await GenderDAO.getAll();

      if (result.success) {
        return res.status(200).json(result.genders);
      } else {
        return res.status(400).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error GenderController.getAllGenders');
      return res.status(500).json({ message: Messages.ERROR });
    }
  };

  static addGender = async (req, res) => {
    logger.info('Executing GenderController.addGender');
    try {
      const gender = {
        description: (req.body.description).toUpperCase(),
      };

      const result = await GenderDAO.add(gender);

      if (result.success) {
        res
          .status(201)
          .json({ message: result.message, gender: result.gender });
      } else {
        return res.status(400).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error GenderController.createNewGender');
      return res.status(500).json({ message: Messages.ERROR });
    }
  };

  static getGenderById = async (req, res) => {
    logger.info('Executing GenderController.getGenderById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await GenderDAO.getById(id);

      if (result.success) {
        return res.status(200).json(result.gender);
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error GenderController.getGenderById');
      return res.status(500).json({ message: Messages.ERROR });
    }
  };

  static updateGenderById = async (req, res) => {
    logger.info('Executing GenderController.updateGenderById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const description = req.body.description;

      if(!description){
        return res.status(400)
          .json({message: Messages.INCOMPLETE_DATA_PROVIDED,
          details: 'Field \'description\' is missing.'});
      }

      const gender = {
        id: id,
        description,
        updated_at: DateTimeUtil.getCurrentDateTime(),
      };

      const result = await GenderDAO.updateById(id, gender);

      if (result.success) {
        return res.status(200).json(result.gender);
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error GenderController.updateGenderById');
      return res.status(500).json({ message: Messages.ERROR });
    }
  };

  static deleteGenderById = async (req, res) => {
    logger.info('Executing GenderController.deleteGenderById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await GenderDAO.deleteById(id);

      if (result.success) {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error GenderController.deleteGenderById');
      return res.status(500).json({ message: Messages.ERROR });
    }
  };
}

export default GenderController;
