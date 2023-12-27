import { realpathSync, readFileSync } from 'fs';
import _ from 'lodash';

const getParseFile = (path) => {
  const absPathFile = realpathSync(path);
  if (!absPathFile.endsWith('.json')) {
    return null;
  }
  return JSON.parse(readFileSync(absPathFile));
};

const genDiff = (path1, path2) => {
  const file1 = getParseFile(path1);
  const file2 = getParseFile(path2);

  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const sortedKeysOfAll = _.uniq(keys1.concat(keys2)).sort();

  const result = sortedKeysOfAll.map((key) => {
    let str = '';
    if (keys1.includes(key) && keys2.includes(key)) {
      if (file1[key] === file2[key]) {
        str += `    ${key}: ${file1[key]}`;
      } else {
        str += `  - ${key}: ${file1[key]}\n`;
        str += `  + ${key}: ${file2[key]}`;
      }
    }
    if (keys1.includes(key) && !keys2.includes(key)) {
      str += `  - ${key}: ${file1[key]}`;
    }
    if (!keys1.includes(key) && keys2.includes(key)) {
      str += `  + ${key}: ${file2[key]}`;
    }
    return str;
  });
  return `{\n${result.join('\n')}\n}`;
};

export { getParseFile, genDiff };
