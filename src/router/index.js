import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import Detail from '../views/Detail.vue'
import Info from '../views/Info.vue'
import Creators from '../views/Creators.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/detalhe/:name',
      name: 'detalhe',
      component: Detail
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    },
    {
      path: '/creators',
      name: 'creators',
      component: Creators
    },
  ]
})

export default router
