import { APPID, LANGUAGE_COOKIE, LANGUAGE_DEFAULT } from '../configs';
import { getCookie, getCookieServer } from './cookie';
import { findByKey } from './array';

/** 语言对应表 */
export const languageMap = [
  { lang: 'zh-CN', val: '简体中文' },
  { lang: 'en-US', val: 'English' },
  // { lang: 'ja-JP', val: '日本語' },
  // { lang: 'ko-KR', val: '한국어' },
  // { lang: 'th-TH', val: 'ภาษาไทย' }
];

/** 设置国际化文字 */
export const getLocalization = (key, defaultVal) => {
  if (typeof window !== 'undefined') {
    return (window[`i18n_${APPID}`] || {})[key] || defaultVal;
  }
  return defaultVal;
};


export const getCurrentLang = () => {
  if (typeof window !== 'undefined') {
    let lang = getCookie(LANGUAGE_COOKIE) || LANGUAGE_DEFAULT;
    lang = (findByKey(languageMap, 'lang', lang) || languageMap[0]).lang;
    return lang;
  }

  let lang = getCookieServer(LANGUAGE_COOKIE, ctx.req) || LANGUAGE_DEFAULT;
  lang = (findByKey(languageMap, 'lang', lang) || languageMap[0]).lang;
  return lang;
};
