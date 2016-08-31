const json = {};
const Joi                 = require('joi');
const yamlParser          = require('yamljs');
const createJoiInProperty = require('./property');

/**
 * Tail call to create Joi object
 *
 * @param {Object} obj Required
 * @param {?String} parentNode
 * @returns {Object}
 * @property {?String} name
 * @property {Object|Array} value
 */
function iterate(obj, parentNode) {
  parentNode = parentNode || '';
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      const node = parentNode + '/' + property;
      if (obj[property] instanceof Object) {
        iterate(obj[property], node);
      } else {
        const nodes = node.split('/');
        if (nodes[nodes.length - 1] === 'joi') {
          if (nodes.length <= 3) {
            json[nodes[1]] = createJoiInProperty(obj[property], nodes);
          } else {
            if (!(json[nodes[1]] instanceof Array)) {
              json[nodes[1]] = [];
            }
            json[nodes[1]].push(createJoiInProperty(obj[property], nodes));
          }
        }
      }
    }
  }
}

/**
 * Create Joi object
 *
 * @param {Object|String} input Required
 * @returns {Object}
 */
module.exports = function(input) {
  let yaml = input;
  if (input instanceof String) {
    yaml = yamlParser.load(input).columns;
  }
  iterate(yaml);
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
