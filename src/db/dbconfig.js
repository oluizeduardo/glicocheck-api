import knex from 'knex';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbConfig = {
  client: 'sqlite3',
  connection: {
    filename: join(__dirname, './glicocheck_db.sqlite'),
  },
  useNullAsDefault: true,
};

const db = knex(dbConfig);

export default db;


