const Log = require('./loggerwhale/Log.js');

const loggerwhale = function loggerwhale() {
  delete require.cache[__filename];

  return new Log(module);
};

module.exports = loggerwhale();
