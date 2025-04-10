import winston from 'winston';
import 'winston-mongodb';
import { DotenvConfig } from '../config/env.config';
const { timestamp, json } = winston.format;

export const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

export enum LEVEL {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  HTTP = 'HTTP',
  VERBOSE = 'VERBOSE',
  DEBUG = 'DEBUG',
  SILLY = 'SILLY',
}

const metadataOnlyFormat = winston.format((info) => {
  const log: winston.Logform.TransformableInfo = {
    level: info.level,
    message: info.message,
    ...(info.metadata || {}),
  };

  return log;
})();

const mongoTransport = new winston.transports.MongoDB({
  level: 'info',
  db: DotenvConfig.MONGO_URL as string,
  collection: 'user_actions',
  capped: true,
  cappedSize: 10 * 1024 * 1024,
  format: metadataOnlyFormat,
  storeHost: false,
});

const transports = [
  new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
  new winston.transports.File({ filename: 'log/combined.log' }),
  mongoTransport,
];

export const Logger = winston.createLogger({
  levels: levels,
  format: winston.format.combine(timestamp(), json()),
  transports,
});
