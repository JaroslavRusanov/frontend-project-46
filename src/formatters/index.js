import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const writeDiff = (data, formatName = 'stylish') => {
  switch (formatName) {
    case ('plain'):
      return plain(data);
    case ('json'):
      return json(data);
    case ('stylish'):
      return stylish(data);
    default:
      throw new Error('unknown format');
  }
};

export default writeDiff;
