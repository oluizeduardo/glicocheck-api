/* eslint-disable no-undef */
import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';
import axios from 'axios';
/**
 * CarbsCountingController.
 */
class CarbsCountingController {
  /**
   * This function sends a request to EDAMAM's API to calculate
   * the total of carbohydrate in a given food.
   * @param {Request} req
   * @param {Response} res
   */
  static calculatesTotalCarbohydrate = async (req, res) => {
    logger.info('Executing CarbsCountingController.calculatesTotalCarbohydrate');

    const food = req.params.food;

    if (!food) {
      return res.status(404).json({message: Messages.NOTHING_FOUND});
    }

    const appId = process.env.EDAMAM_APP_ID;
    const appKey = process.env.EDAMAM_APP_KEY;
    const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(food)}`;

    const response = await axios.get(url);
    const data = await response.data;

    if (!data) {
      logger.warn('EDAMAM API returned empty response');
      return res.status(404).json({message: Messages.NOTHING_FOUND});
    }

    if (data.totalNutrients.CHOCDF && data.totalNutrients.ENERC_KCAL) {
      const carbohydrate = data.totalNutrients.CHOCDF.quantity;
      const calories = data.totalNutrients.ENERC_KCAL.quantity;
      res.status(200).json({food, carbohydrate, calories});
    } else {
      res.status(404).json({message: Messages.NOTHING_FOUND});
    }
  };
}

export default CarbsCountingController;
