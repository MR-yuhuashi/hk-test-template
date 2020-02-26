
/**
 * 将数字格式化为特定补充符的字符串
 * 适用于补0操作
 * @param {*} num 原始数字
 * @param {*} len 格式化的数字长度
 * @param {*} flag 剩余补充符
 */
const formatNum = (num, len = 3, flag = '0') => {
  num = parseInt(num, 10);
  if (isNaN(num)) {
    num = 0;
  }

  const str = num === 0 ? '' : num.toString();
  const lastLen = len - str.length;
  // 不需要修饰
  if (lastLen <= 0) {
    return str;
  }
  flag = flag.toString();
  return flag.repeat(lastLen) + str;
};


export {
  formatNum,
};
