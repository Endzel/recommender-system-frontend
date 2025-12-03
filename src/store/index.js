// Store index

// Required imports
import { createStore } from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './action_getters.js'

export default createStore({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
})