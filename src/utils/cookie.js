/**
 * 设置cookie
 * @param {*} name
 * @param {*} value
 */
function setCookie(name, value) {
  const exp = new Date();
  exp.setTime(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()};path=/;`;
}

function setStorage(name, value) {
  window.localStorage.setItem(name, value);
}

function getStorage(name) {
  return window.localStorage.getItem(name);
}

function delStorage(name) {
  return window.localStorage.removeItem(name);
}
/**
 * 获取cookie
 * @param {*} name
 */
function getCookie(name) {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (arr) {
    return unescape(arr[2]);
  }
  return null;
}

/**
 * 删除cookie
 * @param {*} name
 */
function delCookie(name) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null) document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`;
}


/**
 * 获取cookie，服务端使用
 * @param {*} name cookie名
 * @param {*} req 请求体
 */
function getCookieServer(name, req) {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = req.headers.cookie.match(reg);
  if (req.headers.cookie && arr) {
    return unescape(arr[2]);
  }
  return null;
}

export {
  setCookie,
  getCookie,
  delCookie,
  getCookieServer,
  setStorage,
  getStorage,
  delStorage,
};
