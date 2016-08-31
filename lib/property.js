const Joi = require('joi');

/**
 * @param {Object} str Required
 * @param {?String} nodes
 * @returns {Object}
 */
module.exports = function(str, nodes) {
  const output = {};
  if (nodes[3] !== undefined) {
    output.name = nodes[3];
  }
  const properties = str.split('.');
  let joiObj = Joi;
  properties.forEach(property => {
    const result = property.match(/\(\d*\)/i);
    const num = result[0].slice(1, result[0].length - 1);
    const name = property.substring(0, result.index);
    if (num === '') {
      joiObj = joiObj[name]();
    } else {
      joiObj = joiObj[name](Number(num));
    }
  });
  output.value = joiObj;
  return output;
};
