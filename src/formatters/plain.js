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
          case 'both':
            return `Property '${[...names, key].join('.')}' was updated. From ${stringifyValue(val.value1)} to ${stringifyValue(val.value2)}`;
          case 'deleted':
            return `Property '${[...names, key].join('.')}' was removed`;
          case 'added':
            return `Property '${[...names, key].join('.')}' was added with value: ${stringifyValue(val.value)}`;
          case undefined:
            return iter(val, [[...names, key].join('.')]);
          default:
            return null;
        }
      })
      .filter((el) => el !== null);
    return [...lines].join('\n');
  };
  return iter(data, []);
};
