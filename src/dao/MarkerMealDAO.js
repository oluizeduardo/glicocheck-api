import database from '../db/dbconfig.js';
import logger from '../loggerUtil/logger.js';
import Messages from '../utils/messages.js';

const TABLE_MARKER_MEALS = 'marker_meals';

export default class MarkerMealDAO {
  static async add(newMarkerMeal) {
    try {
      const marker = await database(TABLE_MARKER_MEALS).insert(newMarkerMeal, [
        'description',
      ]);

      if (marker) {
        return {
          success: true,
          description: marker[0].description,
          message: Messages.MARKER_MEAL_CREATED,
        };
      } else {
        return { success: false, message: Messages.ERROR };
      }
    } catch (error) {
      logger.error('Error MarkerMealDAO.add');
      throw new Error(Messages.ERROR);
    }
  }

  static async getAll() {
    try {
      const markers = await database(TABLE_MARKER_MEALS).select('*').orderBy('id', 'asc');
      if (markers.length > 0) {
        return { success: true, markers };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error MarkerMealDAO.getAll');
      throw new Error(Messages.ERROR);
    }
  }

  static async getById(id) {
    try {
      const types = await database(TABLE_MARKER_MEALS)
        .where('id', id)
        .select('*');

      if (types.length > 0) {
        return { success: true, type: types[0] };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error MarkerMealDAO.getById');
      throw new Error(Messages.ERROR);
    }
  }

  static async updateById(id, marker) {
    try {
      const numAffectedRegisters = await database(TABLE_MARKER_MEALS)
        .where('id', id)
        .update(marker);

      if (numAffectedRegisters === 0) {
        return { success: false, message: Messages.NOTHING_FOUND };
      } else {
        return { success: true, marker };
      }
    } catch (error) {
      logger.error('Error MarkerMealDAO.updateById');
      throw new Error(Messages.ERROR);
    }
  }

  static async deleteById(id) {
    try {
      const markers = await database(TABLE_MARKER_MEALS)
        .where('id', id)
        .select('id');

      if (markers.length > 0) {
        const marker = markers[0];
        await database(TABLE_MARKER_MEALS).where('id', marker.id).del();
        return { success: true, message: Messages.MARKER_MEAL_DELETED };
      } else {
        return { success: false, message: Messages.NOTHING_FOUND };
      }
    } catch (error) {
      logger.error('Error MarkerMealDAO.deleteById');
      throw new Error(Messages.ERROR);
    }
  }
}
