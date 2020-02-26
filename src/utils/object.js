
import { isArray } from './array'

const isObject = (source) => {
    return Object.prototype.toString.call(source) === '[object Object]'
}

/**
 *
 * @param {Object} obj 操作对象
 * @param {String} spt 分隔符
 * @param {String} eql 链接符
 */
const objectToString = (obj, spt = ',', eql = '=') => {

    if (!obj) {
        return '';
    }
    if (typeof obj === 'string') {
        return obj;
    }
    let strArr = [];
    for (let key in obj) {
        strArr.push(key + eql + obj[key]);
    }

    return strArr.join(spt);
}

/**判断对象是否为空 */
const isEmptyObject = (e) => {
    if (!e) {
        return true;
    }
    var t;
    for (t in e)
        return false;
    return true
}

/**
     * @description 复制对象或数组（深拷贝）
     * @param {*} obj 源数据
     * @return {*}
     */
const deepCloneObj = (obj) => {
    if (!obj && typeof obj !== 'object') {
        return
    }
    let newObj = obj.constructor === Array ? [] : {}
    for (let key in obj) {
        if (obj[key]) {
            if (obj[key] && typeof obj[key] === 'object') {
                newObj[key] = obj[key].constructor === Array ? [] : {}
                // 递归
                newObj[key] = this.deepClone(obj[key])
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    return newObj
}

/**
 * @description 扩展对象（深拷贝）
 * @param {Object} target 目标对象
 * @param arguments 后面的属性会覆盖掉前面的
 */
function extendObj(target) {

    if (!isObject(target)) return
    for (let i = 1, len = arguments.length; i < len; i++) {
        let nextObj = arguments[i]
        if (isObject(nextObj)) {
            for (let key in nextObj) {
                if (isObject(nextObj[key]) || isArray(nextObj[key])) {
                    nextObj[key] = deepCloneObj(nextObj[key])
                }
                target[key] = nextObj[key]
            }
        }
    }
    return target
}

export {
    objectToString,
    isEmptyObject,
    deepCloneObj,
    extendObj
}