export default (data, replacer = ' ', spacesCount = 4) => {
  const iter = (currentData, depth) => {
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const diffIndent = replacer.repeat(indentSize - 2);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentData)
      .map(([key, val]) => {
        const status = val.changing;
        switch (status) {
          case 'both':
            return `${diffIndent}- ${key}: ${val.value1}\n${diffIndent}+ ${key}: ${val.value2}`;
          case 'deleted':
            return `${diffIndent}- ${key}: ${val.value1}`;
          case 'added':
            return `${diffIndent}+ ${key}: ${val.value2}`;
          case 'unchanged':
            return `${diffIndent}  ${key}: ${val.value1}`;
          default:
            return `${currentIndent}${key}: ${iter(val, depth + 1)}`;
        }
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};
