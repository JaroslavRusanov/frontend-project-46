import _ from 'lodash';
import getParseFile from './parsers.js';

export default (path1, path2) => {
  const fileFirst = getParseFile(path1);
  const fileSecond = getParseFile(path2);

  const keys1 = Object.keys(fileFirst);
  const keys2 = Object.keys(fileSecond);
  const sortedKeysOfAll = _.uniq(keys1.concat(keys2)).sort();

  const result = sortedKeysOfAll.map((key) => {
    let str = '';
    if (keys1.includes(key) && keys2.includes(key)) {
      if (fileFirst[key] === fileSecond[key]) {
        str += `    ${key}: ${fileFirst[key]}`;
      } else {
        str += `  - ${key}: ${fileFirst[key]}\n`;
        str += `  + ${key}: ${fileSecond[key]}`;
      }
    }
    if (keys1.includes(key) && !keys2.includes(key)) {
      str += `  - ${key}: ${fileFirst[key]}`;
    }
    if (!keys1.includes(key) && keys2.includes(key)) {
      str += `  + ${key}: ${fileSecond[key]}`;
    }
    return str;
  });
  return `{\n${result.join('\n')}\n}`;
};
