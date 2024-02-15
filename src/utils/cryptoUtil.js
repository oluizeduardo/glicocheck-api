import {randomUUID} from 'crypto';
import { v5 as uuidv5 } from 'uuid';

/**
 * CryptoUtil.
 */
export default class CryptoUtil {
  /**
   * Creates a new hexadecimal random token.
   * @return {string} A new token.
   */
  static createRandomUUID() {
    return randomUUID();
  }

  /**
   * Creates a new hexadecimal random token based on a given string.
   * @return {string} A new token.
   */
  static createUUIDFromString(text) {
    return uuidv5(text, uuidv5.URL);
  }
}
