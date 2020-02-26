/**
 *
 * URL相关的API
 */
import { objectToString, extendObj } from './object';

/**判断对象是否为空 */
const _isEmptyObject = (e) => {
    if (!e) {
        return true;
    }
    var t;
    for (t in e)
        return false;
    return true
}

/**
 * 获取参数列表
 * @param {String} url 链接地址
 * @return {Object} 参数对象列表
 * query中有相同key时，只能取到在后面的
 */
const parseQuery = (url) => {
    var query = {};
    var idx = url.lastIndexOf("?");
    var str = url.substr(idx + 1);
    if (str == "" || idx == -1) {
        return {};
    }
    var pairs = str.split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

// 删除url中某个参数
const deleteUrlQueryParameter = (name) => {
    var location = window.location;
    var baseUrl = location.origin + location.pathname;
    var query = location.search.substr(1);
    if (query.indexOf(name) > -1) {
        var obj = {};
        var arr = query.split("&");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        }
        delete obj[name];
        if (_isEmptyObject(obj)) {
            return baseUrl;
        }
        return baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
    }
}

/**get appoint param`s value */
const getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/**
 * 合并参数
 * @param {*} org origial url
 * @param {*} query new params
 */
const combineParams = (org = '', query) => {

    org = objectToString(org, '&');

    let orgQuery = parseQuery(org)
    query = extendObj(orgQuery, query)

    return objectToString(query, '&');

    // query = objectToString(query, '&');
    // const sIndex = org.lastIndexOf('?');
    // if (sIndex > -1) {
        // org = org.substring(sIndex+1);
    // } else {
        // org = '';
    // }

    // if (org && query) {
        // return org + '&' + query;
    // }
    // return org || query;

}

const generateUrl = (url, query) => {

    let hrefQuery = combineParams(url, query)
    let temp = url.lastIndexOf('?');
    let newUrl = (temp > -1 ? url.substring(0, temp) : url) + '?' + hrefQuery;
    return newUrl;
}


export {
    getQueryString,
    deleteUrlQueryParameter,
    parseQuery,
    combineParams,
    generateUrl
}


