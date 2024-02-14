import {randomUUID} from 'crypto';

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
}
