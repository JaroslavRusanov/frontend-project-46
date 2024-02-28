import _ from 'lodash';

const getSortedKeys = (data1, data2) => {
  const commonKeys = _.union(_.keys(data1), _.keys(data2));
  return _.sortBy(commonKeys);
};

export default (file1, file2) => {
  const iter = (data1, data2) => {
    const tree = getSortedKeys(data1, data2).reduce((acc, key) => {
      const newAcc = { ...acc };
      if (!Object.hasOwn(data2, key)) {
        newAcc[key] = { changing: 'deleted', value: data1[key] };// eslint-disable-line
      }
      if (!Object.hasOwn(data1, key)) {
        newAcc[key] = { changing: 'added', value: data2[key] };// eslint-disable-line
      }
      if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
        if (_.isObject(data1[key]) && _.isObject(data2[key])) {
          newAcc[key] = iter(data1[key], data2[key]);// eslint-disable-line
        } else if (data1[key] === data2[key]) {
          newAcc[key] = { changing: 'unchanged', value: data1[key] };// eslint-disable-line
        } else {
          newAcc[key] = { changing: 'changed', value1: data1[key], value2: data2[key] };// eslint-disable-line
        }
      }
      return newAcc;
    }, {});
    return tree;
  };
  return iter(file1, file2);
};
