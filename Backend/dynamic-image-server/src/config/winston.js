import winston from 'winston';
import WinstonCloudwatch from 'winston-cloudwatch';
import winstonDaily from 'winston-daily-rotate-file';
import packageJson from '../../package.json';
import { envConfig } from './index';

const logDir = 'logs';
const { combine, timestamp, printf } = winston.format;

const logFormat = printf((info) => {
  return `${info.timestamp} [${packageJson.name}:${process.env.NODE_ENV}] ${info.level}: ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat
  ),
  transports: [
    new winstonDaily({
      level: 'verbose',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error',
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

const { awsEnv } = envConfig;

const cloudWatchConfig = {
  level: 'verbose',
  logGroupName: awsEnv.logGroup,
  logStreamName: `${awsEnv.logGroup}-${process.env.NODE_ENV}`,
  awsAccessKey: awsEnv.accessKeyId,
  awsSecretKey: awsEnv.secretAccessKey,
  awsRegion: awsEnv.region,
  messageFormatter: (info) =>
    `${info.timestamp} [${packageJson.name}:${process.env.NODE_ENV}] ${info.level}: ${info.message}`,
};

logger.add(new WinstonCloudwatch(cloudWatchConfig));

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      level: 'verbose',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export { logger };
