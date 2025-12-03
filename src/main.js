import '@/assets/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '../node_modules/hover.css/css/hover-min.css'
import { createBootstrap } from 'bootstrap-vue-next'

// Functional modules
import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueCookie from 'vue3-cookies'
// import VueLocalStorage from 'vue-ls' // vue-ls not officially Vue 3 compatible, might need replacement or plugin wrapper

// import AsyncComputed from 'vue-async-computed' // Not Vue 3 compatible, check for alternative

//Global imports
// import '@/components/mixins/index.js' // Converted to plugin plugin


// Components
import GlobalComponents from '@/components/global_components.js'
import GlobalMixins from '@/components/mixins/index.js'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(createBootstrap())
app.use(VueCookie)
app.use(GlobalComponents)
app.use(GlobalMixins)

// VueLocalStorage and AsyncComputed might need specific Vue 3 plugins or implementations
// For now, we will comment them out or basic setup if possible
// app.use(VueLocalStorage, { namespace: 'recommender__' });

app.mount('#app')
