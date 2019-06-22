import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Pages/Login/Login'
import Register from '@/components/Pages/Register/Register'
import Home from '@/components/Pages/Home/Home'
import Valorations from '@/components/Pages/Valorations/Valorations'
import Preferences from '@/components/Pages/Preferences/Preferences'
import Historic from '@/components/Pages/Historic/Historic'
import RecommendationList from '@/components/Pages/RecommendationList/RecommendationList'

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
        {
          path: '/preferences',
          name: 'Preferences',
          component: Preferences
        },
        {
          path: '/historic',
          name: 'Historic',
          component: Historic
        },
        {
          path: '/valorations',
          name: 'Valorations',
          component: Valorations
        },
        {
          path: '/recommendation/:id',
          name: 'RecommendationList',
          component: RecommendationList
        },
    ],
    mode: 'history',
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
})
