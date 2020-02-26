

const isArray = (source) => {
  if (Array.isArray) return Array.isArray(source);
  return source instanceof Array;
};

/** 通过key和value查询对象 */
const findByKey = (arr, key, val) => {
  if (!(arr instanceof Array)) {
    return null;
  }

  return arr.find(item => item[key] === val);
};

/**
 * @desc: 根据数组属性进行排序，默认正序
 * @param {Array}  array 原数组
 * @param {String} sortKey 数组属性 [可选]
 * @param {String} order 数组属性 [可选] [默认：asc正序]
 * @return {Array}
 */
const sortArrayByKey = (array, sortKey, order = 'asc') => {
  const ret = array.concat([]);
  ret.sort((item1, item2) => {
    let val1 = item1;
    let val2 = item2;
    if (sortKey) {
      val1 = val1[sortKey];
      val2 = val2[sortKey];
    }
    if (val1 > val2) {
      return order === 'asc' ? 1 : -1;
    } if (val1 < val2) {
      return order === 'asc' ? -1 : 1;
    }
    return 0;
  });
  return ret;
};

const hasSameItem = (arr1, arr2, item) => {
  const inArr1 = arr1.find(val => val === item);

  const inArr2 = arr2.find(val => val === item);

  return inArr1 && inArr2;
};

export {
  isArray,
  findByKey,
  sortArrayByKey,
  hasSameItem,
};
