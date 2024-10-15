import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import DateTimeUtil from '../utils/dateTimeUtil.js';
import DiabetesTypeDAO from '../dao/DiabetesTypeDAO.js';
/**
 * DiabetesTypeController.
 */
class DiabetesTypeController {
  /**
   * Retrieves all diabetes types.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static getAllTypes = async (req, res) => {
    logger.info('Executing DiabetesTypeController.getAllTypes');
    try {
      const result = await DiabetesTypeDAO.getAll();

      if (result.success) {
        res.status(200).json(result.types);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error DiabetesTypeController.getAllTypes');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Creates a new diabetes type.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static addType = async (req, res) => {
    logger.info('Executing DiabetesTypeController.addType');
    
    if (!req.body.description || req.body.description.trim() === '') {
      return res.status(400).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
    }
    
    try {
      const newType = {
        description: req.body.description,
        created_at: DateTimeUtil.getCurrentDateTime(),
        updated_at: DateTimeUtil.getCurrentDateTime()
      };

      const result = await DiabetesTypeDAO.add(newType);

      if (result.success) {
        res
          .status(201)
          .json({ message: result.message, description: result.description });
      } else {
        res.status(500).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error DiabetesTypeController.addType');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Retrieves a diabetes type by its ID.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static getTypeById = async (req, res) => {
    logger.info('Executing DiabetesTypeController.getTypeById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await DiabetesTypeDAO.getById(id);

      if (result.success) {
        res.status(200).json(result.type);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error DiabetesTypeController.getTypeById');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Updates a diabetes type by its ID.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static updateTypeById = async (req, res) => {
    logger.info('Executing DiabetesTypeController.updateTypeById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const updatedType = {
        id,
        description: req.body.description,
        updated_at: DateTimeUtil.getCurrentDateTime(),
      };

      const result = await DiabetesTypeDAO.updateById(id, updatedType);

      if (result.success) {
        res.status(200).json(result.type);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error DiabetesTypeController.updateTypeById');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Deletes a diabetes type by its ID.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static deleteTypeById = async (req, res) => {
    logger.info('Executing DiabetesTypeController.deleteTypeById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await DiabetesTypeDAO.deleteById(id);

      if (result.success) {
        res.status(200).json({ message: Messages.DIABETES_TYPE_DELETED });
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error DiabetesTypeController.deleteTypeById');
      res.status(500).json({ message: Messages.ERROR });
    }
  };
}

export default DiabetesTypeController;
