import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('testing stylish JSON and YAML', () => {
  const filePathJSON1 = getFixturePath('file1.json');
  const filePathYAML2 = getFixturePath('file2.yaml');
  expect(genDiff(filePathJSON1, filePathYAML2, 'stylish')).toEqual(readFile('expectFileStylish.txt'));
});

test('testing stylish JSON default', () => {
  const filePathJSON1 = getFixturePath('file1.json');
  const filePathJSON2 = getFixturePath('file2.json');
  expect(genDiff(filePathJSON1, filePathJSON2)).toEqual(readFile('expectFileStylish.txt'));
});

test('testing plain YAML', () => {
  const filePathYAML1 = getFixturePath('file1.yaml');
  const filePathYAML2 = getFixturePath('file2.yaml');
  expect(genDiff(filePathYAML1, filePathYAML2, 'plain')).toEqual(readFile('expectFilePlain.txt'));
});

test('testing json formatting', () => {
  const filePathYAML1 = getFixturePath('file1.yaml');
  const filePathYAML2 = getFixturePath('file2.yaml');
  expect(genDiff(filePathYAML1, filePathYAML2, 'json')).toEqual(readFile('diffJSON.txt'));
});
