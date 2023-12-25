import { realpathSync, readFileSync } from 'fs';

const getParseFile = (path) => {
  const absPathFile = realpathSync(path);
  if (!absPathFile.endsWith('json')) {
    return null;
  }
  return JSON.parse(readFileSync(absPathFile));
};

export default getParseFile;
