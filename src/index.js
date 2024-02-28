import fs from 'fs';
import _ from 'lodash';
import getParseFile from './parsers.js';
import writeDiff from './formatters/index.js';
import dataTree from './diffTree.js';

export const getDataFromFile = (path) => {
  const absPathFile = fs.realpathSync(path);
  const fileData = fs.readFileSync(absPathFile, 'utf-8');
  const fileExtension = _.last(absPathFile.split('.'));
  return getParseFile(fileData, fileExtension);
};

export default (filepath1, filepath2, formatName) => {
  const file1 = getDataFromFile(filepath1);
  const file2 = getDataFromFile(filepath2);
  const data = dataTree(file1, file2);
  return writeDiff(data, formatName);
};
