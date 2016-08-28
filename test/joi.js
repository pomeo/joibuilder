import should     from 'should';
import assert     from 'assert';
import joibuilder from '../lib/';
import yamlParser from 'yamljs';
import Joi        from 'joi';

const formalSchema = Joi.object().keys({
  id: Joi.number().integer().required(),
  name: Joi.string().min(1).max(80).trim(),
  email: Joi.string().email(),
  user_id: Joi.array(),
  stats: Joi.object({
    downloads: Joi.number().integer(),
    cleanses: Joi.number().integer(),
    imports: Joi.number().integer(),
  }),
  meta: Joi.any(),
  schema: Joi.object().optional()
});

it('Should be equal two Joi objects(yaml parsed)', () => {
  const json = yamlParser.load('test/file.yml').columns;
  const fromYamlSchema = joibuilder.build(json);
  assert.deepEqual(JSON.parse(JSON.stringify(formalSchema)),
                   JSON.parse(JSON.stringify(fromYamlSchema)));
});

it('Should be equal two Joi objects(file)', () => {
  const fromYamlSchema = joibuilder.build('test/file.yml');
  assert.deepEqual(JSON.parse(JSON.stringify(formalSchema)),
                   JSON.parse(JSON.stringify(fromYamlSchema)));
});

// Deep equal comparison fails when objects contain function

// const obj1 = {
//   test: function () {},
//   prop: 'prop',
// };
// const obj2 = {
//   test: function () {},
//   prop: 'prop',
// };

// assert.deepEqual(obj1, obj2);
// always fail

// That's why used JSON.stringify
