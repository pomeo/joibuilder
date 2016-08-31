const Joi        = require('joi');
const yamlParser = require('yamljs');
const iterate    = require('./iterate');

/**
 * Create Joi object
 *
 * @param {Object|String} input Required
 * @returns {Object}
 */
module.exports = function(input) {
  let yaml = input;
  if (typeof yaml === 'string') {
    yaml = yamlParser.load(input).columns;
  }
  const json = iterate(yaml, '', {}, Object.keys(yaml).length);
  const output = {};
  for (const property in json) {
    if (json.hasOwnProperty(property)) {
      if (json[property] instanceof Array) {
        const obj = {};
        json[property].forEach(prop => {
          obj[prop.name] = prop.value;
        });
        output[property] = Joi.object(obj);
      } else {
        output[property] = json[property].value;
      }
    }
  }
  return Joi.object().keys(output);
};
