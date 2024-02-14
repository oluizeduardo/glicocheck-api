import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import DateTimeUtil from '../utils/dateTimeUtil.js';
import GenderDAO from '../dao/GenderDAO.js';
/**
 * GenderController.
 */
class GenderController {
  /**
   * Retrieves all genders.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static getAllGenders = async (req, res) => {
    logger.info('Executing GenderController.getAllGenders');
    try {
      const result = await GenderDAO.getAll();

      if (result.success) {
        res.status(200).json(result.genders);
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error GenderController.getAllGenders');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Creates a new gender.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
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
        res.status(400).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error GenderController.createNewGender');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Retrieves a gender by its ID.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static getGenderById = async (req, res) => {
    logger.info('Executing GenderController.getGenderById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await GenderDAO.getById(id);

      if (result.success) {
        res.status(200).json(result.gender);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error GenderController.getGenderById');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Updates a gender by its ID.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static updateGenderById = async (req, res) => {
    logger.info('Executing GenderController.updateGenderById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const gender = {
        id: id,
        description: req.body.description,
        updated_at: DateTimeUtil.getCurrentDateTime(),
      };

      const result = await GenderDAO.updateById(id, gender);

      if (result.success) {
        res.status(200).json(result.gender);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error GenderController.updateGenderById');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Deletes a gender by its ID.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static deleteGenderById = async (req, res) => {
    logger.info('Executing GenderController.deleteGenderById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await GenderDAO.deleteById(id);

      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error GenderController.deleteGenderById');
      res.status(500).json({ message: Messages.ERROR });
    }
  };
}

export default GenderController;
