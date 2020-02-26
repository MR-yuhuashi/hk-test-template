import store from '../index';

const NAMESPACE = 'acd';
export const setStatus = async (params) => {
    const data = await store.dispatch(`${NAMESPACE}/setStatus`, params);
    // 做自己的逻辑处理
    return data;
};

export const setUser = async params => store.dispatch(`${NAMESPACE}/setUser`, params);
