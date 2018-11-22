// Store index

// Required imports
import Vuex from 'vuex'
import Vue from 'vue'
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './action_getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
})