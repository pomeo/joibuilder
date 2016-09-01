const Joi = require('joi');

/**
 * @param {Object} str Required
 * @param {?String} nodes
 * @returns {Object}
 * @property {?String} name
 * @property {Object|Array} value
 */
module.exports = function(str, nodes) {
  const output = {};
  if (nodes[3] !== undefined) {
    output.name = nodes[3];
  }
  const properties = str.split('.');
  let joiObj = Joi;
  properties.forEach(property => {
    const result = property.match(/\(.*\)/i);
    const opt = result[0].slice(1, result[0].length - 1);
    const name = property.substring(0, result.index);
    if (opt === '') {
      joiObj = joiObj[name]();
    } else {
      if (isNaN(Number(opt))) {
        if (opt[0] === '/') {
          joiObj = joiObj[name](new RegExp(opt, 'gi'));
        } else if (opt[0] === '[') {
          joiObj = joiObj[name](JSON.parse(opt.replace(/'/g, '"')));
        } else {
          joiObj = joiObj[name](opt);
        }
      } else {
        joiObj = joiObj[name](Number(opt));
      }
    }
  });
  output.value = joiObj;
  return output;
};
