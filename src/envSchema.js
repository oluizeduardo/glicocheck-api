/* eslint-disable no-undef */
import { z } from 'zod';

const portSchema = z
  .string()
  .transform(Number)
  .refine((port) => port > 0 && port < 65536, {
    message: 'Port must be between 1 and 65535.',
  });

const envSchema = z.object({
  PORT: portSchema,
  BASE_URL: z.string().url(),
  URL_GLICOCHECK_HOME_PAGE: z.string().url(),
  ENVIRONMENT: z.enum(['dev', 'prod']),
  DATABASE_URL: z.string().url(),
  SECRET_KEY: z.string().min(1, 'SECRET_KEY cannot be empty'),

  EMAIL_PORT: portSchema,
  EMAIL_HOST: z.string().min(1, 'EMAIL_HOST cannot be empty'),
  EMAIL_USER: z.string().email({ message: 'Invalid email address' }),
  EMAIL_PASS: z.string().min(1, 'EMAIL_PASS cannot be empty'),
  EDAMAM_APP_ID: z.string().min(1, 'EDAMAM_APP_ID cannot be empty'),
  EDAMAM_APP_KEY: z.string().min(1, 'EDAMAM_APP_KEY cannot be empty'),

  HOURS_TO_KEEP_TOKEN_IN_REJECT_LIST: z.coerce
    .number()
    .int()
    .min(1, { message: 'Must be greater than or equal to 1.' }),

  CRON_TASK_CLEAN_REJECT_LIST_TABLE: z
    .string()
    .length(9, { message: 'Must be exactly 9 characters long' }),

  API_REQUEST_RATE_LIMIT_MINUTES: z.coerce
    .number()
    .int()
    .min(1, { message: 'Must be greater than or equal to 1.' }),

  API_REQUEST_RATE_LIMIT_MAX_TRIES: z.coerce
    .number()
    .int()
    .min(1, { message: 'Must be greater than or equal to 1.' }),
});

const env = envSchema.parse(process.env);

export default env;
