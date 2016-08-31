const build = require('./build');

class Joibuilder {
  build(yaml) {
    return build(yaml);
  }
}

module.exports = new Joibuilder();
