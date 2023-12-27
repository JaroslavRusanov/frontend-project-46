import { getParseFile } from '../src/index.js';

test('testing parse', () => {
  expect(getParseFile('./src/file1.json')).toBeTruthy();
});
