// We need this to use the ESM: import, export
// eslint-disable-next-line no-global-assign
require = require('esm')(module);
module.exports = require('./main.js').startApp();
