import _ from 'lodash';
import getParseFile from './parsers.js';

const getSortedKeys = (data1, data2) => _.uniq(Object.keys(data1)
  .concat(Object.keys(data2))).sort();

export default (path1, path2) => {
  const file1 = getParseFile(path1);
  const file2 = getParseFile(path2);
  const iter = (data1, data2) => {
    const tree = getSortedKeys(data1, data2).reduce((acc, key) => {
      acc[key] = {};
      if (!Object.hasOwn(data2, key)) {
        acc[key].changing = 'deleted';
        acc[key].value = data1[key];
      }
      if (!Object.hasOwn(data1, key)) {
        acc[key].changing = 'added';
        acc[key].value = data2[key];
      }
      if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
        acc[key].changing = 'both';
        if (_.isObject(data1[key]) && _.isObject(data2[key])) {
          acc[key] = iter(data1[key], data2[key]);
        } else if (data1[key] === data2[key]) {
          acc[key].changing = 'unchanged';
          acc[key].value = data1[key];
        } else {
          acc[key].value1 = data1[key];
          acc[key].value2 = data2[key];
        }
      }
      return acc;
    }, {});
    return tree;
  };
  return iter(file1, file2);
};
