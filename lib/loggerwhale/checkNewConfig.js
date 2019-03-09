const checkNewConfig = function checkNewConfig(newConfig) {
  if (typeof newConfig !== 'object') {
    throw new Error(`Config must be an object. Recived ${typeof newConfig}.`);
  }
  Object.entries(newConfig).forEach(([property, value]) => {
    if (property === 'template' || property === 'timeFormat') {
      if (typeof value !== 'string') {
        throw new Error(`Property ${property} must be a string. Recived ${typeof value}.`);
      }
    } else if (property === 'minLevel' || property === 'maxLevel') {
      if (typeof value !== 'number' && typeof value !== 'function') {
        throw new Error(`Property ${property} must be a number or a function. Recived ${typeof value}.`);
      }
    } else {
      throw new Error(`Unexpected property ${property}.`);
    }
  });
};

module.exports = checkNewConfig;
