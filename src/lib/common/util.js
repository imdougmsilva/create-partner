const isProductionEnv = () => process.env.NODE_ENV === 'production';
const buildResponseError = (code, details, statusCode) => ({
  code,
  statusCode: statusCode || (details && details.statusCode) || 424,
  details,
});
const enableBigTrace = () => process.env.BIG_TRACE || false;
const isTestEnv = () => process.env.NODE_ENV === 'test';
const util = {
  isProductionEnv,
  isTestEnv,
  buildResponseError,
  enableBigTrace,
};

export default util;
