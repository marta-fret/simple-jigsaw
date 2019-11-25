export const mapIndexes = (array1, array2) => {
  return array1.reduce((map, item, index) => {
    map[index] = array2.indexOf(item); // eslint-disable-line no-param-reassign
    return map;
  }, {});
};
