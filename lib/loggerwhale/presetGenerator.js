const displayLog = require('./displayLog.js');

const presetGenerator = function presetGenerator(options) {
  return function (log, defaultLevel = 0, presetStyles = '') {
    if (log) {
      return function (text = '', level = defaultLevel, styles = '') {
        displayLog(options, text, level, `${presetStyles} ${styles}`);
        return log;
      };
    }  else {
      return function log(text = '', level, styles = '') {
        level = level || defaultLevel;
        displayLog(options, text, level, `${presetStyles} ${styles}`);
        return log;
      };
    }

  };
};

module.exports = presetGenerator;
