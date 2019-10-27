import util from '../util';
import logger from '../logger';

const PartnerError = require('./types/PartnerError');

const prepareResponse = async (res, status, message, stack) => {
  logger.error(`status ${status}: ${message}`);
  res.status(status);
  res.json({
    message,
    status,
    stack: util.isProductionEnv() ? null : stack,
  });
};

/* eslint-disable no-unused-vars */
const ErrorHandler = (error, req, res, next) => {
  /* eslint-enable no-unused-vars */
  if (error instanceof PartnerError) {
    const { status } = { ...error.extra } || 500;
    return prepareResponse(res, status, error.message, error.stack);
  }

  return prepareResponse(res, 500, error.message, error.stack);
};

export {
  ErrorHandler,
  prepareResponse,
};
