import build from './build';

class Joibuilder {
  build(yaml) {
    return build(yaml);
  }
}

export default new Joibuilder();
