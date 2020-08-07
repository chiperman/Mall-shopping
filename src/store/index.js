import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import state from './state.js'
import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
//  state: { // 共享的数据及状态
// },
// mutations: { // 修改数据状态的方法集
// },
// actions: { // 异步修改数据的方法集
// },
// getters: { // 对外展示数据的效果集
// },
