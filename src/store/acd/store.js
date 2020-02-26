/* ACD 通信状态缓存，包括ACD连接状态
 *
 */

const SET_STATUS = 'SET_STATUS';
const SET_USER = 'SET_USER';

const acdStore = {
  status: 0,
  user: null
};

const getters = {

};

const mutations = {
  [SET_STATUS](state, status) {
    // 逻辑处理
    state.status = status;
  },
  [SET_USER](state, user) {
    console.log('state:', state);
    // 逻辑处理
    user.name = 'XXXXX';
    state.user = user;
  }
};

const actions = {
  setStatus({ commit }, preload) {
    return commit(SET_STATUS, preload);
  },
  setUser({ commit }, preload) {
    return commit(SET_USER, preload);
  }
};

export default {
  namespaced: true,
  state: acdStore,
  getters,
  mutations,
  actions
};
