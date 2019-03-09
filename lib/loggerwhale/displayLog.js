const moment = require('moment');
const util = require('util');
const textDecorator = require('./textDecorator.js');

const templateRegExp = /%%|%t|%afp|%rfp|%ft|%st|%llt|%ffn|%sfn|%l|%c/g;

const displayLog = function displayLog(options, text, level, styles) {
  const config = options.config;
  if (typeof level !== 'number') throw new Error('Level must be a number.');
  if (
    (typeof config.minLevel === 'function' && !config.minLevel(level)) ||
    (typeof config.maxLevel === 'function' && !config.maxLevel(level)) ||
    (typeof config.minLevel === 'number' && level < config.minLevel) ||
    (typeof config.maxLevel === 'number' && level > config.maxLevel)
  ) return;
  if (typeof text === 'object') text = util.inspect(text);

  const time = Date.now();
  const insertions = {
  	'%%': '%',
  	'%t': text,
    '%afp': options.absoluteFilePath,
    '%rfp': options.relativeFilePath,
    '%ft': moment(time).format(config.timeFormat),
    '%st': time - options.startTime,
    '%llt': time - (options.lastLogTime ? options.lastLogTime : time),
    '%ffn': options.fullFileName,
    '%sfn': options.simplifiedFileName,
    '%l': level,
    '%c': options.counter,
  };
  let lastIndex = 0;
  let log = '';
  let match;

  while (match = templateRegExp.exec(config.template)) {
  	log += config.template.slice(lastIndex, match.index);
  	log += insertions[match[0]];
  	lastIndex = templateRegExp.lastIndex;
  }

  log = textDecorator(log, styles);
  process.stdout.write(`${log}\r\n`);

  options.lastLogTime = time;
  options.counter += 1;
};

module.exports = displayLog;
