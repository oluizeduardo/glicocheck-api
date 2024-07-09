/* eslint-disable no-undef */
import cron from 'node-cron';
import RejectListDAO from '../dao/RejectListDAO.js';
import logger from '../loggerUtil/logger.js';

const cleanUpTable = () => {
  const hours = process.env.HOURS_TO_KEEP_TOKEN_IN_REJECT_LIST || 1;
  RejectListDAO.deleteRegistersOlderThan(hours);
};

/**
 * Schedules a cron job to clean up the invalid token table at regular intervals.
 * 
 * The schedule is defined by the `CRON_TASK_CLEAN_REJECT_LIST_TABLE` environment variable.
 * If this variable is not set, the default schedule is to run at the top of every hour.
 * 
 * The cron job is configured to run in the 'America/Sao_Paulo' timezone.
 */
const executeInvalidTokenTableCleanupScheduler = () => {
  const cronCleanRejectList =
    process.env.CRON_TASK_CLEAN_REJECT_LIST_TABLE || '0 * * * *';

  cron.schedule(
    cronCleanRejectList,
    () => {
      logger.info('Executing Invalid Token Table Cleanup Scheduler.');
      cleanUpTable();
    },
    {
      timezone: 'America/Sao_Paulo',
    }
  );
};

export default executeInvalidTokenTableCleanupScheduler;
