// Store actions

import VueCookie from 'vue-cookie'
import VueLocalStorage from 'vue-ls'
import router from './../router'
import Vue from 'vue'

export default {
    async login(context, data) {

        // Save user token
        context.commit('saveUserToken', data)
        context.commit('saveUserInfos', data)
        context.commit('setLoggedIn', true)

        return Promise.resolve();
    },
    logout(context, redirection = true) {
        context.commit('removeUserInfos')
        context.commit('setLoggedIn', false)
        if (redirection) {
            router.push({name: 'Login', query: {logout:true} })
        }
        return Promise.resolve();
    },
    async join(context, data) {
        context.commit('saveUserInfos', data)
    },
    async searchInfos(context) {
        if (VueCookie.get('token') !== null ) {
            context.commit('setLoggedIn', true)
            context.commit('saveUserToken', { token: VueCookie.get('token'), })
        } else {
            context.dispatch('logout')
        }
        return Promise.resolve();
    },
    focusSection(context, section) {
        context.commit('setFocusedSection', section)
    },
    cacheData(context, data) {
        context.commit('cacheData', data)
    },
}
