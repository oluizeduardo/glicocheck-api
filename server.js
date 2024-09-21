// /* eslint-env node*/
import { readFile } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import logger from './src/loggerUtil/logger.js';
import executeInvalidTokenTableCleanupScheduler from './src/service/invalidTokenTableCleanupScheduler.js';
import server from './src/api/api.js';

// Get the app version from package.json.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const data = await readFile(`${__dirname}/package.json`, 'utf-8');
const packageJson = JSON.parse(data);
const appVersion = packageJson.version;

const port = process.env.PORT || 3000;
const environment = process.env.ENVIRONMENT || 'dev';

server.listen(port, () => {
  logger.info(`Glicocheck API [v${appVersion}] running on port [${port}] with profile [${environment}].`);
});

executeInvalidTokenTableCleanupScheduler();
