import { format as _format, transports as _transports, createLogger } from 'winston';
import { hostname } from 'os';
import dotenv from 'dotenv';
import util from './util';

import { version } from '../../package.json';


dotenv.config();

const host = hostname();
const transports = [];

const levelMapper = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warn: 4,
  notice: 5,
  info: 6,
  debug: 7,
};

const format = _format(info => Object.assign({}, info, {
  timestamp: Date.now(),
  full_message: info.message,
  short_message: info.message,
  host,
  level: levelMapper[process.env.LOG_LEVEL],
  _application: 'search-location',
  _environment: process.env.NODE_ENV,
  _log_type: 'application',
  _app_version: version,
  _body: info.body || '',
}));

if (util.isProductionEnv()) {
  // eslint-disable-next-line no-console
  console.log('Log Production Env');
}
transports.push(new _transports.Console({
  level: process.env.LOG_LEVEL || 'debug',
  silent: util.isTestEnv(),
}));


const logger = createLogger({
  format: _format.combine(
    format(),
    _format.json(),
  ),
  transports,
});

export default logger;
