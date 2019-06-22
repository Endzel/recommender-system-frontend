// Store mutations

import VueLocalStorage from 'vue-ls'
import VueCookie from 'vue-cookie'
import Vue from 'vue'

export default {
    saveUserToken(state, data) {
        var expiry = 60 * 60 * 1000 * 24 * 60; // 60 days
        VueCookie.set('token', data.token, expiry)
        state.api.token = data.token
    },
    saveUserInfos(state, logInfos) {
      state.email = logInfos.email;
      state.cache_data = Vue.ls.get('cachedata');
      state.section_focused = Vue.ls.get('section_focused')
    },
    removeUserInfos(state) {
      state.user = null
      state.user = null;
      state.api.token = null
      VueCookie.delete('csrftoken');
      VueCookie.delete('token');
      state.section_focused = null
    },
    setLoggedIn(state, logged_in) {
        state.logged_in = logged_in
    },
    setFocusedSection(state, section) {
      state.section_focused = section
      Vue.ls.set('section_focused', state.section_focused, state.expiry.local_storage);
    },
    cacheData(state, data) {
      if (state.cache_data === null) {
        state.cache_data = {};
      }
      state.cache_data[data.index] = data.data;
      Vue.ls.set('cachedata', this.state.cache_data, state.expiry.local_storage);
    },
}
