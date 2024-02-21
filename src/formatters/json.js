export default (data) => JSON.stringify(data);

// const iter = (currentData, depth) => {
//   const indentSize = depth * spacesCount;
//   const currentIndent = replacer.repeat(indentSize);
//   const bracketIndent = replacer.repeat(indentSize - spacesCount);
//   if (!_.isObject(currentData)) {
//     return _.isString(currentData) ? `"${currentData}"` : `${currentData}`;
//   }
//   const lines = Object.entries(currentData).map(([key, val]) => {
//     return `${currentIndent}"${key}": ${iter(val, depth + 1)}`;
//   });
//   return ['{', ...lines, `${bracketIndent}}`].join('\n');
// };
// // console.log(JSON.parse(iter(data, 1)));
// return iter(data, 1);
