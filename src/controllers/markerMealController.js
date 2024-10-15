import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import DateTimeUtil from '../utils/dateTimeUtil.js';
import MarkerMealDAO from '../dao/MarkerMealDAO.js';
/**
 * MarkerMealController.
 *
 * Contains methods to deal with the marker meals.
 */
class MarkerMealController {
  /**
   * Retrieves all marker meals.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static getAllMarkerMeals = async (req, res) => {
    logger.info('Executing MarkerMealController.getAllMarkerMeals');
    try {
      const result = await MarkerMealDAO.getAll();

      if (result.success) {
        res.status(200).json(result.markers);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error MarkerMealController.getAllMarkerMeals');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Retrieves a marker meal by ID.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static getMarkerMealById = async (req, res) => {
    logger.info('Executing MarkerMealController.getMarkerMealById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await MarkerMealDAO.getById(id);

      if (result.success) {
        res.status(200).json(result.type);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error MarkerMealController.getMarkerMealById');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Creates a new marker meal.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static addMarkerMeal = async (req, res) => {
    logger.info('Executing MarkerMealController.addMarkerMeal');
    try {
      if (!req.body.description || req.body.description.trim() === '') {
        return res.status(400).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      const newMarkerMeal = {         
        description: req.body.description,
        created_at: DateTimeUtil.getCurrentDateTime(),
        updated_at: DateTimeUtil.getCurrentDateTime()
      };
      const result = await MarkerMealDAO.add(newMarkerMeal);

      if (result.success) {
        res
          .status(201)
          .json({ message: result.message, description: result.description });
      } else {
        res.status(500).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error MarkerMealController.addMarkerMeal');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Updates a marker meal by ID.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static updateMarkerMealById = async (req, res) => {
    logger.info('Executing MarkerMealController.updateMarkerMealById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      if (!req.body.description || req.body.description.trim() === '') {
        return res.status(400).json({ message: Messages.INCOMPLETE_DATA_PROVIDED });
      }

      const updatedMarker = {
        id,
        description: req.body.description,
        updated_at: DateTimeUtil.getCurrentDateTime(),
      };

      const result = await MarkerMealDAO.updateById(id, updatedMarker);

      if (result.success) {
        res.status(200).json(result.marker);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error MarkerMealController.updateMarkerMealById');
      res.status(500).json({ message: Messages.ERROR });
    }
  };

  /**
   * Deletes a marker meal by ID.
   *
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves to void.
   * @throws {Error} - If an error occurs during the process.
   */
  static deleteMarkerMealById = async (req, res) => {
    logger.info('Executing MarkerMealController.deleteMarkerMealById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await MarkerMealDAO.deleteById(id);

      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error('Error MarkerMealController.deleteMarkerMealById');
      res.status(500).json({ message: Messages.ERROR });
    }
  };
}

export default MarkerMealController;
