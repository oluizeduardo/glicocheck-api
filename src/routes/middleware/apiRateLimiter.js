/* eslint-disable no-undef */
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
dotenv.config();

export default class RateLimiter {
  static getLimiter() {

    const rateLimitMinutes = process.env.API_REQUEST_RATE_LIMIT_MINUTES || 15;
    const rateLimitMaxTries = process.env.API_REQUEST_RATE_LIMIT_MAX_TRIES || 100;

    return rateLimit({
      windowMs: rateLimitMinutes * 60 * 1000,
      max: rateLimitMaxTries,
      message: `You have exceeded the limit of ${rateLimitMaxTries} requests in ${rateLimitMinutes} minutes.`,
      headers: false,
      skipFailedRequests: false
    });
  }
}
