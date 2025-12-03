// Store actions

import { useCookies } from 'vue3-cookies'
import router from './../router'
import axios from 'axios'
const { cookies } = useCookies();

export default {
    async login(context, data) {
        // Save user token
        context.commit('saveUserToken', data)
        var headers = {'Content-Type': 'application/json', 'Accept': 'application/json', "Authorization": "Token " + data.token, 'X-CSRFToken': context.getters.apiInfos.csrftoken};
        await axios.get(context.getters.apiInfos.domain + 'users', {headers: headers}).then(response => {
            context.commit('saveUserInfos', response.data)
            context.commit('setLoggedIn', true)
            router.push({name: 'Home'})
        }).catch(error => {
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
        if (cookies.get('token') !== null ) {
            context.commit('setLoggedIn', true)
            context.commit('saveUserToken', { token: cookies.get('token'), })
            var token = context.getters.apiInfos.token
            var api_domain = context.getters.apiInfos.domain

            var headers = {'Content-Type': 'application/json', 'Accept': 'application/json', "Authorization": "Token " + context.getters.apiInfos.token, 'X-CSRFToken': context.getters.apiInfos.csrftoken,};
            await axios.get(context.getters.apiInfos.domain + 'users', {headers: headers}).then(response => {
                context.commit('saveUserInfos', response.data)
            }).catch(error => {
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
