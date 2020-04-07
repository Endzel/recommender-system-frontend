// Store actions

import VueCookie from 'vue-cookie'
import VueLocalStorage from 'vue-ls'
import router from './../router'
import Vue from 'vue'

export default {
    async login(context, data) {
        // Save user token
        context.commit('saveUserToken', data)
        var headers = {'Content-Type': 'application/json', 'Accept': 'application/json', "Authorization": "Token " + data.token, 'X-CSRFToken': context.getters.apiInfos.csrftoken};
        await Vue.http.get(context.getters.apiInfos.domain + 'users', {headers: headers}).then(response => {
            context.commit('saveUserInfos', response.body)
            context.commit('setLoggedIn', true)
            router.push({name: 'Home'})
        }, response => {
        });

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
            var token = context.getters.apiInfos.token
            var api_domain = context.getters.apiInfos.domain

            var headers = {'Content-Type': 'application/json', 'Accept': 'application/json', "Authorization": "Token " + context.getters.apiInfos.token, 'X-CSRFToken': context.getters.apiInfos.csrftoken,};
            await Vue.http.get(context.getters.apiInfos.domain + 'users', {headers: headers}).then(response => {
                context.commit('saveUserInfos', response.body)
            }, response => {
                context.dispatch('logout')
            });
        } else {
            context.dispatch('logout')
        }
        return Promise.resolve();
    },
    focusSection(context, section) {
        context.commit('setFocusedSection', section)
    },
    setAlert(context, alert) {
        context.commit('setAlertInfos', alert)
    },
    cacheData(context, data) {
        context.commit('cacheData', data)
    },
}
