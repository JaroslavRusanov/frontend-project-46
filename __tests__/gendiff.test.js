import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { genDiff, getParseFile } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('testing parse', () => {
  const filePath = getFixturePath('file1.json');
  expect(getParseFile(filePath)).toBeTruthy();
});

test('getting diff to string', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  expect(genDiff(filePath1, filePath2)).toEqual(readFile('expectFileStylish.txt'));
});
