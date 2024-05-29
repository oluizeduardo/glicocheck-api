/* eslint-disable no-undef */
import knex from 'knex';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import dotenv from 'dotenv';
dotenv.config();
import logger from '../loggerUtil/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const databaseEnv = process.env.DATABASE_ENV;

logger.info(`DATABASE ENVIRONMENT: ${databaseEnv}.`);

const dbConfig = {
  client: 'sqlite3',
  connection: {
    filename: join(__dirname, `./${databaseEnv}/glicocheck_db.sqlite`),
  },
  useNullAsDefault: true,
};

const db = knex(dbConfig);

export default db;


