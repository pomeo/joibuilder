import Joi                 from 'joi';
import assert              from 'assert';
import createJoiInProperty from './property';
import util                from 'util';
import yamlParser          from 'yamljs';

let json = {};

function iterate(obj, parent_node) {
  parent_node = parent_node || '';
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      let node = parent_node + '/' + property;
      if (obj[property] instanceof Object) {
        iterate(obj[property], node)
      } else {
        let nodes = node.split('/');
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
  let output = {};
  for (let property in json) {
    if (json.hasOwnProperty(property)) {
      if (json[property] instanceof Array) {
        let obj = {};
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
}
