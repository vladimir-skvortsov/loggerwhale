const util = require('util');
const presetGenerator = require('./presetGenerator.js');
const checkNewConfig = require('./checkNewConfig.js');

const reservedProperties = ['config', 'resetCounter', 'addPreset'];
const defaultConfig = {
  template: '%t',
  minLevel: 0,
  maxLevel: Infinity,
  timeFormat: 'M/D/YY H:mm:ss:SSS A',
};

const Log = function Log(module) {
  const options = {
    config: {...defaultConfig},
  };
  const logPreset = presetGenerator(options);

  options.absoluteFilePath = module.parent.filename;
  options.startTime = Date.now();
  options.lastLogTime = null;
  options.counter = 0;

  for (let i = 0; i < options.absoluteFilePath.length; i += 1) {
    if (options.absoluteFilePath[i] !== module.filename[i]) {
      options.relativeFilePath = options.absoluteFilePath.slice(i);
      break;
    }
  }

  options.fullFileName = options.relativeFilePath.split(/[\/\\]/).pop();
  options.simplifiedFileName = options.fullFileName.split('.').shift();

  const log = logPreset();

  log.log = log;
  log.info = logPreset(log, 1, 'blueBright');
  log.warn = logPreset(log, 2, 'underline yellowBright');
  log.error = logPreset(log, 3, 'redBright');
  log.success = logPreset(log, 3, 'greenBright');
  log.done = logPreset(log, 4, 'green');

  log.resetCounter = function resetCounter(value) {
    if (value && typeof value !== 'number') throw new Error('New counter value mast be a number.');
    value ? (options.counter = value) : (options.counter = 0);
    return log;
  };
  log.addPreset = function addPreset(name, defaultLevel, presetStyles) {
    if (reservedProperties.includes(name)) {
      throw new Error(`Name ${name} is reserved.`);
    }
    log[name] = logPreset(log, defaultLevel, presetStyles);
    return log;
  };

  Object.defineProperty(log, 'config', {
    set(newConfig) {
      checkNewConfig(newConfig);

      if (newConfig.template) options.config.template = newConfig.template;
      if (newConfig.minLevel) options.config.minLevel = newConfig.minLevel;
      if (newConfig.maxLevel) options.config.maxLevel = newConfig.maxLevel;
      if (newConfig.timeFormat) options.config.timeFormat = newConfig.timeFormat;

      return log;
    },
    get() {
      return {...options.config};
    },
  });
  Object.defineProperty(log, 'defaultConfig', {
    set(newConfig) {
      checkNewConfig(newConfig);

      if (newConfig.template) defaultConfig.template = newConfig.template;
      if (newConfig.minLevel) defaultConfig.minLevel = newConfig.minLevel;
      if (newConfig.maxLevel) defaultConfig.maxLevel = newConfig.maxLevel;
      if (newConfig.timeFormat) defaultConfig.timeFormat = newConfig.timeFormat;
      options.config = {...defaultConfig};

      return log;
    },
    get() {
      return {...defaultConfig};
    },
  });

  return log;
};

module.exports = Log;
