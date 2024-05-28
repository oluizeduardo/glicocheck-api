import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import DateTimeUtil from '../utils/dateTimeUtil.js';
import BloodTypeDAO from '../dao/BloodTypeDAO.js';
/**
 * BloodTypeController.
 */
class BloodTypeController {
  /**
   * Retrieves all blood types.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static getAllTypes = async (req, res) => {
    logger.info('Executing BloodTypeController.getAllTypes');
    try {
      const result = await BloodTypeDAO.getAll();

      if (result.success) {
        res.status(200).json(result.types);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error BloodTypeController.getAllTypes');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Creates a new blood type.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static addType = async (req, res) => {
    logger.info('Executing BloodTypeController.addType');
    try {

      if (!req.body.description || req.body.description.trim() === '') {
        return res.status(400).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      const newType = { description: req.body.description };

      const result = await BloodTypeDAO.add(newType);

      if (result.success) {
        res
          .status(201)
          .json({ message: result.message, description: result.description });
      } else {
        res.status(500).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error BloodTypeController.addType');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Retrieves a blood type by its ID.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static getTypeById = async (req, res) => {
    logger.info('Executing BloodTypeController.getTypeById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await BloodTypeDAO.getById(id);

      if (result.success) {
        res.status(200).json(result.type);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error BloodTypeController.getTypeById');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Updates a blood type by its ID.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
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
        res.status(200).json(result.type);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error BloodTypeController.updateTypeById');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Deletes a blood type by its ID.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static deleteTypeById = async (req, res) => {
    logger.info('Executing BloodTypeController.deleteTypeById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await BloodTypeDAO.deleteById(id);

      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error BloodTypeController.deleteTypeById');
      res.status(500).json({ message: Messages.ERROR });
    }
  };
}

export default BloodTypeController;
