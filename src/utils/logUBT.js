const logUBT = (key, value) => {
  try {
    let _value = value || {};
    if (typeof _value === 'string') {
      _value = {
        msg: _value,
      };
    }

    // 当前登陆者信息
    if (typeof __im_current_user__ !== 'undefined') {
      _value.vendor = {
        uid: __im_current_user__.ctripUid,
        name: __im_current_user__.nickname || __im_current_user__.nickname,
      };
    }

    if (typeof value !== 'string') {
      _value = JSON.stringify(value);
    }
    setTimeout(() => {
      window.__bfi.push(['_tracklog', key, JSON.stringify(_value)]);
    }, 0);
  } catch (ex) {
  }
};

/** 日志记录 */
const UBTTypeEnum = {
  AJAX_ERROR: '103390', // 接口异常
};

export { logUBT, UBTTypeEnum };
