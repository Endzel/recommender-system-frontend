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

app.mount('#app')
