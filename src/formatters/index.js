import genDiff from '../diffTree.js';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const writeDiff = (filepath1, filepath2, formatName = 'stylish') => {
  if (formatName === 'plain') {
    return plain(genDiff(filepath1, filepath2));
  }
  if (formatName === 'json') {
    return json(genDiff(filepath1, filepath2));
  }
  return stylish(genDiff(filepath1, filepath2));
};

export default writeDiff;
