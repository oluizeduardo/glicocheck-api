import knex from 'knex';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import logger from '../loggerUtil/logger.js';
import env from '../envSchema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const environment = env.ENVIRONMENT;
let dbConfig;

if(environment === 'dev'){  
  dbConfig = {
    client: 'sqlite3',
    connection: {
      filename: join(__dirname, `./${environment}/glicocheck_db.sqlite`),
    },
    useNullAsDefault: true,
  };
}

if(environment === 'prod'){  
  const connectionString = env.DATABASE_URL;
  
  if(!connectionString){
    logger.error('Could not load the database connection url.');
  }
  
  dbConfig = {
    client: 'pg', 
    connection: {
      connectionString,
      ssl: { rejectUnauthorized: false } 
    },
    pool: { min: 0, max: 2 }
  };
}

logger.info(`Glicocheck API using database client [${dbConfig.client}].`);

const db = knex(dbConfig);

export default db;


