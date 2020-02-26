import Vue from 'vue';
import Vuex from 'vuex';
import acd from './acd/store';
import order from './order/store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    acd,
    order
  }
});
