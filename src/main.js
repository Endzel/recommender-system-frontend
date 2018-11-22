import '@/assets/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../node_modules/hover.css/css/hover-min.css'
import BootstrapVue from 'bootstrap-vue'

// Functional modules
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-ls'
require('vue2-animate/dist/vue2-animate.min.css')

import AsyncComputed from 'vue-async-computed'


Vue.use(AsyncComputed)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(require('vue-moment'))

//Global imports
import store from '@/store/index.js'
import '@/components/mixins/index.js'

// Components
import '@/components/global_components.js'

const VueGlobal = {
    install(Vue, options) {

    }
}

export default VueGlobal;


import VueLodash from 'vue-lodash'
import VueI18n from 'vue-i18n'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

Vue.use(VueLodash)
Vue.use(VueLocalStorage, options);
Vue.use(VueCookie);
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

Vue.http.headers.common['Content-Type'] = 'application/json';
Vue.http.headers.common['Accept'] = 'application/json';

Vue.config.productionTip = false



new Vue({
  el: '#app',
  // i18n,
  store,
  router,
  template: '<App/>',
  components: { App }
})
