import Joi from 'joi';

export default (str, nodes) => {
  const output = {};
  if (nodes[3] !== undefined) {
    output.name = nodes[3];
  }
  let properties = str.split('.');
  let joiObj = Joi;
  properties.forEach(property => {
    let result = property.match(/\(\d*\)/i);
    let num = result[0].slice(1, result[0].length - 1);
    let name = property.substring(0, result.index);
    if (num !== '') {
      joiObj = joiObj[name](+num);
    } else {
      joiObj = joiObj[name]();
    }
  });
  output.value = joiObj;
  return output;
}
