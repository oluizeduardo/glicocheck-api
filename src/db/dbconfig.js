/* eslint-disable no-undef */
import knex from 'knex';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const environment = process.env.ENVIRONMENT;
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
  dbConfig = {
    client: 'pg', 
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ssl: { rejectUnauthorized: false } 
    }  
  };
}

const db = knex(dbConfig);

export default db;


