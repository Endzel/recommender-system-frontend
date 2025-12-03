// Store mutations
import { useCookies } from 'vue3-cookies'
// import VueLocalStorage from 'vue-ls' // Need replacement
// For now, mocking ls or using simple localStorage
const ls = {
  get(key) { return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)) },
  remove(key) { localStorage.removeItem(key) }
}
const { cookies } = useCookies();

export default {
    saveUserToken(state, data) {
        var expiry = 60 * 60 * 24 * 60; // 60 day in seconds? Check vue3-cookies API. usually it's string or seconds.
        cookies.set('token', data.token, expiry + 's')
        state.api.token = data.token
        state.api.csrftoken = cookies.get('csrftoken')
    },
    saveUserInfos(state, logInfos) {
      state.user = logInfos.id;
      state.is_staff = logInfos.is_staff;
      state.cache_data = ls.get('cachedata');
      state.section_focused = ls.get('section_focused')
    },
    removeUserInfos(state) {
      state.user = null
      state.api.token = null
      state.is_staff = null
      cookies.remove('csrftoken');
      cookies.remove('token');
      state.section_focused = null
    },
    setLoggedIn(state, logged_in) {
        state.logged_in = logged_in
    },
    setFocusedSection(state, section) {
      state.section_focused = section
      ls.set('section_focused', state.section_focused);
    },
    cacheData(state, data) {
      if (state.cache_data === null) {
        state.cache_data = {};
      }
      state.cache_data[data.index] = data.data;
      ls.set('cachedata', state.cache_data);
    },
    setAlertInfos(state, alert) {
        state.alert.show = alert.show
        state.alert.type = alert.type
        state.alert.message = alert.message
    },
}
