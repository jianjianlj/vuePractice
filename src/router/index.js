import Vue from 'vue'
import Router from 'vue-router'
import Reservation from '@/components/Reservation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Reservation',
      component: Reservation
    }
  ]
})
