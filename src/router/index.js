import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Pages/Login/Login'
import Register from '@/components/Pages/Register/Register'
import ForgotPassword from '@/components/Pages/Register/ForgotPassword'
import Home from '@/components/Pages/Home/Home'
import Valorations from '@/components/Pages/Valorations/Valorations'
import Preferences from '@/components/Pages/Preferences/Preferences'
import Historic from '@/components/Pages/Historic/Historic'
import RecommendationList from '@/components/Pages/RecommendationList/RecommendationList'
import ItemDetails from '@/components/Pages/RecommendationList/ItemDetails'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/:pathMatch(.*)*', redirect: '/'},
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
          path: '/forgot_password',
          name: 'ForgotPassword',
          component: ForgotPassword
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
          path: '/recommendations/:id',
          name: 'RecommendationList',
          component: RecommendationList
        },
        {
          path: '/items/:id',
          name: 'ItemDetails',
          component: ItemDetails
        },
    ],
    scrollBehavior() {
      return { left: 0, top: 0 };
    },
})
