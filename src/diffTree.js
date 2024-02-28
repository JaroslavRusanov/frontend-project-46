import _ from 'lodash';

const getSortedKeys = (data1, data2) => {
  const commonKeys = _.union(_.keys(data1), _.keys(data2));
  return _.sortBy(commonKeys);
};

export default (file1, file2) => {
  const iter = (data1, data2) => {
    const tree = getSortedKeys(data1, data2).reduce((acc, key) => {
      let result = {};
      if (!Object.hasOwn(data2, key)) {
        result = { changing: 'deleted', value: data1[key] };
      }
      if (!Object.hasOwn(data1, key)) {
        result = { changing: 'added', value: data2[key] };
      }
      if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
        if (_.isObject(data1[key]) && _.isObject(data2[key])) {
          result = iter(data1[key], data2[key]);
        } else if (data1[key] === data2[key]) {
          result = { changing: 'unchanged', value: data1[key] };
        } else {
          result = { changing: 'changed', value1: data1[key], value2: data2[key] };
        }
      }
      acc[key] = result;
      return acc;
    }, {});
    return tree;
  };
  return iter(file1, file2);
};
