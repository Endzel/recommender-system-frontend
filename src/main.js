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

import AsyncComputed from 'vue-async-computed'


Vue.use(AsyncComputed)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(VueResource)

//Global imports
import store from '@/store/index.js'
import '@/components/mixins/index.js'

// Components
import '@/components/global_components.js'

var options = {
  namespace: 'recommender__'
};

const VueGlobal = {
    install(Vue, options) {

    }
}

export default VueGlobal;


Vue.use(VueLocalStorage, options);
Vue.use(VueCookie);

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
