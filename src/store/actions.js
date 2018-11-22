// Store actions

import VueCookie from 'vue-cookie'
import VueLocalStorage from 'vue-ls'
import router from './../router'
import Vue from 'vue'

export default {
    async login(context, data) {

        // Save user token
        context.commit('saveUserToken', data)

        // Get api infos
        var token = context.getters.apiInfos.token
        var api_domain = context.getters.apiInfos.domain

        // Get user logged in informations
        var headers = {'Content-Type': 'application/json', 'Accept': 'application/json', "Authorization": "Token " + token,};
        await Vue.http.get(api_domain + '/user', {headers: headers}).then(response => {
            context.commit('saveUserInfos', response.body)
            context.commit('setLoggedIn', true)
            router.push({name: 'Home'})
        }, response => {
            context.commit('saveUserInfos', response.body)
            context.commit('setLoggedIn', true)
            router.push({name: 'Home'})
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
        var api_domain = context.getters.apiInfos.api_domain
        var body = {
            email: data.email,
            password: data.password,
        }
        var headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
        Vue.http.post(api_domain + '/login', body, {headers: headers}).then(response => {
            context.dispatch('login', response.body)
        }, response => {
        });
    },
    async searchInfos(context) {
        if (VueCookie.get('token') !== null ) {
            context.commit('setLoggedIn', true)
            context.commit('saveUserToken', { token: VueCookie.get('token'), })
            var token = context.getters.apiInfos.token
            var api_domain = context.getters.apiInfos.domain
            var headers = {'Content-Type': 'application/json', 'Accept': 'application/json', "Authorization": "Token " + token, 'X-CSRFToken': csrftoken,};
            await Vue.http.get(api_domain + '/user', {headers: headers}).then(response => {
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
    cacheData(context, data) {
        context.commit('cacheData', data)
    },
}
