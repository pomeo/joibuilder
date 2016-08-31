const createJoiInProperty = require('./property');

/**
 * Tail call to create Joi object
 *
 * @param {Object} obj Required
 * @param {String} parentNode Required
 * @param {Object} json Required
 * @param {Number} num Required
 * @returns {Object}
 */
module.exports = function iterate(obj, parentNode, json, num) {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      const node = parentNode + '/' + property;
      if (obj[property] instanceof Object) {
        iterate(obj[property], node, json);
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
      if (num !== undefined) {
        num--;
      }
    }
  }
  if (num === 0) {
    return json;
  }
};
