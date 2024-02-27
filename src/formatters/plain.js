import _ from 'lodash';

const stringifyValue = (currentData) => {
  if (_.isObject(currentData)) {
    return '[complex value]';
  } if (typeof currentData === 'string') {
    return `'${currentData}'`;
  }
  return currentData;
};

export default (data) => {
  const iter = (currentData, names) => {
    const lines = Object
      .entries(currentData)
      .map(([key, val]) => {
        switch (val.changing) {
          case 'changed':
            return `Property '${[...names, key].join('.')}' was updated. From ${stringifyValue(val.value1)} to ${stringifyValue(val.value2)}`;
          case 'deleted':
            return `Property '${[...names, key].join('.')}' was removed`;
          case 'added':
            return `Property '${[...names, key].join('.')}' was added with value: ${stringifyValue(val.value)}`;
          case undefined:
            return iter(val, [[...names, key].join('.')]);
          case 'unchanged':
            return null;
          default:
            throw new Error('error plain formatter');
        }
      })
      .filter((el) => el !== null);
    return [...lines].join('\n');
  };
  return iter(data, []);
};
