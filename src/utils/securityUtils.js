import pkg from 'bcryptjs';
const {compareSync, hashSync} = pkg;

/**
 * SecurityUtils.
 */
export default class SecurityUtils {

  /**
   * Compare two passwords in BCrypt format.
   * @param {string} password1 The first password.
   * @param {string} password2 The second password.
   * @return {boolean} true if are the same passwords. Return false otherwise.
   */
  static comparePassword = (password1, password2) => {
    return compareSync(password1, password2);
  };

  /**
   * Generates a hash value for the given string.
   * @param {string} s — String to hash.
   * @return {string} Resulting hash.
   */
  static generateHashValue = (s) => {
    return hashSync(s, 8);
  };
}
