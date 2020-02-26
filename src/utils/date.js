import { formatNum } from './number';

/** 获取UTC时间的时间戳 */
const getUTCDate = (date) => {
  date = new Date(date);
  const offsetTime = date.getTimezoneOffset() * 60 * 1000;
  return date.getTime() + offsetTime; // UTC时间=当地时间+时差时间
};

/** 判断是否为date */
const isDate = o => Object.prototype.toString.call(o) === '[object Date]';

/** 通过时间获取展示时间
 * date：Long 时间
 * format:String 格式
 */
/** 格式化时间 */
const dateFormat = (date, fmt = 'yyyy-MM-dd hh:mm') => {
  if (!isDate(date)) {
    date = new Date(+date);
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) 
    { fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : formatNum(o[k], 2)); }
  }
  return fmt;
};

/** UTC 时间转为本地时间（接口返回的是标准时间戳，但需要展示为本地时间）
 * date：Long UTC时间
 * format:String 格式
 */
const dateFormatUTC = (utcDate, format = 'yyyy-MM-dd hh:mm') => {
  utcDate = new Date(utcDate);
  const offsetTime = utcDate.getTimezoneOffset() * 60 * 1000;
  utcDate = utcDate.getTime() - offsetTime;// 当地时间 = UTC时间 - 时差时间
  return dateFormat(utcDate, format);
};


/** 通过当前日期格式化展示时间
 * 今天显示【15:30】
 * 昨天显示【昨天15:30】
 * 今年显示【11-21 15:30】
 * 其他时间显示【2019-12-12 15:30】
 * date：Long UTC时间
 * format:String 格式
 */
const dateFormatNow = (date, type = 'UTC', format = 'yyyy-MM-dd hh:mm') => {
  const td = new Date(date);

  if (td instanceof Date) {
    const now = new Date();
    if (td.toDateString() === now.toDateString()) { // 今天
      return type !== 'UTC' ? dateFormat(td, 'hh:mm') : dateFormatUTC(td, 'hh:mm');
    } if (td.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString()) { // 昨天
      return `昨天 ${type}` !== 'UTC' ? dateFormat(td, 'hh:mm') : dateFormatUTC(td, 'hh:mm');
    } if (td.getFullYear() === now.getFullYear()) { // 今年
      return type !== 'UTC' ? dateFormat(td, 'MM-dd hh:mm') : dateFormatUTC(td, 'MM-dd hh:mm');
    }
    return dateFormatUTC(td, format);
  }
  return td;
};

export {
  getUTCDate,
  dateFormatUTC,
  dateFormat,
  dateFormatNow,
};
