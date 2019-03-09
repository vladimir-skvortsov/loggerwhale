const chalk = require('chalk');

const textDecorator = function textDecorator(text, styles) {
  styles = styles.trim();
  if (!styles) return text;

  const splitedStyles = styles.match(/[a-z]+/ig);
  if (!splitedStyles) throw new Error(`Uncorrect styles: ${styles}`);

  let style = chalk;

  splitedStyles.forEach(styleName => {
    if (!chalk[styleName]) throw new Error(`Unexpected style ${styleName}.`);
    style = style[styleName];
  });

  return style(text);
};

module.exports = textDecorator;
