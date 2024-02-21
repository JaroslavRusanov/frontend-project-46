import _ from 'lodash';

export default (data, replacer = ' ', spacesCount = 4) => {
  const iter = (currentData, depth) => {
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const diffIndent = replacer.repeat(indentSize - 2);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    if (!_.isObject(currentData)) {
      return `${currentData}`;
    }
    const lines = Object.entries(currentData).map(([key, val]) => {
      switch (val.changing) {
        case 'both':
          return `${diffIndent}- ${key}: ${iter(val.value1, depth + 1)}\n${diffIndent}+ ${key}: ${iter(val.value2, depth + 1)}`;
        case 'deleted':
          return `${diffIndent}- ${key}: ${iter(val.value, depth + 1)}`;
        case 'added':
          return `${diffIndent}+ ${key}: ${iter(val.value, depth + 1)}`;
        case 'unchanged':
          return `${diffIndent}  ${key}: ${iter(val.value, depth + 1)}`;
        default:
          return `${currentIndent}${key}: ${iter(val, depth + 1)}`;
      }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(data, 1);
};
