import Joi                 from 'joi';
import yamlParser          from 'yamljs';
import createJoiInProperty from './property';

const json = {};

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

export default (input) => {
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
