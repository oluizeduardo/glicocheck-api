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
      return res.status(401).json({message: Messages.INCOMPLETE_DATA_PROVIDED});
    }

    const {appId, appKey} = this.loadEdamanCredentials();
    if(!appId || !appKey){
      logger.error(Messages.ERROR_LOADING_CARBS_COUTING_CREDENTIALS);
      return res.status(500).json({message: Messages.ERROR_CONSULTING_CARBS_COUTING_API});
    }

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

   /**
   * Return the EDAMAN credentials.
   * @return {string} A new JWT token.
   */
   static loadEdamanCredentials() {
    const appId = process.env.EDAMAM_APP_ID;
    const appKey = process.env.EDAMAM_APP_KEY;
    return {appId, appKey};
  }
}

export default CarbsCountingController;
