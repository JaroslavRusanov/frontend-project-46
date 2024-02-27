import yaml from 'js-yaml';

export default (data, fileExtension) => {
  switch (fileExtension) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error('cant parsing file');
  }
};
