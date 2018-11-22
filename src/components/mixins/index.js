import Vue from 'vue'

import requests from './requests.js'
import utils from './utils.js'

Vue.mixin(utils);
Vue.mixin(requests);
