import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Pages/Login/Login'
import Register from '@/components/Pages/Register/Register'
import Home from '@/components/Pages/Home/Home'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '*', redirect: '/'},
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
        {
          path: '/register',
          name: 'Register',
          component: Register
        },
        {
          path: '/',
          name: 'Home',
          component: Home
        },
    ],
    mode: 'history',
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
})
