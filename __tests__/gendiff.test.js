import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getParseFile } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('testing parse', () => {
  const file1 = readFile('file1.json');
  expect(getParseFile(file1)).toBeTruthy();
});

test('getting diff to string', () => {
  const file1 = readFile('file1.json');
  const file2 = readFile('file2.json');
  expect(getParseFile(file1, file2.json)).toEqual(readFile('expectFileStylish.txt'));
});
