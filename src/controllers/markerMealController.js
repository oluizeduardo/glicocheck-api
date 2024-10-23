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

  static getAllMarkerMeals = async (req, res) => {
    logger.info('Executing MarkerMealController.getAllMarkerMeals');
    try {
      const result = await MarkerMealDAO.getAll();

      if (result.success) {
        return res.status(200).json(result.markers);
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error MarkerMealController.getAllMarkerMeals - Details: ${error}`);
      return res.status(500).json({ message: Messages.ERROR });
    }
  };

  static getMarkerMealById = async (req, res) => {
    logger.info('Executing MarkerMealController.getMarkerMealById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await MarkerMealDAO.getById(id);

      if (result.success) {
        return res.status(200).json(result.type);
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error MarkerMealController.getMarkerMealById - Details: ${error}`);
      return res.status(500).json({ message: Messages.ERROR });
    }
  };

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
        return res.status(201).json(result.marker);
      } else {
        return res.status(500).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error MarkerMealController.addMarkerMeal - Details: ${error}`);
      return res.status(500).json({ message: Messages.ERROR });
    }
  };

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
        return res.status(200).json(result.marker);
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error MarkerMealController.updateMarkerMealById - Details: ${error}`);
      return res.status(500).json({ message: Messages.ERROR });
    }
  };

  static deleteMarkerMealById = async (req, res) => {
    logger.info('Executing MarkerMealController.deleteMarkerMealById');
    try {
      const id = Number.parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: Messages.NOTHING_FOUND });
      }

      const result = await MarkerMealDAO.deleteById(id);

      if (result.success) {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`Error MarkerMealController.deleteMarkerMealById - Details: ${error}`);
      return res.status(500).json({ message: Messages.ERROR });
    }
  };
}

export default MarkerMealController;
