import winston from "winston";
import WinstonCloudwatch from "winston-cloudwatch";
import winstonDayily from "winston-daily-rotate-file";
import packageJason from "../package.json";
import config from "./index";

const logDir = `logs`;

const { combine, timestamp, printf } = winston.format;

/*
 * VLING LOG FORMAT
 * 2021-11-09T08:39:44.830Z [vling_payment:prod] verbose: Router.payments.get
 * 2021-11-09T08:39:44.830Z [vling_payment:prod] info: userId: e954d338-0bdb-4635-bd07-d40cfebf8852
 * 2021-11-09T09:01:45.242Z [vling_payment:prod] http: RES GET pay.vling.net /geo lang: ko,en;q=0.9,en-US;q=0.8 clientip: 220.76.193.38 useragent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36 Edg/95.0.1020.40 elapsed: 917.92ms
 */

const logFormat = printf((info) => {
  return `${info.timestamp} [${packageJason.name}] ${info.level}: ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    new winstonDayily({
      level: "verbose",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    new winstonDayily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error",
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

const { awsEnv } = config;

const cloudwatchConfig = {
  logGroupName: awsEnv.logGroup,
  logStreamName: `${awsEnv.logGroup}-${process.env.NODE_ENV}`,
  awsConfig: {
    awsAccessKeyId: awsEnv.accessKeyId,
    awsSecretKey: awsEnv.secretAccessKey,
    awsRegion: awsEnv.region,
  },
  formatLog: function (info) {
    return `${info.timestamp} [${packageJason.name}] ${info.level}: ${info.message}`;
  },
};

logger.add(new WinstonCloudwatch(cloudwatchConfig));

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export { logger };
