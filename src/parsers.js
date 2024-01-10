import fs from 'fs';
import yaml from 'js-yaml';

export default (path) => {
  const absPathFile = fs.realpathSync(path);
  if (absPathFile.endsWith('.json')) {
    return JSON.parse(fs.readFileSync(absPathFile, 'utf-8'));
  }
  return yaml.load(fs.readFileSync(absPathFile, 'utf-8'));
};
