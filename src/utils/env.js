/**
 * 获取当前环境
 * @return {string} 0:测试 1:堡垒 2:UAT 3:LPT 4:生产
 */
export const getEnvCode = (options) => {
  if (typeof window !== "undefined") {
    const { host } = window.location;

    if (host.match(/\.ctrip\.com/i)) {
      return 4; // 生产
    } if (host.match(/\.uat\.qa/i)) { // uat
      return 2;
    } if (host.match(/(\.fws|\.fat|\.lpt|localhost|172\.16|127\.0)/i)) { // 0测试
      return 0;
    }
    return 4; // 生产
  }
  if (options && options.envObj && options.envObj.env) {
    const env = options.envObj.env.toLowerCase();
    if (env === "fat") {
      return 0;
    } if (env === "uat") {
      return 2;
    }
    return 4;
  }
  return 4; // 生产
};


/**
 * 根据环境获取域名
 * @param {Int} 环境
 * @return {String} 域名 */
export const getwayDomain = (envcode) => {
  switch (envcode) {
    case 0:/** 测试 */
      return 'gateway.m.fws.qa.nt.ctripcorp.com';
    case 1:/** 堡垒 */
      return '10.8.14.28:8080';
    case 2:/** uat */
      return 'gateway.m.uat.qa.nt.ctripcorp.com';
    case 3:/** lpt */
      return 'gateway.m.lpt.qa.nt.ctripcorp.com';
    case 4:/** prd */
      return 'm.ctrip.com';
    default:/** prd */
      return 'm.ctrip.com';
  }
};

/** 获取webapi的域名 */
export const webapiDomain = (envcode) => {
  switch (envcode) {
    case 0:/** 测试 */
      return 'webapi.soa.fws.qa.nt.ctripcorp.com';
    case 2:
      return 'webapi.soa.uat.qa.nt.ctripcorp.com';
    default:/** prd */
      return 'webapi.soa.ctripcorp.com';
  }
};

export const getSiteDemain = (envcode) => {
  switch (envcode) {
    case 0:/** 测试 */
      return 'iquality.site.fat46.qa.nt.ctripcorp.com';
    case 2:
      return 'iquality.site.uat.qa.nt.ctripcorp.com';
    default:/** prd */
      return 'iquality.site.ctripcorp.com';
  }
};

/**
 * 获取协议
 * @return {String} 协议名称 */
export const getProtocol = () => {
  if (typeof window !== 'undefined' && window.location && window.location.protocol) {
    if (window.location.protocol === "https:") {
      return "https";
    } if (window.location.protocol === "file:") {
      return "file";
    }
    return "http";
  }
  return null;
};
