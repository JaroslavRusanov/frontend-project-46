import _ from 'lodash';
import getParseFile from './parsers.js';
import stylish from './formater.js';

export default (path1, path2) => {
  const file1 = getParseFile(path1);
  const file2 = getParseFile(path2);

  const iter = (data1, data2) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const sortedKeysOfAll = _.uniq(keys1.concat(keys2)).sort();

    const tree = sortedKeysOfAll.reduce((acc, key) => {
      acc[key] = {
        changing: undefined,
        value1: undefined,
        value2: undefined,
      };
      if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
        acc[key].changing = 'deleted';
        acc[key].value1 = data1[key];
      }
      if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
        acc[key].changing = 'added';
        acc[key].value2 = data2[key];
      }
      if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
        acc[key].changing = 'both';
        if (_.isObject(data1[key]) && _.isObject(data2[key])) {
          acc[key] = iter(data1[key], data2[key]);
        } else if (data1[key] === data2[key]) {
          acc[key].changing = 'unchanged';
          acc[key].value1 = data1[key];
        } else {
          acc[key].value1 = data1[key];
          acc[key].value2 = data2[key];
        }
      }
      return acc;
    }, {});
    // console.log(tree)
    return tree;
  };
  const result = iter(file1, file2);
  return stylish(result);
};
