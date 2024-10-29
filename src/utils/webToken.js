/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import env from '../envSchema.js';
/**
 * WebToken.
 */
export default class WebToken {
  /**
   * Gets the user id from a web token.
   * @param {string} token The JWT token where the id will be extracted from.
   * @return {number} The user id.
   */
  static getUserIdFromWebToken = (token) => {
    token = token.split(' ')[1];
    return jwt.verify(token, env.SECRET_KEY).id;
  };
}